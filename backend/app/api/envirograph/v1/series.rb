# frozen_string_literal: true

module Envirograph
  module V1
    class Series < Base
      resource :series do
        desc "Get list of series" do
          success code: 200,
                  entity: Envirograph::V1::Entities::SeriesEntity,
                  message: "Returns list of series in JSON:API format"
        end
        get do
          series = ::Series.all
          SeriesSerializer.new(series).serializable_hash
        end
      end

      # To-do implement the following endpoints
      # GET /api/v1/series/:id – szczegóły jednej serii (publicznie)
      # POST /api/v1/series – utworzenie nowej serii (admin)
      # PUT /api/v1/series/:id – edycja serii (admin)
      # DELETE /api/v1/series/:id – usunięcie serii (admin)
      # GET /api/v1/series/:id/measurements – pobranie pomiarów dla danej serii (publicznie, filtrowanie po serii)
    end
  end
end
