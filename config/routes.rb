Rails.application.routes.draw do
  jsonapi_resources :articles
  jsonapi_resources :users
  
  # root 'homepage#index'
  # get 'about', to: 'homepage#about'
  # resources :articles
  
  # get 'signup', to: 'users#new'
  # get 'login', to: 'sessions#new'
  post 'login', to: 'users#login'
  delete 'logout', to: 'users#logout'
  # resources :users, except: [:new]

end
