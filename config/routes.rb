Rails.application.routes.draw do
  root 'homepage#index'
  get 'about', to: 'homepage#about'
  resources :articles
  
  get 'signup', to: 'users#new'
  get 'login', to: 'sessions#new'
  post 'login', to: 'sessions#create'
  delete 'logout', to: 'sessions#destroy'
  resources :users, except: [:new]

   get 'api', to:'users#api'
end
