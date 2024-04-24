namespace :clients do
  task :import_clients => :environment do
    require 'data/client_list'
		Data::ClientList.import!
	end
end