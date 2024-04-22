class Client < ApplicationRecord
  belongs_to :user
  has_many :client_categories
  has_many :categories, through: :client_categories
  validates :first_name, :last_name, :email, presence: true
  default_scope { order(:last_name)}
end
