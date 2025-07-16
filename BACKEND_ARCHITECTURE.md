# TeamChat Backend Architecture

## Overview

TeamChat is a modern real-time chat application built with Ruby on Rails 8.x, featuring a robust backend architecture designed for scalability and real-time communication. The backend serves as an API-only application that supports both group and direct messaging with real-time capabilities via WebSockets.

## Technology Stack

### Core Framework
- **Ruby on Rails 8.x** - Backend framework providing the foundation for API and real-time features
- **PostgreSQL** - Primary database for persistent data storage
- **Puma** - Web server with multi-threading support
- **Action Cable** - WebSocket implementation for real-time communication

### Rails 8 Features
- **Solid Cache** - Database-backed caching layer
- **Solid Queue** - Background job processing
- **Solid Cable** - Database-backed Action Cable adapter
- **Active Storage** - File upload and management

### Additional Libraries
- **BCrypt** - Password hashing and authentication
- **Rack CORS** - Cross-origin resource sharing
- **Kamal** - Deployment and containerization
- **Thruster** - HTTP caching and compression

## Architecture Overview

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend API   │    │   Database      │
│   (React)       │◄──►│   (Rails 8)     │◄──►│  (PostgreSQL)   │
│                 │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │
         │              ┌─────────────────┐
         └──────────────►│  WebSocket      │
                         │  (Action Cable) │
                         └─────────────────┘
```

## Database Architecture

### Core Entities

#### Users
- **Purpose**: Stores user account information and authentication data
- **Key Features**: 
  - Secure password storage with BCrypt
  - Password reset tokens with expiration
  - Remember tokens for persistent sessions
  - Avatar support via Active Storage
  - Online status tracking

#### Conversations
- **Architecture**: Single Table Inheritance (STI) pattern
- **Types**:
  - `GroupConversation`: Multi-participant channels
  - `DirectConversation`: Two-participant private messages
- **Key Features**:
  - Public/private visibility controls
  - Soft deletion support
  - Creator tracking

#### Messages
- **Purpose**: Core messaging functionality
- **Features**:
  - Multiple message types (text, image, audio, video, file)
  - Threaded replies via self-referential association
  - Soft deletion support
  - File attachments via Active Storage
  - Message reactions support

#### Supporting Tables
- **ConversationParticipants**: Junction table with role-based permissions (admin/member)
- **MessageReactions**: Emoji reactions to messages
- **MessageStatuses**: Delivery and read status tracking
- **ConversationJoinRequests**: Request system for private channels

### Database Schema Design

```sql
-- Core enums for type safety
CREATE TYPE conversation_role AS ENUM ('admin', 'member');
CREATE TYPE message_status AS ENUM ('delivered', 'read');
CREATE TYPE message_type AS ENUM ('text', 'image', 'audio', 'video', 'file');
CREATE TYPE request_status AS ENUM ('pending', 'approved', 'rejected');
```

### Key Relationships

```
Users ──┐
        ├── ConversationParticipants ──── Conversations
        ├── Messages (as sender)
        ├── MessageReactions
        └── MessageStatuses

Conversations ──┐
                ├── Messages
                ├── ConversationParticipants
                └── ConversationJoinRequests

Messages ──┐
           ├── MessageReactions
           ├── MessageStatuses
           └── Messages (threaded replies)
```

## Application Layer Architecture

### Controller Layer

#### Authentication Controllers
- **SigninController**: Session-based authentication with cookie support
- **SignupController**: User registration with validation
- **PasswordResetsController**: Secure password reset flow

#### Core Feature Controllers
- **ConversationsController**: CRUD operations for channels and groups
- **UsersController**: User management and avatar handling
- **ProfilesController**: User profile management
- **HomeController**: Main application entry point

#### Development Controllers
- **DevelopmentController**: Hot-reload and development-specific features

### Model Layer

#### Core Models
```ruby
# User model with authentication and relationships
class User < ApplicationRecord
  include OnlineStatus
  has_secure_password
  
  # Associations
  has_many :conversation_participants
  has_many :conversations, through: :conversation_participants
  has_many :messages, foreign_key: :sender_id
  has_one_attached :avatar
