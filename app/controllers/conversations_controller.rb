# frozen_string_literal: true

class ConversationsController < ApplicationController
  def create
    @conversation = Conversations::GroupConversation.new(conversation_params)
    if @conversation.save
      @conversation_participant = @conversation.conversation_participants.create(user: current_user, role: 'admin')
      render json: @conversation.as_json, status: :created
    else
      render json: { message: @conversation.errors.full_messages.to_sentense }, status: :unprocessable_entity
    end
  end

  def update
    @conversation = Conversation.by_creator(current_user.id).find(conversation_params[:id])
    if @conversation.update(conversation_params)
      render json: @conversation.as_json, status: :ok
    else
      render json: { message: @conversation.errors.full_messages.to_sentence }, status: :unprocessable_entity
    end
  end

  def join_or_request
    conversation = Conversation.find(params[:id])
    if conversation.is_public?
      conversation.conversation_participants.create!(user: current_user, role: 'member')
      render json: { message: 'You have joined the conversation successfully.' }, status: :ok
    else
      conversation.ConversationJoinRequest.create!(user: current_user, message: params[:message])
      render json: { message: 'Your request to join the conversation has been sent.' }, status: :ok
    end
  end

  def index
    respond_to do |format|
      format.html do
        render 'conversations/index'
      end
      format.json do
        if params[:type] == 'group'
          @conversations = Conversations::GroupConversation.list(current_user:)
        elsif params[:type] == 'direct'
          @conversations = Conversations::DirectConversation.list(current_user:)
        else
          @conversations = Conversations::Conversation.all
        end

        render json: @conversations.as_json, status: :ok
      end
    end
  end

  private

  def conversation_params
    params.require(:conversation).permit(:id, :name, :is_group, :description, :is_public).merge(created_by_id: current_user.id)
  end
end
