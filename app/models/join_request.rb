# frozen_string_literal: true

class JoinRequest < ApplicationRecord
  belongs_to :user
  belongs_to :room

  validates :status, inclusion: { in: %w[pending approved rejected] }
  validates :user_id, uniqueness: { scope: :room_id, message: 'has already requested to join this room' }

  scope :pending, -> { where(status: 'pending') }
  scope :approved, -> { where(status: 'approved') }
  scope :rejected, -> { where(status: 'rejected') }
  scope :active, -> { where(deleted_at: nil) }

  def approve!
    update!(status: 'approved')
    # Add user to room when approved
    RoomUser.create!(room: room, user: user) unless room.users.include?(user)
  end

  def reject!
    update!(status: 'rejected')
  end

  def pending?
    status == 'pending'
  end

  def approved?
    status == 'approved'
  end

  def rejected?
    status == 'rejected'
  end
end
