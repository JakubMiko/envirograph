# frozen_string_literal: true

module Envirograph
    module V1
        class Measurements < Base
            resource :measurements do
                desc "Get list of measurements" do
                    success code: 200,
                            entity: Envirograph::V1::Entities::MeasurementEntity,
                            message: "Returns list of measurements in JSON:API format"
                end
                get do
                    measurements = ::Measurement.all
                    MeasurementSerializer.new(measurements).serializable_hash
                end

                desc "Get details of a single measurement" do
                    success code: 200,
                            entity: Envirograph::V1::Entities::MeasurementEntity,
                            message: "Returns details of a single series"
                end
                params do
                    requires :id, type: Integer
                end
                get ":id" do
                    measurement = ::Measurement.find(params[:id])
                    raise ApiException.new("Measurement not found", 404) unless measurement
                    MeasurementSerializer.new(measurement).serializable_hash
                end


            end
        end
    end
end



# To-do Implement the following endpoints
# GET /api/v1/measurements/:id – szczegóły jednego pomiaru (publicznie)
# POST /api/v1/measurements – utworzenie nowego pomiaru (admin/sensor)
# PUT /api/v1/measurements/:id – edycja pomiaru (admin)
# DELETE /api/v1/measurements/:id – usunięcie pomiaru (admin)
# Opcjonalnie:

# GET /api/v1/series/:series_id/measurements – lista pomiarów dla konkretnej serii (publicznie)
# GET /api/v1/users/:user_id/measurements – lista pomiarów danego użytkownika (publicznie lub admin)