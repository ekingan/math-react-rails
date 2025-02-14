class Job < ApplicationRecord
  enum :status, [:todo, :in_progress, :need_info, :need_signatures, :ready, :filed, :accepted, :rejected, :done, :extended]
  belongs_to :client
  belongs_to :user
  has_one :category
  default_scope { order('updated_at DESC') }
end
