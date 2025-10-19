module Envirograph
  class API < Grape::API
    prefix "api"
    format :json

    mount Envirograph::V1::Base
  end
end
