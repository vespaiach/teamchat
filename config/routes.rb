# frozen_string_literal: true

Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get 'up' => 'rails/health#show', as: :rails_health_check

  get 'signin' => 'signin#new'
  post 'signin' => 'signin#create'

  get 'signup' => 'signup#new'
  post 'signup' => 'signup#create'
  delete 'signout' => 'signin#destroy'

  get 'forgot-password' => 'password_resets#new', as: :forgot_password_new
  get 'check-email' => 'password_resets#instructions_sent', as: :instructions_sent
  post 'forgot-password' => 'password_resets#create', as: :forgot_password_create

  get 'reset-password/:token' => 'password_resets#edit', as: :reset_password_edit
  get 'reset-password-expired' => 'password_resets#expired', as: :reset_password_expired
  post 'reset-password/:token' => 'password_resets#update', as: :reset_password_update

  resource :home, only: [:show], controller: 'home'

  resource :profile, only: %i[show update] do
    member do
      post :avatar
    end
  end

  resources :conversations, only: %i[index create update] do
    member do
      post :join_or_request
    end
  end

  resources :users, only: [:index] do
    member do
      get :avatar
    end
  end

  post 'development/manifest' => 'development#manifest', as: :development_manifest

  # Defines the root path route ("/")
  root 'home#show'
end
