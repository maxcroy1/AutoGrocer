Rails.application.routes.draw do
  resources :order_items
  resources :orders
  resources :billing_settings, only: [:create]
  resources :users, only: [:create]

  post '/login', to: 'auth#create'
  get '/profile', to: 'users#profile'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
