# frozen_string_literal: true

class Series < ApplicationRecord
    has_many :measurements
end
