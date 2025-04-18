module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user

    def connect
      self.current_user = find_logged_in_user
    end

    private

    def find_logged_in_user
      if (user = User.find_by(id: encrypted_cookies["user_id"]))
        user
      else
        reject_unauthorized_connection
      end
    end

    def encrypted_cookies
      cookies.encrypted[:_chat_chit_session]
    end
  end
end
