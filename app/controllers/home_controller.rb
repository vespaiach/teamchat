# frozen_string_literal: true

class HomeController < ApplicationController
  def show
    @conversations = Conversation.eager_load(:conversation_participants).group_chats.order(name: :asc)
    @DMs = Conversation.eager_load(:conversation_participants).direct_chats.order(updated_at: :asc)
    @users = User.order(:first_name)
  end
end
