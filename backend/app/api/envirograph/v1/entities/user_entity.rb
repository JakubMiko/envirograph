module Envirograph
  module V1
    module Entities
      class UserEntity < Grape::Entity
        expose :id, documentation: { type: "Integer", desc: "User ID" }
        expose :email, documentation: { type: "String", desc: "User email" }
        expose :first_name, documentation: { type: "String", desc: "First name" }
        expose :last_name, documentation: { type: "String", desc: "Last name" }
        expose :admin, documentation: { type: "Boolean", desc: "Is admin?" }
      end
    end
  end
end
