# frozen_string_literal: true

puts "🌱 Starting chat seeding with realistic conversations..."

# Clear existing data
puts "🧹 Cleaning up existing data..."
ConversationParticipant.unscoped.delete_all
Conversation.unscoped.delete_all
User.unscoped.delete_all

# Create 10 users
puts "👥 Creating 10 users..."
users = [
  { first_name: "Alice", last_name: "Johnson", email: "alice.johnson@example.com" },
  { first_name: "Bob", last_name: "Smith", email: "bob.smith@example.com" },
  { first_name: "Charlie", last_name: "Brown", email: "charlie.brown@example.com" },
  { first_name: "Diana", last_name: "Wilson", email: "diana.wilson@example.com" },
  { first_name: "Eve", last_name: "Davis", email: "eve.davis@example.com" },
  { first_name: "Frank", last_name: "Miller", email: "frank.miller@example.com" },
  { first_name: "Grace", last_name: "Lee", email: "grace.lee@example.com" },
  { first_name: "Henry", last_name: "Taylor", email: "henry.taylor@example.com" },
  { first_name: "Ivy", last_name: "Anderson", email: "ivy.anderson@example.com" },
  { first_name: "Jack", last_name: "Thomas", email: "jack.thomas@example.com" }
]

created_users = users.map do |user_data|
  User.create!(
    first_name: user_data[:first_name],
    last_name: user_data[:last_name],
    email: user_data[:email],
    password: "123456",
    password_confirmation: "123456"
  )
end

puts "✅ Created #{created_users.count} users"

# Create 5 group conversations
puts "👨‍👩‍👧‍👦 Creating 5 group conversations..."
group_conversations = [
  { name: "Tech Team", participants: [0, 1, 2, 3], admin: 0 },
  { name: "Book Club", participants: [2, 4, 5, 6, 7], admin: 4 },
  { name: "Weekend Plans", participants: [1, 3, 5, 8, 9], admin: 3 },
  { name: "Project Alpha", participants: [0, 2, 4, 6], admin: 0 },
  { name: "Coffee Lovers", participants: [1, 5, 7, 8, 9], admin: 7 }
]

group_conversations.each_with_index do |conv_data, index|
  conversation = Conversation.create!(
    name: conv_data[:name],
    is_group: true,
    created_by: created_users[conv_data[:admin]]
  )

  # Add participants
  conv_data[:participants].each do |user_index|
    role = user_index == conv_data[:admin] ? "admin" : "member"
    ConversationParticipant.create!(
      conversation: conversation,
      user: created_users[user_index],
      role: role,
      joined_at: Time.current - rand(30).days,
      created_at: Time.current - rand(30).days
    )
  end

  puts "  ✅ Created group: #{conv_data[:name]} with #{conv_data[:participants].count} participants"
end

# Create 5 private conversations
puts "💬 Creating 5 private conversations..."
private_conversations = [
  { participants: [0, 1] },  # Alice & Bob
  { participants: [2, 3] },  # Charlie & Diana
  { participants: [4, 5] },  # Eve & Frank
  { participants: [6, 7] },  # Grace & Henry
  { participants: [8, 9] }   # Ivy & Jack
]

private_conversations.each_with_index do |conv_data, index|
  user1, user2 = conv_data[:participants].map { |i| created_users[i] }

  conversation = Conversation.create!(
    name: nil, # Private conversations typically don't have names
    is_group: false,
    created_by: user1
  )

  # Add both participants
  [user1, user2].each_with_index do |user, participant_index|
    ConversationParticipant.create!(
      conversation: conversation,
      user: user,
      role: "member",
      joined_at: Time.current - rand(30).days,
      created_at: Time.current - rand(30).days
    )
  end

  puts "  ✅ Created private conversation between #{user1.first_name} and #{user2.first_name}"
end

puts "\n🎉 Seeding completed successfully!"
puts "📊 Summary:"
puts "  - Users: #{User.count}"
puts "  - Conversations: #{Conversation.count}"
puts "  - Group conversations: #{Conversation.where(is_group: true).count}"
puts "  - Private conversations: #{Conversation.where(is_group: false).count}"
puts "  - Conversation participants: #{ConversationParticipant.count}"
puts "\n🔐 All users have password: 123456"
