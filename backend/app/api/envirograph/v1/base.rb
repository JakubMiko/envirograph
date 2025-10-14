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

      version 'v1', using: :path

      get :ping do
        { ping: 'pong', time: Time.now }
      end

      add_swagger_documentation(
        api_version: 'v1',
        hide_documentation_path: true,
        mount_path: '/swagger_doc',
        hide_format: true,
        info: {
          title: 'EnviroGraph API',
          description: 'API do aplikacji monitorowania jakości wody'
        }
      )

      mount Envirograph::V1::Users
    end
  end
end