class Job < ApplicationRecord
  enum :status, [:todo, :in_progress, :need_info, :need_signatures, :ready, :filed, :accepted, :done]
  belongs_to :client
  belongs_to :user
  has_one :category
end
