# frozen_string_literal: true

module Envirograph
  module V1
    module Entities
      class MeasurementEntity < Grape::Entity
        expose :id, documentation: { type: "Integer", desc: "Measurement ID" }
        expose :series_id, documentation: { type: "Integer", desc: "ID of the series" }
        expose :user_id, documentation: { type: "Integer", desc: "ID of the user that created the measurement" }
        expose :measured_at, documentation: { type: "DateTime", desc: "Measurement date" }
        expose :temperature_c, documentation: { type: "Float", desc: "Water Temperature Index (°C)" }
        expose :bod_mg_L, documentation: { type: "Float", desc: "Biological Oxygen Demand Index (mg/L)" }
        expose :tss_mg_L, documentation: { type: "Float", desc: "Total Suspended Solids Index (mg/L)" }
        expose :do_mg_L, documentation: { type: "Float", desc: "Dissolved Oxygen Index (mg/L)" }
        expose :conductivity_us_cm, documentation: { type: "Float", desc: "Dissolved Oxygen Index (μS/cm)" }
        expose :swqi, documentation: { type: "Float", desc: "Simple Water Quality Index" }
        expose :created_at, documentation: { type: "DateTime", desc: "Date of creation" }
        expose :updated_at, documentation: { type: "DateTime", desc: "Date of last modification" }
      end
    end
  end
end
