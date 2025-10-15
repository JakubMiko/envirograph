# frozen_string_literal: true

class Series < ApplicationRecord
    has_many :measurements
    belongs_to :user
end
