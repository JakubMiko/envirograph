# frozen_string_literal: true

class Measurement < ApplicationRecord
    belongs_to :user
    belongs_to :series
end