class AddArchivedToClients < ActiveRecord::Migration[7.1]
  def change
    add_column :clients, :archived, :boolean, default: false
  end
end
