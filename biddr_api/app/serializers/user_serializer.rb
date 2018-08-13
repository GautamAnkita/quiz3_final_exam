class UserSerializer < ActiveModel::Serializer
  attributes(
    :id,
    :first_name,
    :last_name,
    :full_name, 
    :password,
    :created_at,
    :updated_at
  )
end
