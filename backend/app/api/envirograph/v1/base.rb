module Envirograph
  module V1
    class Base < Grape::API
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

    end
  end
end