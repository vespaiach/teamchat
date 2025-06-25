# frozen_string_literal: true

class ConversationsController < ApplicationController
  def create
    @conversation = Conversation.new(conversation_params)
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

  private

  def conversation_params
    params.require(:conversation).permit(:id, :name, :is_group, :description, :is_public).merge(created_by_id: current_user.id)
  end
end
