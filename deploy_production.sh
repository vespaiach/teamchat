#!/bin/bash

# TeamChat Production Deployment Script
# This script deploys the Rails application to production environment
# Including database setup, asset compilation, and service configuration

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if PostgreSQL is running
check_postgresql() {
    print_status "Checking PostgreSQL service..."
    if ! pgrep -x "postgres" > /dev/null; then
        print_error "PostgreSQL is not running. Please start PostgreSQL first."
        print_status "On macOS with Homebrew: brew services start postgresql"
        print_status "On Ubuntu/Debian: sudo systemctl start postgresql"
        exit 1
    fi
    print_success "PostgreSQL is running"
}

# Check if environment variable is set
check_env_vars() {
    print_status "Checking required environment variables..."
    
    local missing_vars=()
    
    if [ -z "$TEAMCHAT_DB_PASSWORD" ]; then
        missing_vars+=("TEAMCHAT_DB_PASSWORD")
    fi
    
    if [ -z "$RAILS_MASTER_KEY" ] && [ ! -f "config/master.key" ]; then
        missing_vars+=("RAILS_MASTER_KEY (or config/master.key file)")
    fi
    
    if [ -z "$RAILS_ENV" ]; then
        missing_vars+=("RAILS_ENV (should be set to 'production')")
    fi
    
    if [ ${#missing_vars[@]} -ne 0 ]; then
        print_error "Missing required environment variables:"
        for var in "${missing_vars[@]}"; do
            print_error "  - $var"
        done
        print_status "Please set them before running deployment"
        exit 1
    fi
    
    print_success "All required environment variables are set"
}

# Create PostgreSQL users
create_users() {
    print_status "Creating PostgreSQL users..."
    
    # Array of users to create
    users=("teamchat_user" "teamchat_cable_user" "teamchat_cache_user" "teamchat_queue_user")
    
    for user in "${users[@]}"; do
        print_status "Creating user: $user"
        
        # Check if user already exists
        if sudo -u postgres psql -tAc "SELECT 1 FROM pg_roles WHERE rolname='$user'" | grep -q 1; then
            print_warning "User $user already exists, skipping creation"
        else
            sudo -u postgres psql -c "CREATE USER $user WITH PASSWORD '$TEAMCHAT_DB_PASSWORD';"
            sudo -u postgres psql -c "ALTER USER $user CREATEDB;"
            print_success "Created user: $user"
        fi
    done
}

# Create databases
create_databases() {
    print_status "Creating databases..."
    
    # Array of databases to create with their owners
    declare -A databases=(
        ["teamchat_production"]="teamchat_user"
        ["teamchat_cable_production"]="teamchat_cable_user"
        ["teamchat_cache_production"]="teamchat_cache_user"
        ["teamchat_queue_production"]="teamchat_queue_user"
    )
    
    for db in "${!databases[@]}"; do
        owner="${databases[$db]}"
        print_status "Creating database: $db (owner: $owner)"
        
        # Check if database already exists
        if sudo -u postgres psql -lqt | cut -d \| -f 1 | grep -qw "$db"; then
            print_warning "Database $db already exists, skipping creation"
        else
            sudo -u postgres psql -c "CREATE DATABASE $db OWNER $owner;"
            print_success "Created database: $db"
        fi
    done
}

# Run Rails database setup
setup_rails_db() {
    print_status "Setting up Rails database environment..."
    
    # Check if we're in a Rails app directory
    if [ ! -f "Gemfile" ]; then
        print_error "Not in a Rails application directory. Please run this script from your Rails app root."
        exit 1
    fi
    
    # Create databases (Rails way)
    print_status "Creating databases via Rails..."
    bin/rails db:create
    
    # Run migrations
    print_status "Running database migrations..."
    bin/rails db:migrate
    
    # Optionally run seeds
    read -p "Do you want to run database seeds? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        print_status "Running database seeds..."
        bin/rails db:seed
        print_success "Database seeds completed"
    fi
}

# Install and setup dependencies
setup_dependencies() {
    print_status "Setting up application dependencies..."
    
    # Install Ruby gems
    print_status "Installing Ruby gems..."
    if [ -f ".ruby-version" ]; then
        ruby_version=$(cat .ruby-version)
        print_status "Required Ruby version: $ruby_version"
    fi
    
    bundle config set --local deployment 'true'
    bundle config set --local without 'development test'
    bundle install
    print_success "Ruby gems installed"
}

# Compile assets
compile_assets() {
    print_status "Compiling production assets..."
    
    export RAILS_ENV=production
    
    # Clean previous assets
    print_status "Cleaning previous assets..."
    bin/rails assets:clean
    
    # Precompile assets
    print_status "Precompiling assets..."
    bin/rails assets:precompile
    
    # Build frontend assets if build script exists
    if [ -f "frontend/package.json" ]; then
        cd frontend
        if grep -q '"build"' package.json; then
            print_status "Building frontend assets..."
            if command -v yarn &> /dev/null; then
                yarn build
            elif command -v npm &> /dev/null; then
                npm run build
            fi
        fi
        cd ..
    fi
    
    print_success "Assets compiled successfully"
}

# Setup application configuration
setup_config() {
    print_status "Setting up application configuration..."
    
    # Create necessary directories
    mkdir -p tmp/pids tmp/cache tmp/sockets log storage
    
    # Set proper permissions
    chmod 755 bin/*
    
    # Setup credentials if master key is provided as env var
    if [ -n "$RAILS_MASTER_KEY" ] && [ ! -f "config/master.key" ]; then
        echo "$RAILS_MASTER_KEY" > config/master.key
        chmod 600 config/master.key
        print_success "Master key configured"
    fi
    
    print_success "Application configuration completed"
}

# Setup systemd services (optional)
setup_services() {
    read -p "Do you want to setup systemd services? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        print_status "Setting up systemd services..."
        
        # Setup nginx configuration
        setup_nginx
        
        print_success "Services configured"
    fi
}

# Setup nginx configuration
setup_nginx() {
    app_name="teamchat"
    app_path=$(pwd)
    
    nginx_config="/etc/nginx/sites-available/$app_name"
    
    print_status "Creating nginx configuration..."
    
    sudo tee "$nginx_config" > /dev/null <<EOF
upstream teamchat_app {
    server 127.0.0.1:3000;
}

server {
    listen 80;
    server_name teamchat.local;  # Change this to your domain
    
    root $app_path/public;
    
    # Serve static assets
    location ~ ^/assets/ {
        expires 1y;
        add_header Cache-Control public;
        add_header ETag "";
        break;
    }
    
    # Try to serve static files, then proxy to app
    try_files \$uri @teamchat_app;
    
    location @teamchat_app {
        proxy_pass http://teamchat_app;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}
EOF

    # Enable the site
    sudo ln -sf "$nginx_config" "/etc/nginx/sites-enabled/$app_name"
    
    # Test nginx configuration
    if sudo nginx -t; then
        print_success "Nginx configuration created and tested"
    else
        print_error "Nginx configuration test failed"
    fi
}

# Verify database setup
verify_setup() {
    print_status "Verifying database setup..."
    
    databases=("teamchat_production" "teamchat_cable_production" "teamchat_cache_production" "teamchat_queue_production")
    
    for db in "${databases[@]}"; do
        if sudo -u postgres psql -lqt | cut -d \| -f 1 | grep -qw "$db"; then
            print_success "Database $db exists"
        else
            print_error "Database $db does not exist"
            exit 1
        fi
    done
    
    print_success "All databases are properly set up!"
}

# Application control functions
start_app() {
    print_status "Starting TeamChat application..."
    if systemctl is-active --quiet teamchat; then
        print_warning "Application is already running"
    else
        sudo systemctl start teamchat
        if systemctl is-active --quiet nginx; then
            sudo systemctl reload nginx
        else
            sudo systemctl start nginx
        fi
        print_success "Application started successfully"
    fi
}

stop_app() {
    print_status "Stopping TeamChat application..."
    sudo systemctl stop teamchat
    print_success "Application stopped"
}

restart_app() {
    print_status "Restarting TeamChat application..."
    sudo systemctl restart teamchat
    if systemctl is-active --quiet nginx; then
        sudo systemctl reload nginx
    fi
    print_success "Application restarted successfully"
}

status_app() {
    print_status "Checking application status..."
    echo ""
    print_status "TeamChat Service:"
    sudo systemctl status teamchat --no-pager -l
    echo ""
    print_status "Nginx Service:"
    sudo systemctl status nginx --no-pager -l
    echo ""
    print_status "Database Connections:"
    sudo -u postgres psql -c "SELECT datname, numbackends FROM pg_stat_database WHERE datname LIKE 'teamchat%';"
}

# Main execution
main() {
    print_status "Starting TeamChat Production Deployment..."
    echo "=========================================="
    
    check_postgresql
    check_env_vars
    setup_dependencies
    setup_config
    create_users
    create_databases
    setup_rails_db
    compile_assets
    verify_setup
    setup_services
    
    echo "=========================================="
    print_success "Production deployment completed successfully!"
    print_status "Your Rails application is ready for production use."
    print_warning "Remember to:"
    print_warning "  - Setup SSL certificates for HTTPS"
    print_warning "  - Configure firewall rules"
    print_warning "  - Setup log rotation"
    print_warning "  - Schedule regular database backups"
    print_warning "  - Monitor application performance"
}

# Show usage if requested
if [ "$1" = "--help" ] || [ "$1" = "-h" ]; then
    echo "TeamChat Production Deployment Script"
    echo ""
    echo "Usage: $0 [options|commands]"
    echo ""
    echo "Commands:"
    echo "  deploy        Full deployment (default)"
    echo "  start         Start the application services"
    echo "  stop          Stop the application services"
    echo "  restart       Restart the application services"
    echo "  status        Show application status"
    echo ""
    echo "Options:"
    echo "  -h, --help    Show this help message"
    echo "  --db-only     Only setup databases (skip app deployment)"
    echo "  --no-assets   Skip asset compilation"
    echo "  --no-services Skip systemd/nginx setup"
    echo ""
    echo "Prerequisites:"
    echo "  1. PostgreSQL must be installed and running"
    echo "  2. Ruby and Bundler must be installed"
    echo "  3. Node.js and npm/yarn (if using frontend assets)"
    echo "  4. Set required environment variables:"
    echo "     - TEAMCHAT_DB_PASSWORD"
    echo "     - SECRET_KEY_BASE"
    echo "     - RAILS_MASTER_KEY (or config/master.key file)"
    echo "  5. Run from your Rails application root directory"
    echo ""
    echo "Examples:"
    echo "  # Full deployment"
    echo "  export TEAMCHAT_DB_PASSWORD='your_secure_password'"
    echo "  export SECRET_KEY_BASE='your_secret_key'"
    echo "  export RAILS_MASTER_KEY='your_master_key'"
    echo "  ./deploy_production.sh"
    echo ""
    echo "  # Database only deployment"
    echo "  ./deploy_production.sh --db-only"
    echo ""
    echo "  # Control application"
    echo "  ./deploy_production.sh start"
    echo "  ./deploy_production.sh status"
    echo "  ./deploy_production.sh restart"
    exit 0
fi

# Handle commands
case "$1" in
    start)
        start_app
        exit 0
        ;;
    stop)
        stop_app
        exit 0
        ;;
    restart)
        restart_app
        exit 0
        ;;
    status)
        status_app
        exit 0
        ;;
    deploy|"")
        # Continue with deployment options
        ;;
    *)
        if [[ "$1" != --* ]]; then
            echo "Unknown command: $1"
            echo "Use --help for usage information"
            exit 1
        fi
        ;;
esac

# Handle command line options
DB_ONLY=false
NO_ASSETS=false
NO_SERVICES=false

while [[ $# -gt 0 ]]; do
    case $1 in
        --db-only)
            DB_ONLY=true
            shift
            ;;
        --no-assets)
            NO_ASSETS=true
            shift
            ;;
        --no-services)
            NO_SERVICES=true
            shift
            ;;
        *)
            echo "Unknown option: $1"
            echo "Use --help for usage information"
            exit 1
            ;;
    esac
done

# Run deployment based on options
if [ "$DB_ONLY" = true ]; then
    print_status "Running database-only deployment..."
    check_postgresql
    check_env_vars
    create_users
    create_databases
    setup_rails_db
    verify_setup
    print_success "Database deployment completed!"
else
    # Run the main function with conditional steps
    main_with_options() {
        print_status "Starting TeamChat Production Deployment..."
        echo "=========================================="
        
        check_postgresql
        check_env_vars
        setup_dependencies
        setup_config
        create_users
        create_databases
        setup_rails_db
        
        if [ "$NO_ASSETS" != true ]; then
            compile_assets
        fi
        
        verify_setup
        
        if [ "$NO_SERVICES" != true ]; then
            setup_services
        fi
        
        echo "=========================================="
        print_success "Production deployment completed successfully!"
        print_status "Your Rails application is ready for production use."
        print_warning "Remember to:"
        print_warning "  - Setup SSL certificates for HTTPS"
        print_warning "  - Configure firewall rules"
        print_warning "  - Setup log rotation"
        print_warning "  - Schedule regular database backups"
        print_warning "  - Monitor application performance"
    }
    
    main_with_options
fi
