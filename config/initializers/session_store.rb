# frozen_string_literal: true

Rails.application.config.session_store :cookie_store, key: "_chat_chit_session", expire_after: 2.weeks
