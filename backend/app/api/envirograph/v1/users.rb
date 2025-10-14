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

        desc "Register user" do
          success code: 200,
                  model: UserSerializer,
                  message: "Returns JWT token and user data after registration"
        end
        params do
          requires :first_name, type: String
          requires :last_name, type: String
          requires :email, type: String, desc: "User email"
          requires :password, type: String, desc: "User password"
          requires :password_confirmation, type: String, desc: "Password confirmation"
        end
        post :register do
          user = User.new(
            first_name: params[:first_name],
            last_name: params[:last_name],
            email: params[:email],
            password: params[:password],
            password_confirmation: params[:password_confirmation]
          )
          if user.save
            token = JWT.encode({ user_id: user.id }, Rails.application.credentials.secret_key_base)
            status 201
            {
              token: token,
              user: UserSerializer.new(user).serializable_hash[:data]
            }
          else
            raise Envirograph::V1::Base::ApiException.new(user.errors.full_messages.join(", "), 422)
          end
        end

        desc "Change password for logged-in user" do
          success code: 200,
                  message: "Password changed"
        end
        params do
          requires :current_password, type: String, desc: "Current password"
          requires :password, type: String, desc: "New password"
          requires :password_confirmation, type: String, desc: "New password confirmation"
        end
        put :change_password do
          token = headers["Authorization"]&.split(' ')&.last
          payload = JWT.decode(token, Rails.application.credentials.secret_key_base)[0] rescue nil
          user = payload ? User.find_by(id: payload["user_id"]) : nil

          unless user
            raise Envirograph::V1::Base::ApiException.new("Unauthorized", 401)
          end

          unless user.valid_password?(params[:current_password])
            raise Envirograph::V1::Base::ApiException.new("Current password is incorrect", 422)
          end

          if params[:password] != params[:password_confirmation]
            raise Envirograph::V1::Base::ApiException.new("Password confirmation does not match", 422)
          end

          if user.update(password: params[:password], password_confirmation: params[:password_confirmation])
            { message: "Password changed successfully" }
          else
            raise Envirograph::V1::Base::ApiException.new(user.errors.full_messages.join(", "), 422)
          end
        end
      end
    end
  end
end
