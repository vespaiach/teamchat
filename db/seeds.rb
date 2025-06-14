# frozen_string_literal: true

puts "🌱 Starting chat seeding with realistic conversations..."

avatar_blob = ActiveStorage::Blob.create_and_upload!(
  io: File.open(Rails.root.join('public', 'avatar.jpg'), "rb"),
  filename: "avatar.jpg",
  content_type: "image/jpeg"
)

# Create diverse set of users with realistic names
user_data = [
  { first: 'Sarah', last: 'Chen', role: 'Product Manager' },
  { first: 'Marcus', last: 'Johnson', role: 'Senior Developer' },
  { first: 'Emily', last: 'Rodriguez', role: 'UX Designer' },
  { first: 'David', last: 'Kim', role: 'DevOps Engineer' },
  { first: 'Jessica', last: 'Thompson', role: 'Marketing Lead' },
  { first: 'Alex', last: 'Patel', role: 'Full Stack Developer' },
  { first: 'Maria', last: 'Garcia', role: 'Data Scientist' },
  { first: 'James', last: 'Wilson', role: 'QA Engineer' },
  { first: 'Lisa', last: 'Anderson', role: 'Technical Writer' },
  { first: 'Ryan', last: 'Brown', role: 'Frontend Developer' },
  { first: 'Nina', last: 'Davis', role: 'Backend Developer' },
  { first: 'Carlos', last: 'Martinez', role: 'Solutions Architect' },
  { first: 'Amanda', last: 'Taylor', role: 'Scrum Master' },
  { first: 'Kevin', last: 'Lee', role: 'Mobile Developer' },
  { first: 'Sophie', last: 'Miller', role: 'Business Analyst' }
]

users = user_data.map do |data|
  email = "#{data[:first].downcase}.#{data[:last].downcase}@example.com"
  user = User.find_by(first_name: data[:first], last_name: data[:last], email: email)
  if user.nil?
    user = User.create!(
      first_name: data[:first],
      last_name: data[:last],
      email: email,
      password: '123456',
      password_confirmation: '123456'
    )
    user.avatar.attach(avatar_blob.signed_id)
  end
  user
end

puts "👥 Created #{users.count} users"

# Helper method to create messages with realistic timing
# Ensures unique timestamps globally across all rooms
$message_counter = 0

def create_chat_message(room, sender, message, created_at)
  # Add counter to ensure unique timestamps globally
  $message_counter += 1
  unique_timestamp = created_at + $message_counter.seconds

  room.chats.create!(
    sender: sender,
    message: message,
    created_at: unique_timestamp
  )
end

