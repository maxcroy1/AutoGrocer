class BillingSettingSerializer < ActiveModel::Serializer
  attributes :id, :instacart_email, :card_num, :expiration, :street_address, :city, :state, :zipcode
  has_one :user
end
