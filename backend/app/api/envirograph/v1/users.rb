module Envirograph
  module V1
    class Users < Base
      resource :users do
        desc "Get current logged-in user data" do
          success code: 200,
                  model: UserSerializer,
                  message: "Returns current logged-in user data"
        end
        get :current do
          authorize!
          user = current_user
          { data: UserSerializer.new(user).serializable_hash[:data] }
        end

        desc "Get user by id" do
          success code: 200,
                  model: UserSerializer,
                  message: "Returns specific user's data based on user ID"
        end
        params do
          requires :id, type: Integer
        end
        get ':id' do
          user = User.find_by(id: params[:id])
          raise ApiException.new("User not found", 404) unless user
          { data: UserSerializer.new(user).serializable_hash[:data] }
        end

        desc "Log in user" do
          success code: 200,
                  model: UserSerializer,
                  message: "Returns JWT token and user data"
        end
        params do
          requires :email, type: String
          requires :password, type: String
        end
        post :login do
          user = User.find_by(email: params[:email])
          unless user&.valid_password?(params[:password])
            raise ApiException.new("Invalid email or password", 401)
          end

          token = JWT.encode({ user_id: user.id }, Rails.application.credentials.secret_key_base)
          {
            token: token,
            data: UserSerializer.new(user).serializable_hash[:data]
          }
        end

        desc "Register user" do
          success code: 201,
                  model: UserSerializer,
                  message: "Returns JWT token and user data after registration"
        end
        params do
          requires :first_name, type: String
          requires :last_name, type: String
          requires :email, type: String
          requires :password, type: String
          requires :password_confirmation, type: String
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
              data: UserSerializer.new(user).serializable_hash[:data]
            }
          else
            raise ApiException.new(user.errors.full_messages.join(", "), 422)
          end
        end

        desc "Change password for logged-in user" do
          success code: 200,
                  message: "Password changed"
        end
        params do
          requires :current_password, type: String
          requires :password, type: String
          requires :password_confirmation, type: String
        end
        put :change_password do
          authorize!
          user = current_user

          unless user.valid_password?(params[:current_password])
            raise ApiException.new("Current password is incorrect", 422)
          end

          if params[:password] != params[:password_confirmation]
            raise ApiException.new("Password confirmation does not match", 422)
          end

          if user.update(password: params[:password], password_confirmation: params[:password_confirmation])
            { message: "Password changed successfully" }
          else
            raise ApiException.new(user.errors.full_messages.join(", "), 422)
          end
        end
      end
    end
  end
end
