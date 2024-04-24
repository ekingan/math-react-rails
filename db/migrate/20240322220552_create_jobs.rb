class CreateJobs < ActiveRecord::Migration[7.1]
  def change
    create_table :jobs do |t|
      t.integer :status
      t.integer :year
      t.boolean :paid
      t.float :price
      t.references :client, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true
      t.references :category, null: false, foreign_key: true

      t.timestamps
    end
  end
end
