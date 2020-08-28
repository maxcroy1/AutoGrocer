class BillingSettingSerializer < ActiveModel::Serializer
  attributes :id, :instacart_email, :instacart_pass, :card_num, :expiration, :cvc, :street_address, :city, :state, :zipcode
  has_one :user
end
