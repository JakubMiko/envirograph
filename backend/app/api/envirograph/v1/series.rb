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

        desc "Get details of a single series" do
          success code: 200,
                  entity: Envirograph::V1::Entities::SeriesEntity,
                  message: "Returns details of a single series"
        end
        params do
          requires :id, type: Integer
        end
        get ':id' do
          series = ::Series.find_by(id: params[:id])
          raise ApiException.new("Series not found", 404) unless series
          SeriesSerializer.new(series).serializable_hash
        end

        desc "Create new series" do
          success code: 201,
                  entity: Envirograph::V1::Entities::SeriesEntity,
                  message: "Creates new series - authorized only for admin users"
        end
        params do
          requires :name, type: String
          requires :min_swqi, type: Float
          requires :max_swqi, type: Float
          requires :color, type: String
        end
        post do
          authorize!
          raise ApiException.new("Forbidden", 403) unless current_user.admin?

          series = ::Series.new(
            name: params[:name],
            min_swqi: params[:min_swqi],
            max_swqi: params[:max_swqi],
            color: params[:color],
            user_id: current_user.id
          )

          if series.save
            status 201
            SeriesSerializer.new(series).serializable_hash
          else
            raise ApiException.new(series.errors.full_messages.join(", "), 422)
          end
        end

        desc "Update series" do
          success code: 200,
                  entity: Envirograph::V1::Entities::SeriesEntity,
                  message: "Updates series - authorized only for admin users"
        end
        params do
          requires :id, type: Integer, desc: "ID of the series"
          optional :name, type: String
          optional :min_swqi, type: Float
          optional :max_swqi, type: Float
          optional :color, type: String
        end
        put ':id' do
          authorize!
          raise ApiException.new("Forbidden", 403) unless current_user.admin?

          series = ::Series.find_by(id: params[:id])
          raise ApiException.new("Series not found", 404) unless series

          update_params = declared(params, include_missing: false).except(:id)
          if series.update(update_params)
            SeriesSerializer.new(series).serializable_hash
          else
            raise ApiException.new(series.errors.full_messages.join(", "), 422)
          end
        end

        desc "Delete series" do
          success code: 204,
                  message: "Deletes series - authorized only for admin users"
        end
        params do
          requires :id, type: Integer, desc: "ID of the series"
        end
        delete ':id' do
          authorize!
          raise ApiException.new("Forbidden", 403) unless current_user.admin?

          series = ::Series.find_by(id: params[:id])
          raise ApiException.new("Series not found", 404) unless series

          if series.destroy
            status 204
            body false
          else
            raise ApiException.new(series.errors.full_messages.join(", "), 422)
          end
        end

        desc "Get measurements for a given series" do
          success code: 200,
                  entity: Envirograph::V1::Entities::MeasurementEntity,
                  message: "Returns all measurements for a given series"
        end
        params do
          requires :id, type: Integer, desc: "ID of the series"
        end
        get ':id/measurements' do
          series = ::Series.find_by(id: params[:id])
          raise ApiException.new("Series not found", 404) unless series

          measurements = series.measurements
          MeasurementSerializer.new(measurements).serializable_hash
        end

        desc "Get series created by a given user" do
          success code: 200,
                  entity: Envirograph::V1::Entities::SeriesEntity,
                  message: "Returns all series created by a given user"
        end
        params do
          requires :user_id, type: Integer, desc: "ID of the user"
        end
        get "/users/:user_id/series" do
          user = ::User.find_by(id: params[:user_id])
          raise ApiException.new("User not found", 404) unless user

          series = user.series
          SeriesSerializer.new(series).serializable_hash
        end
      end
    end
  end
end
