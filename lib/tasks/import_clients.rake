namespace :clients do
  task :import_clients => :environment do
    require 'data/client_list'
		ClientList.import!
	end
end