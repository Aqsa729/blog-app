Rails.application.routes.draw do
  root 'homepage#index'
  get 'about', to: 'homepage#about'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  resources :articles
  # Defines the root path route ("/")
   #root "articles#index"
end