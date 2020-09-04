class OrderSerializer < ActiveModel::Serializer
  attributes :id, :delivery_address_one, :delivery_address_two, :zipcode, :time, :day
  has_one :user
end
