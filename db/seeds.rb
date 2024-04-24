User.create(
    email: "ekingan@mathllc.com",
    password: "turkey7",
    password_confirmation: "turkey7",
  )

['individual', 'partnership', 's-corp', 'c-corp', 'estate', 'trust', 'non-profit', 'bookkeeping', 'consulting'].each do |name|
  Category.create(name:)
end
