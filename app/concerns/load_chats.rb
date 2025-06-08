# frozen_string_literal: true

module LoadChats
  extend ActiveSupport::Concern
  include IdExtractor

  def recent_chats_by_room(room_or_room_id)
    extracted_room_id = extract_id(room_or_room_id)
    return Chat.none if extracted_room_id.blank?

    query = Chat.by_room(extracted_room_id)
    query = query.before_id(last_seen_id) if last_seen_id

    query.with_sender
         .recent_first
         .limit(limit_records)
         .reverse
  end

  private

  def limit_records
    return 30 if params[:limit].blank?

    parsed_limit = params[:limit].to_i
    parsed_limit.positive? ? parsed_limit : 30
  end

  def last_seen_id
    return nil if params[:last_seen_id].blank?

    id = params[:last_seen_id].to_i
    id.positive? ? id : nil
  end
end
