# Design

Web-base application for chat

# Name

CHAT

# Primary color

#c62c25

# Styles

- Modern UI
- Modern Typography (sans + serif)
- Responsive design (mobile + desktop devices)

# Views

- User sign-in
- User sign-up
- User profile
- User updating profile modal: to update first_name, last_name, password, avatar
- Recovery password
- List of rooms to join (to chat)
- Create a room modal (just require a room name)
- Chat view with these UIs: chat input + chat history + chat video/audio + images
- Notification widgets
- Friend List
- Setting page to toggle on/off notifications

# Roadmap

- [x] Sign In
- [x] Sign Up
- [x] Reset Password
- [x] User profile
- [x] Basic chat with text messages
- [x] Show users's online status
- [ ] Lazy load chat histories
- [ ] Ensure chats show in order
- [ ] Photo/Video/Audio text messages
- [ ] Use Active Job
- [ ] Chat emojis/ chat reaction
- [ ] Text message with formatting
- [ ] Create group chats
- [ ] Group chat messages by date
- [ ] Reply chat in thread
- [ ] Morden UI

# Tech Stack

- Ruby on Rails
- PostgresQL
- Turbo
- Stimulus
- TailwindCss
