module Envirograph
  module V1
    class Base < Grape::API
      class ApiException < StandardError
        attr_accessor :message, :status

        def initialize(message = nil, status = nil)
          @message = message
          @status = status
        end
      end

      rescue_from ApiException do |e|
        error!(e.message, e.status)
      end

      format :json
      version "v1", using: :path

      get :ping do
        { ping: "pong", time: Time.now }
      end

      helpers do
        def current_user
          token = headers["Authorization"]&.split(" ")&.last
          payload = JWT.decode(token, Rails.application.credentials.secret_key_base)[0] rescue nil
          payload ? User.find_by(id: payload["user_id"]) : nil
        end

        def authorize!
          raise ApiException.new("Unauthorized", 401) unless current_user
        end
      end

      mount Envirograph::V1::Users
      mount Envirograph::V1::Series
      mount Envirograph::V1::Measurements

      add_swagger_documentation(
        api_version: "v1",
        hide_documentation_path: true,
        mount_path: "/swagger_doc",
        hide_format: true,
        base_path: "/api",
        info: {
          title: "EnviroGraph API",
          description: "API do aplikacji monitorowania jakości wody"
        }
      )
    end
  end
end
