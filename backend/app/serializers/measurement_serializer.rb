# frozen_string_literal: true

class MeasurementSerializer < BaseSerializer
    set_type :measurement

    belongs_to :series, serializer: SeriesSerializer
    belongs_to :user, serializer: UserSerializer

    attributes :series_id, :user_id, :measured_at,
             :temperature_c, :bod_mg_L, :tss_mg_L,
             :do_mg_L, :conductivity_us_cm, :swqi
end
