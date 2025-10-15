# frozen_string_literal: true

class SeriesSerializer < BaseSerializer
    set_type :series

    belongs_to :user, serializer: UserSerializer
    has_many :measurements, serializer: MeasurementSerializer

    attributes :name, :user_id, :min_swqi, :max_swqi, :color
end
