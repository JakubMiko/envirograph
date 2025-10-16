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

      desc "Get details of a single series" do
        success code: 200,
                entity: Envirograph::V1::Entities::SeriesSerializer,
                message: "Returns details of a single series"
      end
      params do
        requires :id, type: Integer, desc: "ID of the series"
      end
      get ':id' do
        series = Series.find_by(id: params[:id])
        raise ApiException.new("Series not found", 404) unless series
        SeriesSerializer.new(series).serializable_hash
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