# 1. Product Development Team - Sprint Planning & Daily Standups (350+ messages)
unless Room.exists?(name: 'Product Development Team')
  puts "💬 Creating Product Development Team conversation..."

  ActiveRecord::Base.transaction do
    sarah = users.find { |u| u.first_name == 'Sarah' }
    marcus = users.find { |u| u.first_name == 'Marcus' }
    emily = users.find { |u| u.first_name == 'Emily' }
    david = users.find { |u| u.first_name == 'David' }
    alex = users.find { |u| u.first_name == 'Alex' }
    amanda = users.find { |u| u.first_name == 'Amanda' }

    room = Room.create!(name: 'Product Development Team', created_by: sarah)
    team_members = [sarah, marcus, emily, david, alex, amanda]

    team_members.each do |user|
      RoomUser.find_or_create_by!(room: room, user: user)
    end

    base_time = 3.weeks.ago.beginning_of_week

    # Sprint Planning Day 1
    messages = [
      [sarah, "Good morning team! 🌅", base_time + 9.hours],
      [sarah, "Ready for sprint planning?", base_time + 9.hours + 15.seconds],
      [sarah, "We have some exciting features to discuss today", base_time + 9.hours + 30.seconds],
      [amanda, "Morning Sarah!", base_time + 9.hours + 2.minutes],
      [amanda, "I've prepared the backlog review", base_time + 9.hours + 2.minutes + 10.seconds],
      [amanda, "We have 23 user stories ready for estimation", base_time + 9.hours + 2.minutes + 25.seconds],
      [marcus, "Hey everyone! Just grabbed coffee ☕", base_time + 9.hours + 5.minutes],
      [marcus, "Looking forward to diving into the new authentication system", base_time + 9.hours + 5.minutes + 20.seconds],
      [emily, "Morning team!", base_time + 9.hours + 7.minutes],
      [emily, "I've updated all the wireframes based on last week's user feedback", base_time + 9.hours + 7.minutes + 15.seconds],
      [emily, "The onboarding flow is much cleaner now", base_time + 9.hours + 7.minutes + 30.seconds],
      [david, "Good morning!", base_time + 9.hours + 10.minutes],
      [david, "Infrastructure is ready for the new features", base_time + 9.hours + 10.minutes + 10.seconds],
      [david, "Deployed the staging environment updates yesterday", base_time + 9.hours + 10.minutes + 25.seconds],
      [alex, "Morning! Excited to work on the notification system", base_time + 9.hours + 12.minutes],
      [alex, "I've been researching WebSocket implementations", base_time + 9.hours + 12.minutes + 15.seconds],
      [alex, "Found some interesting patterns we could use", base_time + 9.hours + 12.minutes + 30.seconds],
      [sarah, "Perfect! Let's start with the authentication epic", base_time + 9.hours + 15.minutes],
      [sarah, "Marcus, can you walk us through the technical approach?", base_time + 9.hours + 15.minutes + 15.seconds],
      [marcus, "Absolutely!", base_time + 9.hours + 17.minutes],
      [marcus, "So we're implementing OAuth 2.0 with JWT tokens", base_time + 9.hours + 17.minutes + 10.seconds],
      [marcus, "The flow will be: user clicks login → redirects to provider", base_time + 9.hours + 17.minutes + 25.seconds],
      [marcus, "→ callback with auth code → exchange for tokens → create session", base_time + 9.hours + 17.minutes + 40.seconds],
      [emily, "That sounds solid from a technical perspective", base_time + 9.hours + 20.minutes],
      [emily, "From UX perspective, should we support social logins?", base_time + 9.hours + 20.minutes + 15.seconds],
      [emily, "Google, GitHub, maybe Apple?", base_time + 9.hours + 20.minutes + 30.seconds],
      [sarah, "Great question Emily", base_time + 9.hours + 22.minutes],
      [sarah, "Let's prioritize Google and GitHub for developers", base_time + 9.hours + 22.minutes + 10.seconds],
      [sarah, "Apple can be phase 2", base_time + 9.hours + 22.minutes + 20.seconds],
      [david, "For security, I recommend implementing rate limiting on auth endpoints", base_time + 9.hours + 25.minutes],
      [david, "We should also add 2FA support", base_time + 9.hours + 25.minutes + 15.seconds],
      [alex, "Agreed on 2FA", base_time + 9.hours + 27.minutes],
      [alex, "Should we use TOTP (like Google Authenticator) or SMS?", base_time + 9.hours + 27.minutes + 10.seconds],
      [alex, "Or both?", base_time + 9.hours + 27.minutes + 20.seconds],
      [marcus, "TOTP is more secure", base_time + 9.hours + 30.minutes],
      [marcus, "SMS has SIM swapping risks", base_time + 9.hours + 30.minutes + 10.seconds],
      [marcus, "Let's start with TOTP and add SMS as backup option", base_time + 9.hours + 30.minutes + 25.seconds],
      [amanda, "From timeline perspective", base_time + 9.hours + 32.minutes],
      [amanda, "how many story points are we looking at for the full auth system?", base_time + 9.hours + 32.minutes + 10.seconds],
      [marcus, "Let me break it down:", base_time + 9.hours + 35.minutes],
      [marcus, "OAuth setup (8 points)", base_time + 9.hours + 35.minutes + 5.seconds],
      [marcus, "JWT implementation (5 points)", base_time + 9.hours + 35.minutes + 15.seconds],
      [marcus, "social providers (13 points)", base_time + 9.hours + 35.minutes + 25.seconds],
      [marcus, "2FA (8 points)", base_time + 9.hours + 35.minutes + 35.seconds],
      [marcus, "Total ~34 points", base_time + 9.hours + 35.minutes + 45.seconds],
      [sarah, "That's significant", base_time + 9.hours + 37.minutes],
      [sarah, "Should we break it into smaller deliverables?", base_time + 9.hours + 37.minutes + 10.seconds],
      [emily, "Yes! We could do:", base_time + 9.hours + 40.minutes],
      [emily, "1) Basic OAuth", base_time + 9.hours + 40.minutes + 5.seconds],
      [emily, "2) Social logins", base_time + 9.hours + 40.minutes + 15.seconds],
      [emily, "3) 2FA", base_time + 9.hours + 40.minutes + 25.seconds],
      [emily, "Each can be tested independently", base_time + 9.hours + 40.minutes + 35.seconds],
      [david, "I like that approach", base_time + 9.hours + 42.minutes],
      [david, "Also easier to rollback if we find issues", base_time + 9.hours + 42.minutes + 10.seconds],
      [alex, "Sounds good!", base_time + 9.hours + 45.minutes],
      [alex, "I can start on the frontend auth components", base_time + 9.hours + 45.minutes + 10.seconds],
      [alex, "while Marcus works on backend", base_time + 9.hours + 45.minutes + 20.seconds],
      [amanda, "Perfect!", base_time + 9.hours + 47.minutes],
      [amanda, "Let's move these to the sprint backlog", base_time + 9.hours + 47.minutes + 10.seconds],
      [amanda, "Next epic is the notification system?", base_time + 9.hours + 47.minutes + 20.seconds],
      [alex, "Yes! I've been researching real-time notifications", base_time + 9.hours + 50.minutes],
      [alex, "WebSockets vs Server-Sent Events vs Push API", base_time + 9.hours + 50.minutes + 15.seconds],
      [alex, "Each has different trade-offs", base_time + 9.hours + 50.minutes + 30.seconds],
      [sarah, "What's your recommendation Alex?", base_time + 9.hours + 52.minutes],
      [alex, "WebSockets for real-time chat", base_time + 9.hours + 55.minutes],
      [alex, "Push API for browser notifications when app is closed", base_time + 9.hours + 55.minutes + 15.seconds],
      [alex, "and SSE as fallback", base_time + 9.hours + 55.minutes + 30.seconds],
      [david, "We'll need a message queue for reliable delivery", base_time + 9.hours + 57.minutes],
      [david, "Redis pub/sub or RabbitMQ?", base_time + 9.hours + 57.minutes + 15.seconds],
      [marcus, "Redis pub/sub should work for our scale", base_time + 10.hours],
      [marcus, "It's simpler and we already use Redis for caching", base_time + 10.hours + 10.seconds],
      [emily, "For UX, users should be able to control notification preferences", base_time + 10.hours + 2.minutes],
      [emily, "In-app, email, browser push", base_time + 10.hours + 2.minutes + 10.seconds],
      [emily, "all toggleable", base_time + 10.hours + 2.minutes + 20.seconds],
      [alex, "Absolutely!", base_time + 10.hours + 5.minutes],
      [alex, "I'll design a preference center", base_time + 10.hours + 5.minutes + 10.seconds],
      [alex, "Categories like: mentions, direct messages, system updates", base_time + 10.hours + 5.minutes + 25.seconds],
      [sarah, "Great!", base_time + 10.hours + 7.minutes],
      [sarah, "Emily, can you design the notification components?", base_time + 10.hours + 7.minutes + 10.seconds],
      [sarah, "Toast notifications, notification center?", base_time + 10.hours + 7.minutes + 20.seconds],
      [emily, "On it!", base_time + 10.hours + 10.minutes],
      [emily, "I'm thinking slide-in toasts from top-right", base_time + 10.hours + 10.minutes + 10.seconds],
      [emily, "and a bell icon with badge count for the center", base_time + 10.hours + 10.minutes + 25.seconds],
      [amanda, "Timeline for notifications epic?", base_time + 10.hours + 12.minutes],
      [alex, "Let me estimate:", base_time + 10.hours + 15.minutes],
      [alex, "WebSocket setup (5 points)", base_time + 10.hours + 15.minutes + 5.seconds],
      [alex, "Push API integration (8 points)", base_time + 10.hours + 15.minutes + 15.seconds],
      [alex, "Preference center (5 points)", base_time + 10.hours + 15.minutes + 25.seconds],
      [alex, "UI components (8 points)", base_time + 10.hours + 15.minutes + 35.seconds],
      [alex, "~26 points total", base_time + 10.hours + 15.minutes + 45.seconds],
      [sarah, "Excellent!", base_time + 10.hours + 17.minutes],
      [sarah, "That gives us 60 points across two major epics", base_time + 10.hours + 17.minutes + 10.seconds],
      [sarah, "Realistic for a 2-week sprint?", base_time + 10.hours + 17.minutes + 20.seconds],
      [amanda, "With the team velocity from last sprint (42 points)", base_time + 10.hours + 20.minutes],
      [amanda, "we might want to reduce scope slightly", base_time + 10.hours + 20.minutes + 15.seconds],
      [marcus, "Good point", base_time + 10.hours + 22.minutes],
      [marcus, "Maybe push 2FA to next sprint?", base_time + 10.hours + 22.minutes + 10.seconds],
      [marcus, "Focus on core auth + notifications?", base_time + 10.hours + 22.minutes + 20.seconds],
      [david, "That works", base_time + 10.hours + 25.minutes],
      [david, "Gives us buffer for unexpected issues too", base_time + 10.hours + 25.minutes + 10.seconds],
      [sarah, "Agreed!", base_time + 10.hours + 27.minutes],
      [sarah, "Let's finalize: Sprint 12 will have OAuth implementation", base_time + 10.hours + 27.minutes + 10.seconds],
      [sarah, "social logins, and notification system foundation", base_time + 10.hours + 27.minutes + 25.seconds],
      [emily, "Perfect!", base_time + 10.hours + 30.minutes],
      [emily, "I'll have designs ready by Wednesday for review", base_time + 10.hours + 30.minutes + 10.seconds],
      [alex, "And I'll set up the development branches today", base_time + 10.hours + 32.minutes],
      [david, "I'll prepare the infrastructure changes", base_time + 10.hours + 35.minutes],
      [david, "new Redis config and WebSocket support", base_time + 10.hours + 35.minutes + 15.seconds],
      [amanda, "Great!", base_time + 10.hours + 37.minutes],
      [amanda, "Sprint starts tomorrow", base_time + 10.hours + 37.minutes + 10.seconds],
      [amanda, "Daily standups at 9 AM as usual?", base_time + 10.hours + 37.minutes + 20.seconds],
      [sarah, "Yes!", base_time + 10.hours + 40.minutes],
      [sarah, "And remember, we have the demo on Friday for stakeholders", base_time + 10.hours + 40.minutes + 15.seconds],
      [marcus, "Noted!", base_time + 10.hours + 42.minutes],
      [marcus, "I'll make sure auth flow is demo-ready by Thursday", base_time + 10.hours + 42.minutes + 15.seconds],
      [emily, "I'll prepare a demo script", base_time + 10.hours + 45.minutes],
      [emily, "highlighting the user experience improvements", base_time + 10.hours + 45.minutes + 15.seconds],
      [sarah, "Fantastic! Thanks everyone", base_time + 10.hours + 47.minutes],
      [sarah, "Let's make this sprint count! 🚀", base_time + 10.hours + 47.minutes + 10.seconds]
    ]

    # Day 2 - Daily Standup
    day2 = base_time + 1.day + 9.hours
    messages += [
      [amanda, "Good morning team!", day2],
      [amanda, "Daily standup time", day2 + 10.seconds],
      [amanda, "Sarah, want to start?", day2 + 20.seconds],
      [sarah, "Morning!", day2 + 2.minutes],
      [sarah, "Yesterday: Sprint planning, stakeholder updates", day2 + 2.minutes + 10.seconds],
      [sarah, "Today: Review design specs, prepare demo outline", day2 + 2.minutes + 25.seconds],
      [sarah, "No blockers", day2 + 2.minutes + 35.seconds],
      [marcus, "Yesterday: Set up OAuth service skeleton", day2 + 4.minutes],
      [marcus, "researched JWT libraries", day2 + 4.minutes + 10.seconds],
      [marcus, "Today: Implement token generation/validation", day2 + 4.minutes + 25.seconds],
      [marcus, "No blockers", day2 + 4.minutes + 35.seconds],
      [emily, "Yesterday: Refined onboarding wireframes", day2 + 6.minutes],
      [emily, "Today: Design auth screens and notification components", day2 + 6.minutes + 15.seconds],
      [emily, "No blockers", day2 + 6.minutes + 25.seconds],
      [david, "Yesterday: Redis configuration updates", day2 + 8.minutes],
      [david, "Today: WebSocket server setup, deploy to staging", day2 + 8.minutes + 15.seconds],
      [david, "No blockers", day2 + 8.minutes + 25.seconds],
      [alex, "Yesterday: Created development branches", day2 + 10.minutes],
      [alex, "researched push APIs", day2 + 10.minutes + 10.seconds],
      [alex, "Today: Start frontend auth components", day2 + 10.minutes + 25.seconds],
      [alex, "No blockers", day2 + 10.minutes + 35.seconds],
      [amanda, "Perfect! Everyone's tracking well", day2 + 12.minutes],
      [amanda, "Quick reminder: design review Wednesday at 2 PM", day2 + 12.minutes + 15.seconds],
      [sarah, "Thanks Amanda!", day2 + 15.minutes],
      [sarah, "Also, I'll be in client meetings this afternoon", day2 + 15.minutes + 10.seconds],
      [sarah, "but available on Slack", day2 + 15.minutes + 20.seconds],
      [emily, "Sarah, should I include the client feedback from last week in the designs?", day2 + 17.minutes],
      [sarah, "Yes!", day2 + 20.minutes],
      [sarah, "Especially the feedback about reducing form fields in onboarding", day2 + 20.minutes + 15.seconds],
      [marcus, "Speaking of forms", day2 + 22.minutes],
      [marcus, "should we implement progressive disclosure for advanced auth options?", day2 + 22.minutes + 15.seconds],
      [emily, "Great idea!", day2 + 25.minutes],
      [emily, "Hide 2FA setup behind 'Advanced Security' until needed", day2 + 25.minutes + 15.seconds],
      [alex, "That'll make the UI cleaner", day2 + 27.minutes],
      [alex, "I'll design the components with that in mind", day2 + 27.minutes + 15.seconds],
      [david, "Question: should we log all auth attempts for security monitoring?", day2 + 30.minutes],
      [sarah, "Absolutely!", day2 + 32.minutes],
      [sarah, "We need audit trails for compliance", day2 + 32.minutes + 10.seconds],
      [sarah, "Include IP, timestamp, success/failure", day2 + 32.minutes + 25.seconds],
      [marcus, "I'll add comprehensive logging to the auth service", day2 + 35.minutes],
      [amanda, "Great discussion!", day2 + 37.minutes],
      [amanda, "Let's keep momentum going", day2 + 37.minutes + 10.seconds],
      [amanda, "Talk to you all tomorrow!", day2 + 37.minutes + 20.seconds]
    ]

    # Day 3 - Mid-sprint check-in
    day3 = base_time + 2.days + 9.hours
    messages += [
      [amanda, "Wednesday standup!", day3],
      [amanda, "How's everyone progressing?", day3 + 10.seconds],
      [marcus, "Yesterday: Implemented JWT service", day3 + 2.minutes],
      [marcus, "started OAuth provider integration", day3 + 2.minutes + 10.seconds],
      [marcus, "Today: Finish Google OAuth, write tests", day3 + 2.minutes + 25.seconds],
      [marcus, "No blockers", day3 + 2.minutes + 35.seconds],
      [emily, "Yesterday: Completed auth screen designs", day3 + 4.minutes],
      [emily, "They look really clean!", day3 + 4.minutes + 10.seconds],
      [emily, "Today: Notification component designs", day3 + 4.minutes + 25.seconds],
      [emily, "prepare for 2 PM review", day3 + 4.minutes + 40.seconds],
      [emily, "No blockers", day3 + 4.minutes + 50.seconds],
      [alex, "Yesterday: Built login/signup components", day3 + 6.minutes],
      [alex, "They're responsive and accessible", day3 + 6.minutes + 15.seconds],
      [alex, "Today: Integration with Marcus's auth service", day3 + 6.minutes + 30.seconds],
      [alex, "No blockers", day3 + 6.minutes + 40.seconds],
      [david, "Yesterday: WebSocket server deployed to staging", day3 + 8.minutes],
      [david, "Running smoothly!", day3 + 8.minutes + 10.seconds],
      [david, "Today: Redis pub/sub setup, monitoring dashboards", day3 + 8.minutes + 25.seconds],
      [david, "No blockers", day3 + 8.minutes + 35.seconds],
      [sarah, "Yesterday: Client meetings went well!", day3 + 10.minutes],
      [sarah, "They love the direction we're taking", day3 + 10.minutes + 15.seconds],
      [sarah, "Today: Review designs, prepare demo content", day3 + 10.minutes + 30.seconds],
      [sarah, "No blockers", day3 + 10.minutes + 40.seconds],
      [amanda, "Excellent progress!", day3 + 12.minutes],
      [amanda, "Design review in 5 hours", day3 + 12.minutes + 10.seconds],
      [amanda, "Emily, anything you need from the team?", day3 + 12.minutes + 25.seconds],
      [emily, "Just feedback on the notification preferences layout", day3 + 15.minutes],
      [emily, "I'll share the prototypes at 2 PM", day3 + 15.minutes + 15.seconds],
      [alex, "Emily, should notifications have categories like Slack?", day3 + 17.minutes],
      [alex, "@channel, @here, direct mentions?", day3 + 17.minutes + 15.seconds],
      [emily, "Yes! I was thinking:", day3 + 20.minutes],
      [emily, "High (direct messages)", day3 + 20.minutes + 5.seconds],
      [emily, "Medium (mentions)", day3 + 20.minutes + 15.seconds],
      [emily, "Low (general updates)", day3 + 20.minutes + 25.seconds],
      [sarah, "Perfect!", day3 + 22.minutes],
      [sarah, "That matches user expectations from other platforms", day3 + 22.minutes + 15.seconds],
      [marcus, "From technical side", day3 + 25.minutes],
      [marcus, "we can easily categorize notifications in the payload", day3 + 25.minutes + 15.seconds],
      [david, "I'll make sure the message queue can handle priority routing", day3 + 27.minutes],
      [alex, "Quick question:", day3 + 30.minutes],
      [alex, "should we support notification scheduling?", day3 + 30.minutes + 10.seconds],
      [alex, "Like 'Do not disturb' hours?", day3 + 30.minutes + 25.seconds],
      [sarah, "That's a great feature!", day3 + 32.minutes],
      [sarah, "Maybe phase 2 though?", day3 + 32.minutes + 10.seconds],
      [sarah, "Let's nail the basics first", day3 + 32.minutes + 20.seconds],
      [emily, "Agreed", day3 + 35.minutes],
      [emily, "I'll design it but we can implement later", day3 + 35.minutes + 10.seconds],
      [amanda, "Smart approach!", day3 + 37.minutes],
      [amanda, "See everyone at the design review!", day3 + 37.minutes + 10.seconds]
    ]

    # Design Review Meeting
    day3_review = day3 + 5.hours
    messages += [
      [emily, "Design review time! Sharing my screen now 🖥️", day3_review],
      [sarah, "The login screen looks fantastic Emily! Clean and professional.", day3_review + 2.minutes],
      [marcus, "I like the social login buttons. Very clear call-to-action.", day3_review + 4.minutes],
      [alex, "The form validation states are perfect. Red for errors, green for success.", day3_review + 6.minutes],
      [david, "Good thinking on the loading states for OAuth redirects.", day3_review + 8.minutes],
      [emily, "Thanks! Now for notifications - here's the preference center.", day3_review + 10.minutes],
      [sarah, "Love the toggle switches! Very intuitive.", day3_review + 12.minutes],
      [alex, "The grouping makes sense: Account, Messages, Updates. Easy to find settings.", day3_review + 15.minutes],
      [marcus, "Emily, can we add email frequency options? Daily digest, instant, weekly?", day3_review + 17.minutes],
      [emily, "Absolutely! I'll add a dropdown for email preferences.", day3_review + 20.minutes],
      [david, "What about mobile push notification scheduling?", day3_review + 22.minutes],
      [emily, "Good point! I'll design a time picker for quiet hours.", day3_review + 25.minutes],
      [sarah, "This is excellent work Emily! The notification toast designs?", day3_review + 27.minutes],
      [emily, "Here they are! Slide in from top-right, auto-dismiss after 5 seconds unless hovered.", day3_review + 30.minutes],
      [alex, "Perfect! I can implement these with smooth animations.", day3_review + 32.minutes],
      [amanda, "Outstanding work Emily! Timeline for implementation?", day3_review + 35.minutes],
      [alex, "I can have the basic components done by tomorrow.", day3_review + 37.minutes],
      [marcus, "And I'll have the backend API ready for integration testing.", day3_review + 40.minutes],
      [sarah, "Excellent! This puts us on track for Friday's demo.", day3_review + 42.minutes],
      [emily, "I'll refine the designs based on today's feedback and share final specs tonight.", day3_review + 45.minutes],
      [amanda, "Perfect! Great collaboration team! 👏", day3_review + 47.minutes]
    ]

    # Continue with more days and conversations...
    # Day 4 - Integration day
    day4 = base_time + 3.days + 9.hours
    messages += [
      [amanda, "Thursday standup! Demo day tomorrow - how are we looking?", day4],
      [alex, "Yesterday: Implemented auth components, started notification UI. Today: Integration testing, polish animations. No blockers.", day4 + 2.minutes],
      [marcus, "Yesterday: Completed Google OAuth, comprehensive testing. Today: GitHub OAuth, API documentation. No blockers.", day4 + 4.minutes],
      [emily, "Yesterday: Finalized designs, created style guide. Today: Support integration, test user flows. No blockers.", day4 + 6.minutes],
      [david, "Yesterday: Redis setup complete, monitoring active. Today: Performance testing, backup verification. No blockers.", day4 + 8.minutes],
      [sarah, "Yesterday: Demo prep, stakeholder briefings. Today: Final testing, demo rehearsal. No blockers.", day4 + 10.minutes],
      [amanda, "Great! Alex and Marcus, need help with integration testing?", day4 + 12.minutes],
      [alex, "Marcus, is the staging API ready for frontend integration?", day4 + 15.minutes],
      [marcus, "Yes! Endpoint is live: https://staging-api.ourapp.com/auth - I'll share the docs in Slack.", day4 + 17.minutes],
      [alex, "Perfect! I'll start integration testing right after standup.", day4 + 20.minutes],
      [emily, "I'll be available for any UX tweaks during testing.", day4 + 22.minutes],
      [david, "Monitoring shows API response times under 200ms. Performance looks good!", day4 + 25.minutes],
      [sarah, "Excellent! What's our demo flow for tomorrow?", day4 + 27.minutes],
      [emily, "I suggest: 1) Show current login pain points, 2) Demo new OAuth flow, 3) Showcase notifications.", day4 + 30.minutes],
      [alex, "I can prepare a live demo with real OAuth providers.", day4 + 32.minutes],
      [marcus, "I'll have backup slides in case of connectivity issues.", day4 + 35.minutes],
      [sarah, "Perfect! Let's meet at 4 PM for demo rehearsal.", day4 + 37.minutes],
      [amanda, "Sounds like a plan! One more day team! 🎯", day4 + 40.minutes]
    ]

    # Integration testing updates throughout day 4
    integration_time = day4 + 1.hour
    messages += [
      [alex, "Starting integration testing now! 🧪", integration_time],
      [marcus, "API is ready. Let me know if you hit any issues!", integration_time + 5.minutes],
      [alex, "Google OAuth working perfectly! Smooth redirect flow.", integration_time + 15.minutes],
      [emily, "Excellent! How's the UI feeling during the auth process?", integration_time + 17.minutes],
      [alex, "Really smooth! The loading states you designed work great.", integration_time + 20.minutes],
      [marcus, "JWT tokens generating correctly. Session management working as expected.", integration_time + 25.minutes],
      [alex, "Quick question: should we auto-redirect after successful login?", integration_time + 30.minutes],
      [emily, "Yes, but with a brief success message first. 'Welcome back!' for 1 second.", integration_time + 32.minutes],
      [sarah, "Perfect! That adds a nice touch of personality.", integration_time + 35.minutes],
      [alex, "Implementing that now! Testing GitHub OAuth next.", integration_time + 37.minutes],
      [david, "Server logs look clean. No errors in the auth flow.", integration_time + 40.minutes],
      [marcus, "Alex, GitHub OAuth might need scope adjustments. Check the console for details.", integration_time + 45.minutes],
      [alex, "Saw that! Adjusting scopes now. Need user:email for profile info.", integration_time + 47.minutes],
      [marcus, "Exactly! I'll update the OAuth app settings.", integration_time + 50.minutes],
      [alex, "GitHub OAuth working now! Both providers tested successfully ✅", integration_time + 1.hour],
      [sarah, "Fantastic! How are notifications looking?", integration_time + 1.hour + 2.minutes],
      [alex, "Working on the WebSocket connection now. David, is the server ready?", integration_time + 1.hour + 5.minutes],
      [david, "Yes! WebSocket endpoint: wss://staging-api.ourapp.com/notifications", integration_time + 1.hour + 7.minutes],
      [alex, "Connected! Real-time notifications working. Testing toast components now.", integration_time + 1.hour + 15.minutes],
      [emily, "How do the animations look?", integration_time + 1.hour + 17.minutes],
      [alex, "Buttery smooth! The slide-in effect is perfect.", integration_time + 1.hour + 20.minutes],
      [marcus, "Backend is sending test notifications. Are you receiving them Alex?", integration_time + 1.hour + 25.minutes],
      [alex, "Yes! Toasts appearing correctly. Auto-dismiss working after 5 seconds.", integration_time + 1.hour + 27.minutes],
      [sarah, "This is incredible progress! Ready for stakeholder demo?", integration_time + 1.hour + 30.minutes],
      [alex, "Almost! Just need to test the preference center and we're good to go.", integration_time + 1.hour + 32.minutes],
      [emily, "Alex, make sure to test the toggle switches - they should save immediately.", integration_time + 1.hour + 35.minutes],
      [alex, "Testing now... Perfect! Preferences saving instantly with nice visual feedback.", integration_time + 1.hour + 40.minutes],
      [david, "All systems green! Performance metrics looking excellent.", integration_time + 1.hour + 42.minutes],
      [amanda, "Outstanding work everyone! Ready for demo rehearsal at 4 PM.", integration_time + 1.hour + 45.minutes]
    ]

    # Demo rehearsal
    rehearsal_time = day4 + 7.hours
    messages += [
      [sarah, "Demo rehearsal time! Let's run through the full presentation.", rehearsal_time],
      [emily, "I'll start with the problem statement - current auth friction points.", rehearsal_time + 2.minutes],
      [alex, "Then I'll demo the new OAuth flow - Google first, then GitHub.", rehearsal_time + 4.minutes],
      [marcus, "I can explain the technical architecture if stakeholders have questions.", rehearsal_time + 6.minutes],
      [sarah, "Perfect! Emily, go ahead and start.", rehearsal_time + 8.minutes],
      [emily, "Our users currently face 3 main issues: 1) Complex registration, 2) Password management, 3) No social options...", rehearsal_time + 10.minutes],
      [sarah, "Excellent setup! Alex, show us the new flow.", rehearsal_time + 12.minutes],
      [alex, "Here's our solution! Single click sign-in with Google... *clicks* ...and we're in! No forms, no passwords.", rehearsal_time + 15.minutes],
      [sarah, "Wow! That's incredibly smooth. The redirect feels instant.", rehearsal_time + 17.minutes],
      [emily, "The success animation is a nice touch! Users will love that feedback.", rehearsal_time + 20.minutes],
      [alex, "Now let me show GitHub OAuth... same smooth experience, different provider.", rehearsal_time + 22.minutes],
      [marcus, "Behind the scenes, we're using industry-standard OAuth 2.0 with secure JWT tokens.", rehearsal_time + 25.minutes],
      [david, "And everything's hosted on our secure infrastructure with monitoring.", rehearsal_time + 27.minutes],
      [sarah, "Excellent! Now show the notification system Alex.", rehearsal_time + 30.minutes],
      [alex, "Here's the magic - real-time notifications! Watch this toast appear when Marcus sends a message.", rehearsal_time + 32.minutes],
      [marcus, "*Sends test notification*", rehearsal_time + 34.minutes],
      [alex, "Perfect! See how it slides in smoothly and auto-dismisses?", rehearsal_time + 36.minutes],
      [emily, "And users have full control - here's the preference center with granular settings.", rehearsal_time + 38.minutes],
      [alex, "Toggle switches save instantly, categories are clear, and there's even email frequency control.", rehearsal_time + 40.minutes],
      [sarah, "This is fantastic! Stakeholders will be impressed. Any final tweaks needed?", rehearsal_time + 42.minutes],
      [alex, "Maybe add one more test notification to show the bell badge count?", rehearsal_time + 45.minutes],
      [marcus, "Good idea! I'll send a few different notification types.", rehearsal_time + 47.minutes],
      [emily, "And I'll explain how this improves user engagement and retention.", rehearsal_time + 50.minutes],
      [sarah, "Perfect! We're ready for tomorrow. Great work everyone! 🎉", rehearsal_time + 52.minutes],
      [amanda, "Incredible job team! This sprint exceeded expectations.", rehearsal_time + 55.minutes]
    ]

    # Demo Day - Day 5
    demo_day = base_time + 4.days + 9.hours
    messages += [
      [sarah, "Demo day! Everyone ready? Stakeholders arrive in 2 hours. 🎯", demo_day],
      [amanda, "Final standup before the big presentation!", demo_day + 2.minutes],
      [alex, "Yesterday: Integration testing complete, rehearsal successful. Today: Live demo, stakeholder Q&A. No blockers.", demo_day + 4.minutes],
      [marcus, "Yesterday: API polished, documentation updated. Today: Technical backup, answer architecture questions. No blockers.", demo_day + 6.minutes],
      [emily, "Yesterday: Demo narrative finalized. Today: Present UX improvements, gather feedback. No blockers.", demo_day + 8.minutes],
      [david, "Yesterday: Performance testing complete. Today: Monitor systems during demo. No blockers.", demo_day + 10.minutes],
      [sarah, "Yesterday: Stakeholder prep calls. Today: Lead presentation, discuss roadmap. No blockers.", demo_day + 12.minutes],
      [amanda, "Fantastic! System status David?", demo_day + 14.minutes],
      [david, "All green! API response times optimal, WebSocket connections stable.", demo_day + 16.minutes],
      [marcus, "Test data refreshed, demo accounts ready.", demo_day + 18.minutes],
      [alex, "UI polished, animations smooth, fallbacks tested.", demo_day + 20.minutes],
      [emily, "Presentation deck finalized, user journey mapped.", demo_day + 22.minutes],
      [sarah, "Perfect! Let's make this demo memorable! 🚀", demo_day + 25.minutes]
    ]

    # Post-demo celebration
    post_demo = demo_day + 6.hours
    messages += [
      [sarah, "WOW! That demo was incredible! Stakeholders were blown away! 🎉", post_demo],
      [emily, "Did you see their faces when Alex showed the OAuth flow? Pure amazement!", post_demo + 2.minutes],
      [alex, "The real-time notifications got the biggest reaction! 'This is exactly what we needed!'", post_demo + 4.minutes],
      [marcus, "The technical questions were great too. They really understand the value now.", post_demo + 6.minutes],
      [david, "No system hiccups during the demo! Infrastructure performed flawlessly.", post_demo + 8.minutes],
      [amanda, "The CEO said this was the best product demo he's seen this year!", post_demo + 10.minutes],
      [sarah, "They approved the roadmap for next quarter! Full notification system + 2FA!", post_demo + 12.minutes],
      [emily, "And they want to fast-track the mobile app integration!", post_demo + 14.minutes],
      [alex, "I'm so proud of this team! We delivered something truly special.", post_demo + 16.minutes],
      [marcus, "Agreed! This sprint will be remembered as a turning point.", post_demo + 18.minutes],
      [david, "Team dinner tonight to celebrate? My treat! 🍕", post_demo + 20.minutes],
      [sarah, "Absolutely! You all earned it. Incredible work everyone!", post_demo + 22.minutes],
      [amanda, "Best. Sprint. Ever! 🏆", post_demo + 25.minutes]
    ]

    # Sprint Retrospective
    retro_day = demo_day + 1.day + 2.hours
    messages += [
      [amanda, "Sprint retrospective time! What went well this sprint?", retro_day],
      [emily, "Design-dev collaboration was seamless! Alex implemented my designs perfectly.", retro_day + 2.minutes],
      [alex, "Emily's designs made implementation so much easier! Clear specs, great details.", retro_day + 4.minutes],
      [marcus, "Technical decisions were well-researched. OAuth integration went smoothly.", retro_day + 6.minutes],
      [david, "Infrastructure changes were planned ahead. No last-minute scrambling.", retro_day + 8.minutes],
      [sarah, "Communication was excellent! Daily standups kept everyone aligned.", retro_day + 10.minutes],
      [amanda, "Great feedback! What could we improve next sprint?", retro_day + 12.minutes],
      [alex, "Maybe start integration testing earlier? Day 2 instead of day 4?", retro_day + 14.minutes],
      [marcus, "Good point! Earlier integration catches issues sooner.", retro_day + 16.minutes],
      [emily, "I could deliver designs by day 1 if I have requirements earlier.", retro_day + 18.minutes],
      [sarah, "Noted! I'll share requirements in sprint planning, not after.", retro_day + 20.minutes],
      [david, "More load testing would be good. Simulate real user traffic.", retro_day + 22.minutes],
      [amanda, "Excellent insights! Any process improvements?", retro_day + 24.minutes],
      [alex, "Code review process worked well. Good feedback, quick turnaround.", retro_day + 26.minutes],
      [marcus, "Pair programming sessions were valuable. More of those next sprint?", retro_day + 28.minutes],
      [emily, "Yes! Especially for complex features.", retro_day + 30.minutes],
      [sarah, "Agreed! This team chemistry is special. Let's build on it!", retro_day + 32.minutes],
      [amanda, "Perfect! Sprint 13 planning starts Monday. Rest up this weekend! 😴", retro_day + 35.minutes]
    ]

    # Add weekend casual chats
    weekend = retro_day + 2.days + 10.hours
    messages += [
      [alex, "Hope everyone's having a good weekend! Still buzzing from that demo 😊", weekend],
      [emily, "Same! Already sketching ideas for the mobile app integration 📱", weekend + 1.hour],
      [marcus, "Ha! I was researching push notification APIs for iOS/Android 🤓", weekend + 1.hour + 30.minutes],
      [sarah, "You all are amazing! Try to actually relax though 😄", weekend + 2.hours],
      [david, "Just finished a hike! Fresh air helps process the week's learnings 🥾", weekend + 3.hours],
      [amanda, "Great idea David! I'm reading a book on team dynamics", weekend + 4.hours],
      [alex, "What book Amanda? Always looking for good reads", weekend + 4.hours + 15.minutes],
      [amanda, "'The Culture Map' by Erin Meyer. Fascinating stuff about collaboration!", weekend + 4.hours + 30.minutes],
      [emily, "Adding to my reading list! Speaking of culture, proud to be part of this team 💜", weekend + 5.hours],
      [sarah, "Feeling's mutual Emily! See everyone Monday for Sprint 13! 🚀", weekend + 6.hours]
    ]

    # Create all messages
    puts "📝 Creating #{messages.length} messages for Product Development Team..."
    messages.each do |sender, message, timestamp|
      create_chat_message(room, sender, message, timestamp)
    end
  end
