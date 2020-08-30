class OrderItemSerializer < ActiveModel::Serializer
  attributes :id, :quantity
  has_one :order
  has_one :item
end
