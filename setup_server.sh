#!/bin/bash

# TeamChat Server Setup Script
# This script sets up a Debian/Ubuntu server for hosting a Ruby on Rails application with PostgreSQL and Nginx.
# 
# Steps:
# 1. Update and upgrade system packages
# 2. Install required packages: curl, git, gnupg2, postgresql, nginx, Node.js
# 3. Create an account to run the Rails app
# 4. Install rbenv and Ruby 3.4.4
# 5. Install Bundler and Rails gems
# 6. Set up PostgreSQL users and databases
# 7. Set up Puma systemd service
# 8. Configure Nginx to serve the Rails app
# 9. Start and enable services

set -e  # Exit on any error

# Configuration variables
APP_USER="teamchat"
APP_NAME="teamchat"
APP_PATH="/home/$APP_USER/$APP_NAME"
RUBY_VERSION="3.4.4"
DOMAIN="your-domain.com"  # Change this to your domain
DB_PASSWORD=$(openssl rand -base64 32)

echo "=== TeamChat Server Setup ==="
echo "Starting setup for user: $APP_USER"
echo "App path: $APP_PATH"
echo "Ruby version: $RUBY_VERSION"
echo

# Function to print status messages
print_status() {
    echo ">>> $1"
}

# 1. Update and upgrade system packages
print_status "Updating system packages..."
apt update && apt upgrade -y

# 2. Install required packages
print_status "Installing required packages..."
apt install -y curl git build-essential libssl-dev libreadline-dev zlib1g-dev \
    libsqlite3-dev wget curl llvm libncurses5-dev libncursesw5-dev \
    xz-utils tk-dev libffi-dev liblzma-dev python3-openssl git \
    postgresql postgresql-contrib nginx software-properties-common \
    libpq-dev imagemagick libvips-dev

# Install Node.js (latest LTS)
print_status "Installing Node.js..."
curl -fsSL https://deb.nodesource.com/setup_lts.x | bash -
apt install -y nodejs

# 3. Create application user
print_status "Creating application user: $APP_USER"
if ! id "$APP_USER" &>/dev/null; then
    useradd -m -s /bin/bash "$APP_USER"
    usermod -aG sudo "$APP_USER"
    echo "$APP_USER ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers.d/$APP_USER
fi

# 4. Install rbenv and Ruby as the app user
print_status "Installing rbenv and Ruby $RUBY_VERSION for user $APP_USER..."
sudo -u "$APP_USER" bash << EOF
cd /home/$APP_USER

# Install rbenv
git clone https://github.com/rbenv/rbenv.git ~/.rbenv
echo 'export PATH="\$HOME/.rbenv/bin:\$PATH"' >> ~/.bashrc
echo 'eval "\$(rbenv init -)"' >> ~/.bashrc
export PATH="\$HOME/.rbenv/bin:\$PATH"
eval "\$(rbenv init -)"

# Install ruby-build
git clone https://github.com/rbenv/ruby-build.git ~/.rbenv/plugins/ruby-build

# Install Ruby
rbenv install $RUBY_VERSION
rbenv global $RUBY_VERSION

# Install bundler
gem install bundler --no-document
rbenv rehash
EOF

# 5. Set up PostgreSQL
print_status "Setting up PostgreSQL..."
systemctl start postgresql
systemctl enable postgresql

# Create database users and databases
sudo -u postgres psql << EOF
-- Create main production user
CREATE USER teamchat_user WITH PASSWORD '$DB_PASSWORD';
CREATE DATABASE teamchat_production OWNER teamchat_user;

-- Create cable user and database
CREATE USER teamchat_cable_user WITH PASSWORD '$DB_PASSWORD';
CREATE DATABASE teamchat_cable_production OWNER teamchat_cable_user;

-- Create cache user and database
CREATE USER teamchat_cache_user WITH PASSWORD '$DB_PASSWORD';
CREATE DATABASE teamchat_cache_production OWNER teamchat_cache_user;

-- Create queue user and database
CREATE USER teamchat_queue_user WITH PASSWORD '$DB_PASSWORD';
CREATE DATABASE teamchat_queue_production OWNER teamchat_queue_user;

-- Grant necessary permissions
GRANT ALL PRIVILEGES ON DATABASE teamchat_production TO teamchat_user;
GRANT ALL PRIVILEGES ON DATABASE teamchat_cable_production TO teamchat_cable_user;
GRANT ALL PRIVILEGES ON DATABASE teamchat_cache_production TO teamchat_cache_user;
GRANT ALL PRIVILEGES ON DATABASE teamchat_queue_production TO teamchat_queue_user;
EOF

# 6. Create application directory and set permissions
print_status "Setting up application directory..."
mkdir -p "$APP_PATH"
chown -R "$APP_USER:$APP_USER" "$APP_PATH"

# 7. Create environment file
print_status "Creating environment configuration..."
sudo -u "$APP_USER" cat > "/home/$APP_USER/.env" << EOF
RAILS_ENV=production
TEAMCHAT_DB_PASSWORD=$DB_PASSWORD
SECRET_KEY_BASE=\$(openssl rand -hex 64)
RAILS_SERVE_STATIC_FILES=true
RAILS_LOG_TO_STDOUT=true
EOF

chown "$APP_USER:$APP_USER" "/home/$APP_USER/.env"
chmod 600 "/home/$APP_USER/.env"