end

# 2. Remote Team Standup & Collaboration (350+ messages)
unless Room.exists?(name: 'Remote Team Daily')
  puts "💬 Creating Remote Team Daily conversation..."

  ActiveRecord::Base.transaction do
    jessica = users.find { |u| u.first_name == 'Jessica' }
    james = users.find { |u| u.first_name == 'James' }
    lisa = users.find { |u| u.first_name == 'Lisa' }
    ryan = users.find { |u| u.first_name == 'Ryan' }
    nina = users.find { |u| u.first_name == 'Nina' }
    carlos = users.find { |u| u.first_name == 'Carlos' }

    room = Room.create!(name: 'Remote Team Daily', created_by: jessica)
    team_members = [jessica, james, lisa, ryan, nina, carlos]

    team_members.each do |user|
      RoomUser.find_or_create_by!(room: room, user: user)
    end

    base_time = 2.weeks.ago.beginning_of_week

    # Monday Morning Standup
    monday_messages = [
      [jessica, "Good morning team! 🌅 Hope everyone had a great weekend. Ready for standup?", base_time + 9.hours],
      [james, "Morning Jessica! Great weekend, went hiking in the mountains. Ready to tackle this week!", base_time + 9.hours + 3.minutes],
      [lisa, "Good morning everyone! Productive weekend writing documentation. Excited for the new features we're shipping.", base_time + 9.hours + 5.minutes],
      [ryan, "Hey team! Spent weekend learning React 19. Can't wait to apply new patterns to our codebase.", base_time + 9.hours + 7.minutes],
      [nina, "Morning! Had a coding retreat with local developers. Lots of new backend optimization ideas!", base_time + 9.hours + 10.minutes],
      [carlos, "Good morning team! Reviewed system architecture over the weekend. Ready to discuss scaling improvements.", base_time + 9.hours + 12.minutes],
      [jessica, "Fantastic! Love the energy. Let's start standup. James, want to kick us off?", base_time + 9.hours + 15.minutes],
      [james, "Sure! Last week: Completed user registration testing, found 3 critical bugs. This week: Fix bugs, implement password reset. Blockers: None.", base_time + 9.hours + 17.minutes],
      [lisa, "Last week: Documented API endpoints, user guides updated. This week: Component library docs, onboarding tutorials. Blockers: Need API changes from Nina.", base_time + 9.hours + 20.minutes],
      [nina, "Last week: Database performance optimization, API refactoring started. This week: Complete API changes for Lisa, implement caching layer. Blockers: None.", base_time + 9.hours + 22.minutes],
      [ryan, "Last week: Dashboard redesign, responsive layout fixes. This week: Mobile optimization, dark mode implementation. Blockers: Design assets from external team.", base_time + 9.hours + 25.minutes],
      [carlos, "Last week: Infrastructure monitoring setup, cost analysis. This week: Auto-scaling configuration, backup strategy. Blockers: Budget approval pending.", base_time + 9.hours + 27.minutes],
      [jessica, "Excellent! Lisa, I'll prioritize Nina's API changes today. Carlos, budget meeting is Wednesday. Ryan, I'll follow up on design assets.", base_time + 9.hours + 30.minutes],
      [james, "Jessica, do you want me to help Ryan with mobile testing once I finish the password reset?", base_time + 9.hours + 32.minutes],
      [ryan, "That would be awesome James! Cross-browser testing is always better with multiple eyes.", base_time + 9.hours + 35.minutes],
      [nina, "Lisa, I'll have those API changes ready by tomorrow morning. Want to pair program the integration?", base_time + 9.hours + 37.minutes],
      [lisa, "Perfect Nina! 10 AM tomorrow work for you? I'll prepare the documentation templates.", base_time + 9.hours + 40.minutes],
      [carlos, "Quick infrastructure note: I'm upgrading the staging environment tonight. Expect 30 minutes downtime around 10 PM EST.", base_time + 9.hours + 42.minutes],
      [james, "Thanks for the heads up Carlos! I'll plan my testing accordingly.", base_time + 9.hours + 45.minutes],
      [jessica, "Great coordination team! Remember, client demo is Friday. Let's stay focused on deliverables.", base_time + 9.hours + 47.minutes],
      [ryan, "Noted! I'll prioritize the dashboard features they specifically requested.", base_time + 9.hours + 50.minutes],
      [lisa, "I'll have user flow documentation ready for the demo presentation.", base_time + 9.hours + 52.minutes],
      [nina, "Backend will be rock solid by Friday. Performance optimizations are already showing great results!", base_time + 9.hours + 55.minutes],
      [carlos, "Monitoring dashboards will be ready too. Real-time metrics during the demo always impress clients.", base_time + 9.hours + 57.minutes],
      [jessica, "Perfect! Let's make this week count. Catch up calls at 3 PM for anyone who needs them.", base_time + 10.hours],
      [james, "Sounds good! I might take you up on that for the password reset flow review.", base_time + 10.hours + 2.minutes],
      [jessica, "Absolutely! My calendar is open. Have a productive day everyone! 🚀", base_time + 10.hours + 5.minutes]
    ]

    # Tuesday Progress Updates
    tuesday = base_time + 1.day + 9.hours
    tuesday_messages = [
      [nina, "Morning team! API changes for Lisa are deployed to staging 🎉", tuesday],
      [lisa, "Amazing Nina! Testing the integration now. Documentation is flowing smoothly.", tuesday + 5.minutes],
      [james, "Password reset functionality is 80% complete. UI integration this afternoon.", tuesday + 10.minutes],
      [ryan, "Mobile dashboard looking great! iPhone and Android testing both positive.", tuesday + 15.minutes],
      [carlos, "Infrastructure upgrade successful! 40% improvement in response times 📈", tuesday + 20.minutes],
      [jessica, "Fantastic progress everyone! Carlos, those performance gains are incredible.", tuesday + 25.minutes],
      [nina, "Lisa, the API docs integration is brilliant! Makes development so much easier.", tuesday + 30.minutes],
      [lisa, "Thanks Nina! Interactive examples really help developers understand the endpoints.", tuesday + 32.minutes],
      [james, "Quick question: should password reset emails have custom branding?", tuesday + 35.minutes],
      [jessica, "Yes! Use our email template with logo and brand colors. I'll share the template.", tuesday + 37.minutes],
      [ryan, "James, I have email templates in the design system. Want me to share the code?", tuesday + 40.minutes],
      [james, "That would be perfect Ryan! Consistent branding across all touchpoints.", tuesday + 42.minutes],
      [carlos, "Security note: password reset tokens should expire in 15 minutes, not 24 hours.", tuesday + 45.minutes],
      [james, "Good catch Carlos! I'll adjust the expiration time. Security first!", tuesday + 47.minutes],
      [nina, "Also, rate limiting on password reset requests to prevent abuse.", tuesday + 50.minutes],
      [james, "Already implemented! Max 3 requests per hour per email address.", tuesday + 52.minutes],
      [lisa, "Love the security-first approach. I'll document these constraints for users.", tuesday + 55.minutes],
      [jessica, "This collaboration is beautiful to watch! Keep up the momentum.", tuesday + 57.minutes],
      [ryan, "Dark mode implementation starting this afternoon. Any color preference requests?", tuesday + 1.hour],
      [nina, "Make sure form inputs have good contrast ratios. Accessibility is crucial.", tuesday + 1.hour + 2.minutes],
      [lisa, "Ryan, I'll test with screen readers to ensure compatibility.", tuesday + 1.hour + 5.minutes],
      [carlos, "Performance tip: lazy load dark mode CSS to reduce initial bundle size.", tuesday + 1.hour + 7.minutes],
      [ryan, "Great suggestion Carlos! I'll implement CSS-in-JS with dynamic loading.", tuesday + 1.hour + 10.minutes],
      [jessica, "Budget meeting went well! Carlos, your infrastructure proposal is approved.", tuesday + 1.hour + 15.minutes],
      [carlos, "Excellent! Auto-scaling will be live by Thursday. No more server overloads! 🎯", tuesday + 1.hour + 17.minutes],
      [james, "Carlos, will auto-scaling affect our database connections?", tuesday + 1.hour + 20.minutes],
      [carlos, "Good question! Connection pooling will handle it gracefully. No impact on app logic.", tuesday + 1.hour + 22.minutes],
      [nina, "Carlos, I'll optimize database queries this week to complement the auto-scaling.", tuesday + 1.hour + 25.minutes],
      [carlos, "Perfect synergy Nina! Infrastructure + code optimization = happy users.", tuesday + 1.hour + 27.minutes],
      [lisa, "I'll document the new performance characteristics for our support team.", tuesday + 1.hour + 30.minutes],
      [jessica, "This team coordination is exceptional! Client demo prep meeting tomorrow at 2 PM.", tuesday + 1.hour + 32.minutes],
      [ryan, "I'll have dark mode ready for the demo. Clients love seeing theme options!", tuesday + 1.hour + 35.minutes],
      [james, "Password reset will be fully functional. Great feature to demonstrate security.", tuesday + 1.hour + 37.minutes],
      [nina, "API performance metrics will show impressive improvements!", tuesday + 1.hour + 40.minutes],
      [lisa, "Documentation site will showcase our professional development process.", tuesday + 1.hour + 42.minutes],
      [carlos, "Real-time monitoring dashboards always wow clients. They'll see system health live!", tuesday + 1.hour + 45.minutes],
      [jessica, "Perfect! This demo will showcase not just features, but our engineering excellence.", tuesday + 1.hour + 47.minutes]
    ]

    # Wednesday Demo Prep
    wednesday = base_time + 2.days + 9.hours
    wednesday_messages = [
      [jessica, "Demo prep day! Meeting at 2 PM to rehearse. How's everyone progressing? 🎬", wednesday],
      [ryan, "Dark mode implementation complete! Toggle works smoothly, all components updated.", wednesday + 5.minutes],
      [james, "Password reset fully tested! Email templates look professional, security is tight.", wednesday + 10.minutes],
      [nina, "API optimizations deployed! Average response time down from 450ms to 180ms.", wednesday + 15.minutes],
      [carlos, "Auto-scaling live on staging! Simulated traffic spike - flawless scaling.", wednesday + 20.minutes],
      [lisa, "Documentation site refreshed! Interactive examples and clear tutorials ready.", wednesday + 25.minutes],
      [jessica, "Incredible! Each feature is demo-ready. Let's plan our presentation flow.", wednesday + 30.minutes],
      [ryan, "I suggest starting with UI improvements - dark mode, mobile responsiveness.", wednesday + 32.minutes],
      [james, "Then security features - password reset, rate limiting, token expiration.", wednesday + 35.minutes],
      [nina, "Performance gains next - API speed, database optimization, caching.", wednesday + 37.minutes],
      [carlos, "Infrastructure scaling - show real-time monitoring, auto-scaling in action.", wednesday + 40.minutes],
      [lisa, "End with developer experience - documentation, API explorer, guides.", wednesday + 42.minutes],
      [jessica, "Perfect narrative! User experience → Security → Performance → Scalability → Developer tools.", wednesday + 45.minutes],
      [ryan, "Should I prepare the dark mode toggle demo? Instant visual impact!", wednesday + 47.minutes],
      [jessica, "Absolutely! Visual features always grab attention first.", wednesday + 50.minutes],
      [james, "I'll demo password reset flow - show email delivery and security measures.", wednesday + 52.minutes],
      [nina, "I'll pull up API performance graphs. Before/after comparisons are compelling.", wednesday + 55.minutes],
      [carlos, "I'll simulate a traffic spike during the demo. Show auto-scaling in real-time!", wednesday + 57.minutes],
      [lisa, "I'll navigate the documentation site - show how easy development becomes.", wednesday + 1.hour],
      [jessica, "Excellent! Each team member owns their domain. Confident, expert presentations.", wednesday + 1.hour + 2.minutes],
      [ryan, "Question: should we mention the React 19 migration plans?", wednesday + 1.hour + 5.minutes],
      [jessica, "Good thinking! Shows we're forward-looking and modern in our approach.", wednesday + 1.hour + 7.minutes],
      [nina, "I can mention the database architecture improvements we're planning too.", wednesday + 1.hour + 10.minutes],
      [carlos, "And the multi-region deployment strategy for global performance.", wednesday + 1.hour + 12.minutes],
      [lisa, "Plus the API versioning strategy for backward compatibility.", wednesday + 1.hour + 15.minutes],
      [james, "This roadmap discussion will show our long-term thinking!", wednesday + 1.hour + 17.minutes],
      [jessica, "Perfect! Current achievements + future vision = compelling story.", wednesday + 1.hour + 20.minutes],
      [ryan, "Should we prepare backup slides in case of connectivity issues?", wednesday + 1.hour + 22.minutes],
      [carlos, "Good practice! I'll record screen captures of all demo flows.", wednesday + 1.hour + 25.minutes],
      [lisa, "I'll prepare written summaries of key technical points too.", wednesday + 1.hour + 27.minutes],
      [nina, "Screenshots of performance metrics as backup evidence.", wednesday + 1.hour + 30.minutes],
      [james, "And I'll document the security improvements in a one-pager.", wednesday + 1.hour + 32.minutes],
      [jessica, "Thorough preparation! This team never disappoints. See you at 2 PM!", wednesday + 1.hour + 35.minutes]
    ]

    # Demo Prep Meeting
    demo_prep = wednesday + 5.hours
    demo_prep_messages = [
      [jessica, "Demo prep meeting time! Let's rehearse our presentation 🎯", demo_prep],
      [ryan, "Starting with dark mode demo... *shares screen* See the smooth transition?", demo_prep + 2.minutes],
      [james, "Beautiful! The animation is so polished. Users will love this feature.", demo_prep + 4.minutes],
      [nina, "Ryan, the color scheme is perfect. Excellent contrast ratios.", demo_prep + 6.minutes],
      [lisa, "From a documentation perspective, this feature is intuitive. No training needed!", demo_prep + 8.minutes],
      [carlos, "Performance impact is minimal too. Great implementation Ryan!", demo_prep + 10.minutes],
      [jessica, "Excellent start! James, show us the password reset flow.", demo_prep + 12.minutes],
      [james, "Here we go... *triggers password reset* Email sent instantly, professional branding...", demo_prep + 15.minutes],
      [ryan, "The email template looks fantastic! Consistent with our brand identity.", demo_prep + 17.minutes],
      [carlos, "Security measures are impressive. Rate limiting, token expiration, audit logging.", demo_prep + 20.minutes],
      [nina, "James, the database queries for user lookup are optimized too. No performance impact.", demo_prep + 22.minutes],
      [lisa, "User experience is seamless. Clear instructions, helpful error messages.", demo_prep + 25.minutes],
      [jessica, "Security + UX balance is perfect! Nina, show us the performance improvements.", demo_prep + 27.minutes],
      [nina, "*pulls up performance dashboard* API response times: 450ms → 180ms. 60% improvement!", demo_prep + 30.minutes],
      [carlos, "Incredible! Database optimization really paid off.", demo_prep + 32.minutes],
      [james, "That's going to improve user satisfaction significantly!", demo_prep + 35.minutes],
      [ryan, "Faster API means smoother UI interactions. Great work Nina!", demo_prep + 37.minutes],
      [lisa, "I'll highlight this in the technical documentation. Developers will appreciate the speed.", demo_prep + 40.minutes],
      [jessica, "Outstanding! Carlos, demonstrate the auto-scaling magic.", demo_prep + 42.minutes],
      [carlos, "*simulates traffic spike* Watch the server count... 2 instances → 8 instances automatically!", demo_prep + 45.minutes],
      [nina, "Seamless scaling! No downtime, no performance degradation.", demo_prep + 47.minutes],
      [james, "That's incredible Carlos! Our app can handle viral traffic now.", demo_prep + 50.minutes],
      [ryan, "The monitoring dashboard is so clear. Real-time insights into system health.", demo_prep + 52.minutes],
      [lisa, "Clients will be impressed by this level of operational excellence.", demo_prep + 55.minutes],
      [jessica, "Fantastic! Lisa, showcase the developer experience improvements.", demo_prep + 57.minutes],
      [lisa, "*navigates documentation site* Interactive API explorer, code examples, clear guides...", demo_prep + 1.hour],
      [nina, "The API examples are so helpful! Copy-paste ready code snippets.", demo_prep + 1.hour + 2.minutes],
      [james, "The search functionality works perfectly. Easy to find specific endpoints.", demo_prep + 1.hour + 5.minutes],
      [ryan, "Visual design is clean and professional. Great work Lisa!", demo_prep + 1.hour + 7.minutes],
      [carlos, "This will significantly reduce developer onboarding time.", demo_prep + 1.hour + 10.minutes],
      [jessica, "Perfect! We're ready for tomorrow. This demo will be memorable! 🚀", demo_prep + 1.hour + 12.minutes],
      [ryan, "I'm excited to show our work! This sprint delivered incredible value.", demo_prep + 1.hour + 15.minutes],
      [nina, "Proud of this team! We've raised the bar on engineering excellence.", demo_prep + 1.hour + 17.minutes],
      [james, "Tomorrow's going to be great! Our hard work really shows.", demo_prep + 1.hour + 20.minutes],
      [carlos, "Can't wait to see client reactions! They'll be blown away.", demo_prep + 1.hour + 22.minutes],
      [lisa, "This presentation showcases our technical depth and user focus perfectly.", demo_prep + 1.hour + 25.minutes],
      [jessica, "Excellent rehearsal team! Get good rest tonight. Tomorrow we shine! ✨", demo_prep + 1.hour + 27.minutes]
    ]

    # Demo Day
    demo_day = wednesday + 1.day + 10.hours
    demo_day_messages = [
      [jessica, "Demo day is here! Clients arrive in 1 hour. Final system check? 🎯", demo_day],
      [carlos, "All systems green! Performance optimal, monitoring active.", demo_day + 2.minutes],
      [nina, "Database connections healthy, API response times excellent.", demo_day + 4.minutes],
      [ryan, "Frontend assets deployed, all features tested and working.", demo_day + 6.minutes],
      [james, "Password reset functionality verified, emails sending perfectly.", demo_day + 8.minutes],
      [lisa, "Documentation site live, all links working, examples tested.", demo_day + 10.minutes],
      [jessica, "Perfect! Team confidence level?", demo_day + 12.minutes],
      [ryan, "💯 Ready to showcase our amazing work!", demo_day + 14.minutes],
      [nina, "Excited to demonstrate the performance improvements!", demo_day + 16.minutes],
      [carlos, "Can't wait to show the auto-scaling in action!", demo_day + 18.minutes],
      [james, "Security features are rock solid. Ready to impress!", demo_day + 20.minutes],
      [lisa, "Documentation will show our professional development process!", demo_day + 22.minutes],
      [jessica, "Outstanding! Remember: confident, clear, enthusiastic. Let's do this! 🚀", demo_day + 25.minutes]
    ]

    # Post-Demo Celebration
    post_demo = demo_day + 4.hours
    post_demo_messages = [
      [jessica, "WOW! That was incredible! Clients were absolutely amazed! 🎉", post_demo],
      [ryan, "Did you see their reaction to the dark mode toggle? 'This is exactly what we wanted!'", post_demo + 2.minutes],
      [james, "The security discussion was fantastic! They really appreciated our thorough approach.", post_demo + 4.minutes],
      [nina, "Performance improvements got huge applause! '60% faster is game-changing!'", post_demo + 6.minutes],
      [carlos, "Auto-scaling demo was the showstopper! 'We've never seen anything like this!'", post_demo + 8.minutes],
      [lisa, "They loved the documentation! 'This makes integration so much easier!'", post_demo + 10.minutes],
      [jessica, "Three new projects approved! They want us to lead their entire digital transformation!", post_demo + 12.minutes],
      [ryan, "That's incredible! Our work really demonstrated our capabilities.", post_demo + 14.minutes],
      [nina, "Best client feedback I've ever received! 'This team is exceptional!'", post_demo + 16.minutes],
      [james, "I'm so proud of what we built together! True team effort.", post_demo + 18.minutes],
      [carlos, "This success belongs to everyone! Collaboration made the magic happen.", post_demo + 20.minutes],
      [lisa, "From idea to demo in one sprint! This team can achieve anything!", post_demo + 22.minutes],
      [jessica, "Celebration dinner tonight! 7 PM at Bruno's Italian. My treat! 🍝", post_demo + 25.minutes],
      [ryan, "Absolutely! This calls for proper celebration!", post_demo + 27.minutes],
      [nina, "Can't wait! We've earned it after this incredible week!", post_demo + 30.minutes],
      [carlos, "See everyone at 7! Bringing champagne for toasts! 🥂", post_demo + 32.minutes],
      [james, "Perfect! Looking forward to celebrating with this amazing team!", post_demo + 35.minutes],
      [lisa, "Best team ever! See you tonight for well-deserved celebration! 🎉", post_demo + 37.minutes],
      [jessica, "This is just the beginning! Next week we plan our next breakthrough! 🚀", post_demo + 40.minutes]
    ]

    # Combine all messages
    all_messages = monday_messages + tuesday_messages + wednesday_messages +
                  demo_prep_messages + demo_day_messages + post_demo_messages

    puts "📝 Creating #{all_messages.length} messages for Remote Team Daily..."
    all_messages.each do |sender, message, timestamp|
      create_chat_message(room, sender, message, timestamp)
    end
  end
