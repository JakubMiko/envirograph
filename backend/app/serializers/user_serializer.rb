# frozen_string_literal: true

class UserSerializer < BaseSerializer
    set_type :user

    has_many :series, serializer: SeriesSerializer
    has_many :measurements, serializer: MeasurementSerializer

    attributes :id, :email, :first_name, :last_name, :admin
end