end

# Conversation STI base class
class Conversations::Conversation < ApplicationRecord
  belongs_to :created_by, class_name: 'User'
  has_many :conversation_participants
  has_many :participants, through: :conversation_participants
  has_many :messages
end

# Message model with polymorphic content support
class Message < ApplicationRecord
  belongs_to :conversation
  belongs_to :sender, class_name: 'User'
  belongs_to :parent_message, optional: true # For threading
  
  has_many :message_reactions
  has_many :message_statuses
  has_many_attached :files
end
```

#### Query Objects Pattern
- **GroupConversationsQuery**: Complex queries for group channel listing
- **DirectConversationsQuery**: Optimized queries for direct message channels
- **ApplicationQuery**: Base class providing query object pattern

#### Concerns
- **OnlineStatus**: User presence and online status management
- **LoadChats**: Chat loading and pagination logic
- **IdExtractor**: Utility for extracting IDs from various contexts

### Service Layer

The application follows Rails conventions with business logic primarily in models and controllers, supplemented by:

- **Query Objects**: For complex database queries
- **Concerns**: For shared functionality across models
- **Background Jobs**: Via Solid Queue for asynchronous processing

## Real-time Communication Architecture

### Action Cable Implementation

#### Connection Management
```ruby
# WebSocket connection authentication
class ApplicationCable::Connection < ActionCable::Connection::Base
  identified_by :current_user
  
  def connect
    self.current_user = find_logged_in_user
  end
  
  private
  
  def find_logged_in_user
    # Cookie-based authentication for WebSocket
    user = User.find_by(id: encrypted_cookies['user_id'])
    user || reject_unauthorized_connection
  end
end
```

#### Channel Architecture
- **GroupConversationsChannel**: Real-time updates for group channels
- **DirectConversationsChannel**: Real-time updates for direct messages
- **UsersChannel**: Online status and user presence
- **DevelopmentChannel**: Development-specific features (hot reload)

#### Real-time Features
1. **Message Broadcasting**: New messages instantly broadcast to participants
2. **User Presence**: Online/offline status updates
3. **Channel Updates**: Real-time channel creation and modifications
4. **Development Hot Reload**: Live code updates in development

### WebSocket Communication Flow

```
Client                  Action Cable              Database
  │                         │                        │
  ├── Subscribe to Channel ─┤                        │
  │                         ├── Authenticate User ───┤
  │                         │                        │
  ├── Send Message ─────────┤                        │
  │                         ├── Validate & Save ─────┤
  │                         │                        │
  │                         ├── Broadcast to Channel │
  ├── Receive Message ◄─────┤                        │
```

## Data Access Patterns

### Active Record Patterns
- **STI (Single Table Inheritance)**: For conversation types
- **Polymorphic Associations**: For flexible message content
- **Junction Tables**: For many-to-many relationships with attributes
- **Soft Deletion**: Using `deleted_at` timestamps

### Query Optimization
- **Includes/Joins**: Eager loading to prevent N+1 queries
- **Scopes**: Reusable query logic
- **Database Indexes**: Strategic indexing for performance
- **Raw SQL**: Complex queries via Query Objects when needed

### Example Query Patterns
```ruby
# Optimized group conversation loading
def resolve(current_user:)
  relation
    .joins("LEFT JOIN conversation_participants cp_self ON cp_self.conversation_id = conversations.id AND cp_self.user_id = #{current_user.id}")
    .left_joins(:conversation_participants, :messages)
    .select(
      'conversations.*',
      'cp_self.last_read_message_id',
      'COUNT(DISTINCT conversation_participants.user_id) AS member_count',
      'COALESCE(MAX(messages.id), 0) > COALESCE(cp_self.last_read_message_id, 0) AS has_unread_messages'
    )
    .group('conversations.id, cp_self.last_read_message_id')
