module Envirograph
  module V1
    class Users < Grape::API
      format :json

      resource :users do
        desc "Log in user" do
          success code: 200,
                  model: UserSerializer,
                  message: "Returns JWT token and user data",
                  headers: { Authorization: { description: "JWT token", required: true } }
        end
        params do
          requires :email, type: String, desc: "User email"
          requires :password, type: String, desc: "User password"
        end
        post :login do
          user = User.find_by(email: params[:email])
          unless user&.valid_password?(params[:password])
            raise Envirograph::V1::Base::ApiException.new("Invalid email or password", 401)
          end

          token = JWT.encode({ user_id: user.id }, Rails.application.credentials.secret_key_base)
          {
            token: token,
            user: UserSerializer.new(user).serializable_hash[:data]
          }
        end
      end
    end
  end
end
