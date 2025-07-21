Rails.application.routes.draw do
  mount Envirograph::API => '/'
  mount GrapeSwaggerRails::Engine => '/api/docs'

  get "up" => "rails/health#show", as: :rails_health_check
end
