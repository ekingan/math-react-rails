class CreateClientCategories < ActiveRecord::Migration[7.1]
  def change
    create_table :client_categories do |t|
      t.references :client, null: false, foreign_key: true
      t.references :category, null: false, foreign_key: true

      t.timestamps
    end
  end
end
