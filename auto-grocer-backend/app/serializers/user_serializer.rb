class UserSerializer < ActiveModel::Serializer
  attributes :id, :fname, :lname, :email, :username
end
