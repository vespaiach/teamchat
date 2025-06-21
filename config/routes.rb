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
  delete 'signout' => 'signin#destroy'

  resources :signup, only: %i[new create]

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

  resources :password_resets, only: %i[new create edit update], param: :token

  resource :home, only: [:show]
  resources :channels, only: [:show]

  # This route is only available in development mode
  if Rails.env.development?
    resources :development, only: [:create]
  end

  # Defines the root path route ("/")
  root 'hoom#show'
end
