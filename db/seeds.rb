# frozen_string_literal: true

puts "🌱 Starting chat seeding with realistic conversations..."

# Clear existing data
puts "🧹 Cleaning up existing data..."
Message.unscoped.delete_all
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
    password: "Qwer1234",
    password_confirmation: "Qwer1234"
  )
end

puts "✅ Created #{created_users.count} users"

# Create 5 group conversations
puts "👨‍👩‍👧‍👦 Creating 5 group conversations..."
group_conversations = [
  { name: "techteam", participants: [0, 1, 2, 3], admin: 0 },
  { name: "bookclub", participants: [2, 4, 5, 6, 7], admin: 4 },
  { name: "weekendplans", participants: [1, 3, 5, 8, 9], admin: 3 },
  { name: "projectalpha", participants: [0, 2, 4, 6], admin: 0 },
  { name: "coffeelovers", participants: [1, 5, 7, 8, 9], admin: 7 }
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

# Generate realistic chat messages
puts "💬 Generating realistic chat messages..."

# Helper method to create messages with realistic timestamps
def create_message(conversation, sender, content, created_at = nil)
  Message.create!(
    conversation: conversation,
    sender: sender,
    content: content,
    message_type: 'text',
    created_at: created_at || Time.current - rand(7).days - rand(24).hours
  )
end

# Messages for group conversations
group_convos = Conversation.where(is_group: true).includes(:participants, :users)

# Tech Team messages
tech_team = group_convos.find_by(name: "techteam")
if tech_team
  participants = tech_team.users.to_a
  base_time = 3.days.ago
  
  create_message(tech_team, participants[0], "Hey team! Ready for the sprint planning meeting?", base_time)
  create_message(tech_team, participants[1], "Absolutely! I've prepared the user stories", base_time + 5.minutes)
  create_message(tech_team, participants[2], "Great! Should we review the backlog first?", base_time + 10.minutes)
  create_message(tech_team, participants[0], "Good idea. Let's prioritize the authentication features", base_time + 15.minutes)
  create_message(tech_team, participants[3], "I can take the OAuth integration task", base_time + 20.minutes)
  create_message(tech_team, participants[1], "Perfect! I'll handle the password reset flow", base_time + 25.minutes)
  create_message(tech_team, participants[2], "Sounds like a plan. Meeting at 2 PM?", base_time + 30.minutes)
  create_message(tech_team, participants[0], "👍 See you all then!", base_time + 35.minutes)
end

# Book Club messages
book_club = group_convos.find_by(name: "bookclub")
if book_club
  participants = book_club.users.to_a
  base_time = 2.days.ago
  
  create_message(book_club, participants[0], "Just finished 'The Midnight Library'! What did everyone think?", base_time)
  create_message(book_club, participants[1], "Loved it! The concept of infinite lives was fascinating", base_time + 1.hour)
  create_message(book_club, participants[2], "Same here! Made me think about my own life choices", base_time + 2.hours)
  create_message(book_club, participants[3], "The philosophy was a bit heavy for me, but still enjoyed it", base_time + 3.hours)
  create_message(book_club, participants[4], "What should we read next? I'm thinking sci-fi", base_time + 4.hours)
  create_message(book_club, participants[0], "How about 'Project Hail Mary'? I've heard great things", base_time + 5.hours)
  create_message(book_club, participants[1], "Andy Weir! Yes! I loved 'The Martian'", base_time + 6.hours)
  create_message(book_club, participants[2], "Count me in! 🚀", base_time + 7.hours)
end

# Weekend Plans messages
weekend_plans = group_convos.find_by(name: "weekendplans")
if weekend_plans
  participants = weekend_plans.users.to_a
  base_time = 1.day.ago
  
  create_message(weekend_plans, participants[0], "Anyone up for hiking this Saturday?", base_time)
  create_message(weekend_plans, participants[1], "I'm in! Which trail were you thinking?", base_time + 30.minutes)
  create_message(weekend_plans, participants[2], "Mount Wilson? It's perfect weather for it", base_time + 45.minutes)
  create_message(weekend_plans, participants[3], "That sounds great! What time should we meet?", base_time + 1.hour)
  create_message(weekend_plans, participants[0], "How about 8 AM at the trailhead parking?", base_time + 1.hour + 15.minutes)
  create_message(weekend_plans, participants[4], "Perfect! I'll bring snacks and water", base_time + 1.hour + 30.minutes)
  create_message(weekend_plans, participants[1], "I'll bring the first aid kit just in case", base_time + 1.hour + 45.minutes)
  create_message(weekend_plans, participants[2], "Great planning! Can't wait 🥾", base_time + 2.hours)
end

# Project Alpha messages
project_alpha = group_convos.find_by(name: "projectalpha")
if project_alpha
  participants = project_alpha.users.to_a
  base_time = 4.hours.ago
  
  create_message(project_alpha, participants[0], "Update: The database migration completed successfully!", base_time)
  create_message(project_alpha, participants[1], "Excellent! Any performance improvements?", base_time + 10.minutes)
  create_message(project_alpha, participants[0], "Query times are down by 40%! 🎉", base_time + 15.minutes)
  create_message(project_alpha, participants[2], "That's fantastic! Ready for the client demo?", base_time + 20.minutes)
  create_message(project_alpha, participants[3], "I've prepared the presentation slides", base_time + 25.minutes)
  create_message(project_alpha, participants[0], "Perfect. Demo is at 3 PM tomorrow", base_time + 30.minutes)
  create_message(project_alpha, participants[1], "I'll be there. This is going to be great!", base_time + 35.minutes)
end

# Coffee Lovers messages
coffee_lovers = group_convos.find_by(name: "coffeelovers")
if coffee_lovers
  participants = coffee_lovers.users.to_a
  base_time = 6.hours.ago
  
  create_message(coffee_lovers, participants[0], "Found this amazing new coffee shop downtown!", base_time)
  create_message(coffee_lovers, participants[1], "Ooh, what's it called?", base_time + 5.minutes)
  create_message(coffee_lovers, participants[0], "Bean There, Done That. They have single-origin beans from Ethiopia", base_time + 10.minutes)
  create_message(coffee_lovers, participants[2], "Ethiopian coffee! My favorite ☕", base_time + 15.minutes)
  create_message(coffee_lovers, participants[3], "Do they have good pastries too?", base_time + 20.minutes)
  create_message(coffee_lovers, participants[0], "Yes! Their croissants are incredible", base_time + 25.minutes)
  create_message(coffee_lovers, participants[4], "Coffee meetup this weekend?", base_time + 30.minutes)
  create_message(coffee_lovers, participants[1], "I'm down! Saturday morning?", base_time + 35.minutes)
  create_message(coffee_lovers, participants[2], "Perfect! See you all there ☕", base_time + 40.minutes)
end

# Messages for private conversations
private_convos = Conversation.where(is_group: false).includes(:users)

private_convos.each_with_index do |conversation, index|
  users = conversation.users.to_a
  user1, user2 = users[0], users[1]
  
  case index
  when 0 # Alice & Bob
    base_time = 1.day.ago
    create_message(conversation, user1, "Hey! How did the presentation go?", base_time)
    create_message(conversation, user2, "It went really well! Thanks for the prep help", base_time + 1.hour)
    create_message(conversation, user1, "That's awesome! Celebrate with dinner tonight?", base_time + 2.hours)
    create_message(conversation, user2, "Absolutely! That new Italian place?", base_time + 2.hours + 30.minutes)
    create_message(conversation, user1, "Perfect! See you at 7 PM 🍝", base_time + 3.hours)
    
  when 1 # Charlie & Diana
    base_time = 2.days.ago
    create_message(conversation, user1, "Did you see the game last night?", base_time)
    create_message(conversation, user2, "Yes! What a comeback in the third quarter!", base_time + 30.minutes)
    create_message(conversation, user1, "I can't believe that final shot went in", base_time + 1.hour)
    create_message(conversation, user2, "Pure luck! Want to watch the playoffs together?", base_time + 1.hour + 30.minutes)
    create_message(conversation, user1, "Definitely! I'll bring the snacks 🍿", base_time + 2.hours)
    
  when 2 # Eve & Frank
    base_time = 3.days.ago
    create_message(conversation, user1, "Thanks for recommending that book!", base_time)
    create_message(conversation, user2, "You finished it already? That was fast!", base_time + 2.hours)
    create_message(conversation, user1, "Couldn't put it down! Do you have more recommendations?", base_time + 4.hours)
    create_message(conversation, user2, "Try 'The Seven Husbands of Evelyn Hugo' next", base_time + 5.hours)
    create_message(conversation, user1, "Added to my reading list! 📚", base_time + 6.hours)
    
  when 3 # Grace & Henry
    base_time = 12.hours.ago
    create_message(conversation, user1, "Morning! Coffee before the meeting?", base_time)
    create_message(conversation, user2, "Great idea! The usual place?", base_time + 10.minutes)
    create_message(conversation, user1, "Yep! See you in 15 minutes", base_time + 15.minutes)
    create_message(conversation, user2, "On my way! ☕", base_time + 20.minutes)
    
  when 4 # Ivy & Jack
    base_time = 5.hours.ago
    create_message(conversation, user1, "How's the new apartment?", base_time)
    create_message(conversation, user2, "Love it! Great view of the city", base_time + 1.hour)
    create_message(conversation, user1, "That sounds amazing! Housewarming party?", base_time + 2.hours)
    create_message(conversation, user2, "Absolutely! Next weekend work for you?", base_time + 2.hours + 30.minutes)
    create_message(conversation, user1, "Perfect! I'll bring a plant for your new place 🌱", base_time + 3.hours)
  end
end

puts "✅ Generated realistic messages for all conversations"

puts "\n🎉 Seeding completed successfully!"
puts "📊 Summary:"
puts "  - Users: #{User.count}"
puts "  - Conversations: #{Conversation.count}"
puts "  - Group conversations: #{Conversation.where(is_group: true).count}"
puts "  - Private conversations: #{Conversation.where(is_group: false).count}"
puts "  - Conversation participants: #{ConversationParticipant.count}"
puts "  - Messages: #{Message.count}"
puts "\n🔐 All users have password: 123456"
puts "💬 All conversation names are now lowercase, no spaces/periods, under 30 chars"
