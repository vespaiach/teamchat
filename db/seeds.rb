# frozen_string_literal: true

users = [
  'John Doe',
  'Jane Smith',
  'Alice Johnson',
  'Bob Brown',
  'Charlie Davis',
  'Alena White',
  'David Wilson',
  'Eva Green',
  'Frank Black',
  'Grace Lee',
  'Hannah Adams',
  'Isaac Newton',
  'Julia Roberts',
  'Kevin Hart',
  'Laura Croft',
  'Michael Jordan',
  'Nina Simone',
  'Oscar Wilde',
  'Paul McCartney',
  'Quincy Jones',
  'Rachel Green',
  'Sam Smith',
  'Tina Turner',
  'Victor Hugo',
  'Wendy Williams',
  'Xander Cage',
  'Yara Shahidi',
  'Zoe Saldana',
  'Aaron Paul',
  'Bella Thorne',
  'Cameron Diaz',
  'Diana Prince',
  'Ethan Hunt',
  'Fiona Apple',
  'George Clooney',
  'Hugh Jackman',
  'Isla Fisher',
  'Jack Sparrow',
  'Katherine Johnson',
  'Liam Neeson',
  'Mila Kunis',
  'Nicolas Cage',
  'Olivia Wilde',
  'Peter Parker',
  'Quinn Fabray',
  'Rihanna Fenty',
  'Steve Jobs',
  'Tobey Maguire',
  'Uma Thurman',
  'Vin Diesel'
].map do |name|
  first_name, last_name = name.split(' ')
  User.find_or_create_by(first_name: first_name, last_name: last_name, email: "#{first_name.downcase}.#{last_name.downcase}@example.com")
end

[  'General Chat',
  'Tech Talk',
  'Random Room',
  'Music Lovers',
  'Movie Buffs',
  'Book Club',
  'Travel Enthusiasts',
  'Foodies',
  'Fitness Fanatics',
  'Art and Design',
  'Gaming Zone',
  'Photography',
  'Nature Lovers',
  'History Buffs',
  'Science and Tech',
  'Sports Fans',
  'Fashionistas',
  'Pet Lovers',
  'DIY Projects',
  'Mental Health',
  'Entrepreneurship',
  'Coding and Development',
  'Startup Stories',
  'Life Hacks',
  'Comedy Corner',
  'Poetry and Writing',
  'Language Learners',
  'Spirituality and Wellness',
  'Environment and Sustainability',
  'Cryptocurrency and Finance' ].each do |room_name|
    if !Room.exists?(name: room_name)
      ActiveRecord::Base.transaction do
        created_by = users.sample
        room_users = [ created_by ]
        room = Room.create!(name: room_name, created_by:)
        RoomUser.create!(room: room, user: created_by)
        users.sample((1..5).to_a.sample).each do |user|
          room_users << user
          RoomUser.create!(room: room, user: user)
        end

        # Randomly create some chats
        rand(5..55).times do
          user = room_users.sample
          room.chats.create!(user:, message: Faker::Lorem.paragraph)
        end
      end
    end
end
