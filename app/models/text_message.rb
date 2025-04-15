class TextMessage < Chat
  validates :message, presence: true
end
