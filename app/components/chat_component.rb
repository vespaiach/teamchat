# frozen_string_literal: true

class ChatComponent < ViewComponent::Base
  def initialize(chat, new_chat: true)
    @chat = chat
    @new_chat = new_chat
  end

  def div_wrapper_attributes
    attrs = {}
    attrs['data-chat-id'] = @chat.id
    attrs['data-user-id'] = @chat.sender.id
    attrs['data-created-at'] = @chat.created_at.iso8601
    if @new_chat
      attrs['data-chats-target'] = 'newChat'
    end

    attrs
  end
end
