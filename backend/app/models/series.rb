# frozen_string_literal: true

class Series < ApplicationRecord
    has_many :measurements, dependent: :destroy
    belongs_to :user
end
