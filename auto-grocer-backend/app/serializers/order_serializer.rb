class OrderSerializer < ActiveModel::Serializer
  attributes :id, :delivery_address_one, :delivery_address_two, :zipcode, :instructions, :time, :mobile_num
  has_one :user
end