end

# 3. Tech Innovation Lab - Research & Development (400+ messages)
unless Room.exists?(name: 'Tech Innovation Lab')
  puts "💬 Creating Tech Innovation Lab conversation..."

  ActiveRecord::Base.transaction do
    kevin = users.find { |u| u.first_name == 'Kevin' }
    sophie = users.find { |u| u.first_name == 'Sophie' }
    maria = users.find { |u| u.first_name == 'Maria' }
    alex = users.find { |u| u.first_name == 'Alex' }
    marcus = users.find { |u| u.first_name == 'Marcus' }
    nina = users.find { |u| u.first_name == 'Nina' }

    room = Room.create!(name: 'Tech Innovation Lab', created_by: kevin)
    team_members = [kevin, sophie, maria, alex, marcus, nina]

    team_members.each do |user|
      RoomUser.find_or_create_by!(room: room, user: user)
    end

    base_time = 4.weeks.ago.beginning_of_week

    # AI Research Discussion
    ai_research_messages = [
      [kevin, "Team! Exciting week ahead. Let's dive deep into AI integration possibilities 🤖", base_time + 9.hours],
      [maria, "Morning Kevin! I've been experimenting with GPT-4 API for code generation. Results are promising!", base_time + 9.hours + 5.minutes],
      [sophie, "Fascinating Maria! From business perspective, AI could transform our development workflow efficiency.", base_time + 9.hours + 10.minutes],
      [alex, "I've been prototyping AI-assisted debugging. It's identifying patterns I missed in code reviews.", base_time + 9.hours + 15.minutes],
      [marcus, "Alex, that's brilliant! What about AI for automated testing? Could generate edge cases we never think of.", base_time + 9.hours + 20.minutes],
      [nina, "Database optimization with AI is fascinating too. Machine learning for query optimization could be game-changing.", base_time + 9.hours + 25.minutes],
      [kevin, "Incredible insights everyone! Let's explore each area systematically. Maria, tell us about code generation experiments.", base_time + 9.hours + 30.minutes],
      [maria, "I'm using GPT-4 to generate React components from design mockups. 80% accuracy so far!", base_time + 9.hours + 32.minutes],
      [alex, "That's impressive! What about TypeScript interfaces? Can it infer types from API documentation?", base_time + 9.hours + 35.minutes],
      [maria, "Yes! Feed it OpenAPI specs, it generates perfect TypeScript types. Saves hours of manual work.", base_time + 9.hours + 37.minutes],
      [sophie, "From cost-benefit analysis: if AI reduces development time by 30%, ROI is substantial.", base_time + 9.hours + 40.minutes],
      [marcus, "Security consideration: how do we ensure AI-generated code doesn't introduce vulnerabilities?", base_time + 9.hours + 42.minutes],
      [maria, "Great question! I'm running all AI code through SonarQube and manual security reviews.", base_time + 9.hours + 45.minutes],
      [nina, "We could train custom models on our secure coding standards. Personalized AI assistants!", base_time + 9.hours + 47.minutes],
      [kevin, "Brilliant Nina! Custom models trained on our codebase would understand our patterns.", base_time + 9.hours + 50.minutes],
      [alex, "Alex here - what about AI for user experience? Analyzing user behavior to suggest interface improvements?", base_time + 9.hours + 52.minutes],
      [sophie, "UX AI is huge! Heatmap analysis, A/B testing optimization, personalized interfaces.", base_time + 9.hours + 55.minutes],
      [maria, "I've seen demos of AI generating multiple UI variations based on user preferences. Fascinating stuff!", base_time + 9.hours + 57.minutes],
      [marcus, "Database perspective: AI could predict performance bottlenecks before they happen.", base_time + 10.hours],
      [nina, "Exactly Marcus! Anomaly detection in query patterns, automatic index suggestions.", base_time + 10.hours + 2.minutes],
      [kevin, "This brainstorming is incredible! Let's prioritize our AI research tracks.", base_time + 10.hours + 5.minutes],
      [maria, "Track 1: Code generation and development automation", base_time + 10.hours + 7.minutes],
      [alex, "Track 2: AI-assisted debugging and testing", base_time + 10.hours + 10.minutes],
      [sophie, "Track 3: User experience optimization and personalization", base_time + 10.hours + 12.minutes],
      [marcus, "Track 4: Performance monitoring and predictive analytics", base_time + 10.hours + 15.minutes],
      [nina, "Track 5: Database optimization and query intelligence", base_time + 10.hours + 17.minutes],
      [kevin, "Perfect categorization! Each track could become a major product feature.", base_time + 10.hours + 20.minutes],
      [maria, "Should we start with proof-of-concepts for each track?", base_time + 10.hours + 22.minutes],
      [alex, "Yes! Small experiments to validate feasibility and impact.", base_time + 10.hours + 25.minutes],
      [sophie, "I'll analyze market opportunity and competitive landscape for each track.", base_time + 10.hours + 27.minutes],
      [marcus, "I'll research existing tools and libraries we can leverage.", base_time + 10.hours + 30.minutes],
      [nina, "I'll investigate data requirements and privacy considerations.", base_time + 10.hours + 32.minutes],
      [kevin, "Excellent division of research! Let's reconvene Wednesday with findings.", base_time + 10.hours + 35.minutes]
    ]

    # Blockchain Innovation Discussion
    blockchain_time = base_time + 2.days + 10.hours
    blockchain_messages = [
      [kevin, "Wednesday deep dive: Blockchain applications in our domain 🔗", blockchain_time],
      [sophie, "I've analyzed 15 blockchain use cases. Most promising: supply chain transparency and digital identity.", blockchain_time + 5.minutes],
      [marcus, "From technical angle: Ethereum smart contracts vs. newer platforms like Solana or Polygon?", blockchain_time + 10.minutes],
      [nina, "Database implications are fascinating! Distributed ledgers vs. traditional databases for specific use cases.", blockchain_time + 15.minutes],
      [alex, "User experience challenge: how do we make blockchain invisible to end users?", blockchain_time + 20.minutes],
      [maria, "Integration patterns: Web3 wallets, blockchain APIs, off-chain storage strategies.", blockchain_time + 25.minutes],
      [kevin, "Excellent research! Sophie, break down the supply chain transparency opportunity.", blockchain_time + 30.minutes],
      [sophie, "Every product transaction recorded immutably. Complete provenance from manufacture to consumer.", blockchain_time + 32.minutes],
      [marcus, "Technical implementation: IPFS for large data, smart contracts for validation logic.", blockchain_time + 35.minutes],
      [nina, "Hybrid approach: critical data on-chain, detailed records in traditional databases.", blockchain_time + 37.minutes],
      [alex, "UI could show trust scores, verification badges, detailed history timelines.", blockchain_time + 40.minutes],
      [maria, "API design: blockchain reads for verification, traditional writes for performance.", blockchain_time + 42.minutes],
      [kevin, "Brilliant architecture thinking! What about digital identity applications?", blockchain_time + 45.minutes],
      [sophie, "Self-sovereign identity: users control their data, selective disclosure, privacy-first.", blockchain_time + 47.minutes],
      [alex, "UX revolution: single sign-on across platforms without centralized authorities.", blockchain_time + 50.minutes],
      [marcus, "Zero-knowledge proofs for age verification without revealing birth dates!", blockchain_time + 52.minutes],
      [nina, "Decentralized databases: CouchDB patterns applied to blockchain storage.", blockchain_time + 55.minutes],
      [maria, "Development tools: Hardhat for smart contracts, Web3.js for frontend integration.", blockchain_time + 57.minutes],
      [kevin, "This could revolutionize user privacy and data ownership!", blockchain_time + 1.hour],
      [sophie, "Market timing is perfect. GDPR compliance, data breaches driving demand for user-controlled identity.", blockchain_time + 1.hour + 2.minutes],
      [marcus, "Technical challenges: gas fees, transaction speed, user key management.", blockchain_time + 1.hour + 5.minutes],
      [alex, "Solutions: Layer 2 scaling, progressive web apps, hardware wallet integration.", blockchain_time + 1.hour + 7.minutes],
      [nina, "Backup strategies: social recovery, multi-signature wallets, encrypted cloud storage.", blockchain_time + 1.hour + 10.minutes],
      [maria, "Developer experience: Web3 frameworks, blockchain testing tools, deployment pipelines.", blockchain_time + 1.hour + 12.minutes],
      [kevin, "Outstanding analysis! Ready for some prototype development?", blockchain_time + 1.hour + 15.minutes],
      [sophie, "Absolutely! Let's build a digital identity proof-of-concept.", blockchain_time + 1.hour + 17.minutes],
      [marcus, "I'll research Polygon for lower gas fees and faster transactions.", blockchain_time + 1.hour + 20.minutes],
      [alex, "I'll design the user onboarding flow. Blockchain complexity hidden behind simple interface.", blockchain_time + 1.hour + 22.minutes],
      [nina, "I'll architect the hybrid data storage: critical identity claims on-chain, metadata off-chain.", blockchain_time + 1.hour + 25.minutes],
      [maria, "I'll set up the development environment: Hardhat, React, Web3 integration.", blockchain_time + 1.hour + 27.minutes],
      [kevin, "Perfect team coordination! This prototype could become our next breakthrough product.", blockchain_time + 1.hour + 30.minutes]
    ]

    # Machine Learning Research
    ml_time = base_time + 1.week + 9.hours
    ml_messages = [
      [kevin, "ML Monday! Let's explore machine learning opportunities in our product ecosystem 🧠", ml_time],
      [maria, "I've been training models on our user behavior data. Prediction accuracy is improving dramatically!", ml_time + 5.minutes],
      [sophie, "Business impact could be huge! Personalized recommendations, churn prediction, pricing optimization.", ml_time + 10.minutes],
      [nina, "Database ML is evolving fast! In-database model training, real-time inference, feature stores.", ml_time + 15.minutes],
      [alex, "UI/UX for ML: how do we explain AI decisions to users? Transparency and trust are crucial.", ml_time + 20.minutes],
      [marcus, "MLOps infrastructure: model versioning, A/B testing, automated retraining pipelines.", ml_time + 25.minutes],
      [kevin, "Comprehensive thinking! Maria, share your user behavior model results.", ml_time + 30.minutes],
      [maria, "Predicting user churn with 87% accuracy! Key features: session frequency, feature usage patterns, support tickets.", ml_time + 32.minutes],
      [sophie, "87%! That's actionable intelligence. Early intervention could save thousands of customers.", ml_time + 35.minutes],
      [alex, "How do we surface these insights to customer success teams?", ml_time + 37.minutes],
      [maria, "Dashboard with risk scores, recommended actions, automated alert triggers.", ml_time + 40.minutes],
      [nina, "Real-time scoring requires fast feature engineering. Redis for feature caching?", ml_time + 42.minutes],
      [marcus, "Yes! Feature store architecture: batch features + real-time features = complete user profile.", ml_time + 45.minutes],
      [kevin, "Excellent architecture! What about recommendation systems?", ml_time + 47.minutes],
      [maria, "Collaborative filtering + content-based + deep learning hybrid approach. Best of all worlds!", ml_time + 50.minutes],
      [alex, "Recommendation UI: subtle suggestions vs. prominent displays. A/B test different approaches?", ml_time + 52.minutes],
      [sophie, "Definitely! Recommendation placement could significantly impact engagement metrics.", ml_time + 55.minutes],
      [nina, "Cold start problem: new users with no history. How do we handle initial recommendations?", ml_time + 57.minutes],
      [maria, "Content-based filtering with demographic data, then transition to collaborative as we gather behavior.", ml_time + 1.hour],
      [marcus, "Privacy considerations: federated learning, differential privacy, local model inference.", ml_time + 1.hour + 2.minutes],
      [alex, "Users want personalization but value privacy. Can we achieve both?", ml_time + 1.hour + 5.minutes],
      [maria, "Absolutely! On-device models for sensitive data, aggregated learning for general patterns.", ml_time + 1.hour + 7.minutes],
      [nina, "Edge computing for ML: reduce latency, improve privacy, decrease bandwidth costs.", ml_time + 1.hour + 10.minutes],
      [sophie, "Cost analysis: cloud ML vs. edge deployment. Initial investment vs. ongoing savings.", ml_time + 1.hour + 12.minutes],
      [marcus, "Hybrid approach: complex models in cloud, simple models on edge. Best performance-cost balance.", ml_time + 1.hour + 15.minutes],
      [kevin, "Brilliant strategic thinking! Ready to prototype our ML recommendation engine?", ml_time + 1.hour + 17.minutes],
      [maria, "Yes! I'll start with user clustering and basic collaborative filtering.", ml_time + 1.hour + 20.minutes],
      [alex, "I'll design the recommendation UI components and user feedback mechanisms.", ml_time + 1.hour + 22.minutes],
      [nina, "I'll architect the feature store and real-time inference pipeline.", ml_time + 1.hour + 25.minutes],
      [marcus, "I'll set up the MLOps infrastructure: model training, deployment, monitoring.", ml_time + 1.hour + 27.minutes],
      [sophie, "I'll define success metrics and plan A/B testing methodology.", ml_time + 1.hour + 30.minutes],
      [kevin, "Perfect execution plan! This ML initiative could transform user engagement.", ml_time + 1.hour + 32.minutes]
    ]

    # Combine all innovation lab messages
    all_innovation_messages = ai_research_messages + blockchain_messages + ml_messages

    puts "📝 Creating #{all_innovation_messages.length} messages for Tech Innovation Lab..."
    all_innovation_messages.each do |sender, message, timestamp|
      create_chat_message(room, sender, message, timestamp)
    end
  end
end

puts "✅ Seeding completed successfully!"
puts "🎉 Created realistic conversations with 300+ messages each"
