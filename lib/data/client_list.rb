class ClientList

  def self.import!
    new.import!
  end

  def import!
    csv.each{|row| update_client row}
  end

  def csv
    file = 'clients'
    path = Rails.root.join('lib', 'data', "#{file}.csv")
    CSV.read(path, headers: true)
  end

  def update_client(row)
    data = row.to_hash
    entity_type = data['Entity type']
    if c = Client.create(
      first_name: data['First name'],
      last_name: data['Last name'],
      company: data['Company'],
      email: data['Email'],
      user_id: User.first.id,
      category_ids: [entity_type.nil? ? nil : convert_to_categories(entity_type.downcase)]
    )
      puts "CREATED CLIENT #{c.last_name}"
    else
      puts "ERROR CREATING #{c.last_name}"
    end
  end

  def convert_to_categories(name)
    name.gsub!("_", '-')
    Category.find_by(name: name).id
  end
end