end
```

## Security Architecture

### Authentication
- **Session-based**: Cookie-based sessions for web clients
- **Password Security**: BCrypt hashing with salt
- **Remember Tokens**: Secure persistent login
- **Password Reset**: Time-limited tokens for password recovery

### Authorization
- **Role-based Access**: Admin/member roles in conversations
- **Ownership Checks**: Creator permissions for conversation management
- **Privacy Controls**: Public/private conversation visibility

### Data Protection
- **SQL Injection**: ActiveRecord parameterized queries
- **CSRF Protection**: Rails built-in CSRF tokens
- **CORS**: Configured for frontend origin
- **WebSocket Security**: Authenticated connections only

## Deployment Architecture

### Production Configuration
```ruby
# Puma configuration for production
workers 2
threads 1, 3
bind 'unix:///var/www/teamchat/shared/tmp/sockets/puma.sock'
preload_app!
```

### Infrastructure Components
- **Web Server**: Puma with Unix socket binding
- **Process Management**: Systemd or similar for production
- **Database**: PostgreSQL with connection pooling
- **Caching**: Solid Cache for database-backed caching
- **Background Jobs**: Solid Queue for asynchronous processing
- **WebSockets**: Solid Cable for persistent connections

### Scalability Considerations
- **Database Connection Pooling**: Configured per Rails max threads
- **Multi-process Architecture**: Puma workers for concurrent request handling
- **Caching Strategy**: Database-backed caching for consistency
- **Background Processing**: Asynchronous job processing for heavy operations

## Development Environment

### Development Tools
- **Hot Reload**: Live code updates via WebSocket
- **Debug Tools**: Rails debugging capabilities
- **Code Quality**: RuboCop for style enforcement
- **Database Tools**: Rails migrations and schema management

### Testing Strategy
- **Model Tests**: Unit tests for business logic
- **Controller Tests**: API endpoint testing
- **Integration Tests**: End-to-end feature testing
- **System Tests**: Browser-based testing for full workflows

## Performance Considerations

### Database Performance
- **Indexing Strategy**: Optimized indexes for common queries
- **Query Optimization**: N+1 prevention and efficient joins
- **Connection Pooling**: Proper pool sizing for concurrent access

### Caching Strategy
- **Fragment Caching**: For expensive view computations
- **Database Caching**: Solid Cache for query result caching
- **HTTP Caching**: Thruster for static asset optimization

### Real-time Performance
- **Connection Management**: Efficient WebSocket connection handling
- **Broadcasting Optimization**: Targeted message broadcasting
- **Presence Optimization**: Efficient online status tracking

## Monitoring and Observability

### Logging
- **Application Logs**: Rails structured logging
- **Database Logs**: PostgreSQL query logging
- **WebSocket Logs**: Action Cable connection and message logs

### Metrics
- **Performance Metrics**: Response times and throughput
- **Business Metrics**: User activity and message volume
- **System Metrics**: Database and server resource usage

## Future Architectural Considerations

### Planned Features
- **Message Search**: Full-text search implementation
- **File Sharing**: Enhanced file upload and sharing
- **Message Threading**: Improved threaded conversation support
- **Push Notifications**: Mobile and web push notifications

### Scalability Roadmap
- **Database Sharding**: For large-scale user bases
- **Message Queuing**: External message queue for high volume
- **CDN Integration**: For file and asset delivery
- **Microservices**: Potential service extraction for specific features

## Conclusion

The TeamChat backend architecture provides a solid foundation for a modern real-time chat application. Built on Rails 8.x with careful attention to real-time communication, data consistency, and scalability, it supports the current feature set while maintaining flexibility for future enhancements. The combination of proven Rails patterns with modern real-time capabilities creates a robust platform for team communication.
