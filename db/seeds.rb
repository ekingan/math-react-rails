User.create(
    email: "ekingan@mathllc.com",
    password: "turkey7",
    password_confirmation: "turkey7",
  )

['individual', 'partnership', 's-corporation', 'c-corporation', 'estate', 'trust', 'non-profit', 'bookkeeping', 'consulting'].each do |name|
  Category.create(name:)
end
  
Client.create(
  first_name: "Tara",
  last_name: "Miller",
  email: "tmiller@gmail.com",
  user: User.first
)

Job.create(
  status: :todo,
  client: Client.first,
  year: 
  user: User.first,
  category_id: Category.first.id
)