# 8. Create Puma systemd service
print_status "Creating Puma systemd service..."
cat > /etc/systemd/system/puma.service << EOF
[Unit]
Description=Puma HTTP Server for TeamChat
After=network.target postgresql.service
Requires=postgresql.service

[Service]
Type=notify
User=$APP_USER
WorkingDirectory=$APP_PATH
Environment=RAILS_ENV=production
EnvironmentFile=/home/$APP_USER/.env
ExecStart=/home/$APP_USER/.rbenv/shims/bundle exec puma -C config/puma.rb
ExecReload=/bin/kill -USR1 \$MAINPID
TimeoutStopSec=60
Restart=always
RestartSec=1
SyslogIdentifier=puma

[Install]
WantedBy=multi-user.target
EOF

# 9. Configure Nginx
print_status "Configuring Nginx..."
cat > /etc/nginx/sites-available/$APP_NAME << EOF
upstream puma {
  server unix:///home/$APP_USER/$APP_NAME/tmp/sockets/puma.sock;
}

server {
  listen 80;
  server_name $DOMAIN www.$DOMAIN;

  root $APP_PATH/public;
  access_log /var/log/nginx/$APP_NAME\_access.log;
  error_log /var/log/nginx/$APP_NAME\_error.log info;

  location ^~ /assets/ {
    gzip_static on;
    expires 1y;
    add_header Cache-Control public;
    add_header Last-Modified "";
    add_header ETag "";
    break;
  }

  try_files \$uri/index.html \$uri @puma;
  location @puma {
    proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
    proxy_set_header Host \$http_host;
    proxy_set_header X-Forwarded-Proto \$scheme;
    proxy_redirect off;

    proxy_pass http://puma;
  }

  error_page 500 502 503 504 /500.html;
  client_max_body_size 10M;
  keepalive_timeout 10;
}
EOF

# Enable the site
ln -sf /etc/nginx/sites-available/$APP_NAME /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# Test nginx configuration
nginx -t

# 10. Create deploy script
print_status "Creating deploy script..."
sudo -u "$APP_USER" cat > "$APP_PATH/deploy.sh" << 'EOF'
#!/bin/bash
set -e

APP_PATH="/home/teamchat/teamchat"
cd "$APP_PATH"

echo "=== Deploying TeamChat ==="

# Load environment
source ~/.env

# Install/update gems
echo "Installing gems..."
/home/teamchat/.rbenv/shims/bundle install --deployment --without development test

# Precompile assets
echo "Precompiling assets..."
RAILS_ENV=production /home/teamchat/.rbenv/shims/bundle exec rails assets:precompile

# Run database migrations
echo "Running database migrations..."
RAILS_ENV=production /home/teamchat/.rbenv/shims/bundle exec rails db:migrate

# Restart services
echo "Restarting services..."
sudo systemctl restart puma
sudo systemctl reload nginx

echo "Deployment completed successfully!"
EOF

chmod +x "$APP_PATH/deploy.sh"
chown "$APP_USER:$APP_USER" "$APP_PATH/deploy.sh"

# 11. Enable and start services
print_status "Enabling and starting services..."
systemctl daemon-reload
systemctl enable postgresql nginx puma
systemctl start postgresql nginx

# 12. Create initial deployment instructions
print_status "Creating deployment instructions..."
cat > "/home/$APP_USER/DEPLOYMENT_INSTRUCTIONS.md" << EOF
# TeamChat Deployment Instructions

## Database Password
Your database password has been generated and saved in ~/.env
Password: $DB_PASSWORD

## First Deployment Steps

1. Upload your application code to: $APP_PATH
2. Run the deploy script: ./deploy.sh
3. Update your domain in /etc/nginx/sites-available/$APP_NAME
4. Restart nginx: sudo systemctl restart nginx

## SSL Setup (Recommended)
Install certbot for SSL certificates:
\`\`\`bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d $DOMAIN -d www.$DOMAIN
\`\`\`

## Service Management
- Start Puma: sudo systemctl start puma
- Stop Puma: sudo systemctl stop puma
- Restart Puma: sudo systemctl restart puma
- Check Puma status: sudo systemctl status puma
- View Puma logs: sudo journalctl -u puma -f

## File Locations
- App directory: $APP_PATH
- Nginx config: /etc/nginx/sites-available/$APP_NAME
- Puma service: /etc/systemd/system/puma.service
- Environment file: /home/$APP_USER/.env
- Deploy script: $APP_PATH/deploy.sh

## Database Access
\`\`\`bash
sudo -u postgres psql -d teamchat_production
\`\`\`
EOF

chown "$APP_USER:$APP_USER" "/home/$APP_USER/DEPLOYMENT_INSTRUCTIONS.md"

print_status "Server setup completed successfully!"
echo
echo "=== Setup Summary ==="
echo "App user: $APP_USER"
echo "App path: $APP_PATH"
echo "Database password: $DB_PASSWORD"
echo "Domain (update in nginx config): $DOMAIN"
echo
echo "Next steps:"
echo "1. Upload your application code to $APP_PATH"
echo "2. Update the domain in /etc/nginx/sites-available/$APP_NAME"
echo "3. Run the deploy script: sudo -u $APP_USER $APP_PATH/deploy.sh"
echo "4. Set up SSL with certbot (optional but recommended)"
echo
echo "Check /home/$APP_USER/DEPLOYMENT_INSTRUCTIONS.md for detailed instructions."

