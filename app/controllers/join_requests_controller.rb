# frozen_string_literal: true

class JoinRequestsController < ApplicationController
  before_action :set_join_request

  def approve
    @room = @join_request.room

    # Only room creator can approve requests
    unless @room.created_by == current_user
      render json: { error: 'You are not authorized to approve this request.' }, status: :forbidden
      return
    end

    @join_request.approve!
    render json: { message: 'Join request approved successfully.' }, status: :ok
  end

  def reject
    @room = @join_request.room

    # Only room creator can reject requests
    unless @room.created_by == current_user
      render json: { error: 'You are not authorized to reject this request.' }, status: :forbidden
      return
    end

    @join_request.reject!
    render json: { message: 'Join request rejected.' }, status: :ok
  end

  private

  def set_join_request
    @join_request = JoinRequest.find(params[:id])
  end
end
