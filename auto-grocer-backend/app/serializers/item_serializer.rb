class ItemSerializer < ActiveModel::Serializer
  attributes :name, :img_url, :price, :id
end
