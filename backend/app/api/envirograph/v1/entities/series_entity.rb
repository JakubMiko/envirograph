# frozen_string_litera: true

module Envirograph
  module V1
    module Entities
      class SeriesEntity < Grape::Entity
        expose :id, documentation: { type: "Integer", desc: "Series ID" }
        expose :name, documentation: { type: "String", desc: "Name of the series" }
        expose :min_swqi, documentation: { type: "Float", desc: "Minimum SWQI value" }
        expose :max_swqi, documentation: { type: "Float", desc: "Maximum SWQI value" }
        expose :color, documentation: { type: "String", desc: "Color of the series" }
        expose :user_id, documentation: { type: "Integer", desc: "ID of the user that created the series" }
        expose :created_at, documentation: { type: "DateTime", desc: "Date of creation" }
        expose :updated_at, documentation: { type: "DateTime", desc: "Date of last modification" }
      end
    end
  end
end
