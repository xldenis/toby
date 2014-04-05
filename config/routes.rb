Toby::Application.routes.draw do

  get '/login', to: 'sessions#new'
  get '/logout', to: 'sessions#destroy'
  get '/auth/:provider/callback', to: 'sessions#create'

  resources :users do
    resources :posts
  end

end
