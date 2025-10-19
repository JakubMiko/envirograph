module Envirograph
  class API < Grape::API
    prefix "api"
    format :json

    get '/run_seed' do
      Rails.application.load_seed
      { status: 'Seeds loaded' }
    end

    mount Envirograph::V1::Base
  end
end
