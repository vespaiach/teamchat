# frozen_string_literal: true

Rails.application.config.session_store :cookie_store, key: '_teamchat_session', expire_after: 2.weeks
