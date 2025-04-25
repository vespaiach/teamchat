# frozen_string_literal: true

module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user

    def connect
      self.current_user = find_logged_in_user
    end

    private

    def find_logged_in_user
      if (user = find_user)
        user
      else
        reject_unauthorized_connection
      end
    end

    def encrypted_cookies
      cookies.encrypted[:_chat_chit_session]
    end

    def find_user
      User.find_by(id: encrypted_cookies['user_id'])
    end
  end
end
