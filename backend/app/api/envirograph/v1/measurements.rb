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

                desc "Create new measurement" do
                    success code: 201,
                            entity: Envirograph::V1::Entities::MeasurementEntity,
                            message: "Creates new measurement - authorized only for admin users"
                end
                params do
                    requires :series_id, type: Integer
                    requires :temperature_c, type: Float
                    requires :bod_mg_L, type: Float
                    requires :tss_mg_L, type: Float
                    requires :do_mg_L, type: Float
                    requires :conductivity_us_cm, type: Float
                    requires :swqi, type: Float
                    requires :measured_at, type: DateTime
                end
                post do
                    authorize!
                    raise ApiException.new("Forbidden", 403) unless current_user.admin?

                    series = ::Series.find_by(id: params[:series_id])
                    raise ApiException.new("Series not found", 404) unless series

                    if params[:swqi] < series.min_swqi || params[:swqi] > series.max_swqi
                        raise ApiException.new("SWQI out of allowed range for this series", 422)
                    end

                    measurement = ::Measurement.new(
                        series_id: params[:series_id],
                        user_id: current_user.id,
                        measured_at: params[:measured_at],
                        temperature_c: params[:temperature_c],
                        bod_mg_L: params[:bod_mg_L],
                        tss_mg_L: params[:tss_mg_L],
                        do_mg_L: params[:do_mg_L],
                        conductivity_us_cm: params[:conductivity_us_cm],
                        swqi: params[:swqi]
                    )

                    if measurement.save
                        status 201
                        MeasurementSerializer.new(measurement).serializable_hash
                    else
                        raise ApiException.new(measurement.errors.full_messages.join(", "), 422)
                    end
                end


            end
        end
    end
end



# To-do Implement the following endpoints
# PUT /api/v1/measurements/:id – edycja pomiaru (admin)
# DELETE /api/v1/measurements/:id – usunięcie pomiaru (admin)
# Opcjonalnie:

# GET /api/v1/users/:user_id/measurements – lista pomiarów danego użytkownika (publicznie lub admin)