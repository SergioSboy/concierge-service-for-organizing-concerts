Rails.application.routes.draw do
  get 'tickets/free'

  put 'tickets/status', to: 'tickets#update'

  put 'tickets/block'

  get 'tickets', to: 'tickets#show'

  get 'tickets/price', to: 'tickets#price'

  resources :events, only: [:index, :show]
  
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
