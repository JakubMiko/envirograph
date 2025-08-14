module Envirograph
  module V1
    class Users < Grape::API
      format :json

      resource :users do
        desc "Log in user"
        params do
          requires :email, type: String, desc: "User email"
          requires :password, type: String, desc: "User password"
        end
        post :login do
          user = User.find_by(email: params[:email])
          if user&.valid_password?(params[:password])
            { success: true, user_id: user.id, admin: user.admin }
          else
            error!("Invalid email or password", 401)
          end
        end
      end
    end
  end
end
