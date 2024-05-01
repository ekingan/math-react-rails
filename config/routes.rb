Rails.application.routes.draw do
  devise_for :users
  authenticated :user do
    root "pages#index", as: :authenticated_root
  end
  get 'pages', to: 'pages#index'
  root 'pages#index'
  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :jobs, only: %i[index show create update destroy]
      resources :clients, only: %i[index show create update destroy]
      resources :categories, only: %i[index]
      post 'clients/:id/activate', to: 'clients#activate'
    end
  end
  get '*path', to: 'pages#index', via: :all
end
