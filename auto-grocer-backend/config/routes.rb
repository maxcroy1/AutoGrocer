Rails.application.routes.draw do
  resources :order_items, only: [:create, :update, :destroy]
  resources :orders, only: [:create, :update]
  resources :billing_settings, only: [:create]
  resources :users, only: [:create]
  resources :items, only: [:index]

  post '/login', to: 'auth#create'
  get '/profile', to: 'users#profile'
  get '/items/search', to: 'items#search'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
