# frozen_string_literal: true

Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get 'up' => 'rails/health#show', as: :rails_health_check

  # Render dynamic PWA files from app/views/pwa/* (remember to link manifest in application.html.erb)
  # get "manifest" => "rails/pwa#manifest", as: :pwa_manifest
  # get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker

  get 'signin' => 'signin#new'
  post 'signin' => 'signin#create'

  get 'signup' => 'signup#new'
  post 'signup' => 'signup#create'

  get 'forgot-password' => 'password_resets#new', as: :forgot_password_new
  get 'check-email' => 'password_resets#instructions_sent', as: :instructions_sent
  post 'forgot-password' => 'password_resets#create', as: :forgot_password_create

  get 'reset-password/:token' => 'password_resets#edit', as: :reset_password_edit
  get 'reset-password-expired' => 'password_resets#expired', as: :reset_password_expired
  put 'reset-password/:token' => 'password_resets#update', as: :reset_password_update

  delete 'signout' => 'signin#destroy'

  resource :profile, only: %i[show update]

  resources :rooms do
    member do
      post :join_request
      get :join_requests
    end
    resource :chats
    resource :chat_histories do
      member do
        get :index
      end
    end
  end

  resources :join_requests, only: [] do
    member do
      patch :approve
      patch :reject
    end
  end

  resource :home, only: [:show]
  resources :channels, only: [:show]

  # This route is only available in development mode
  if Rails.env.development?
    resource :hot_reload, only: [:show], controller: 'hot_reload'
  end

  # Defines the root path route ("/")
  root 'homes#show'
end
