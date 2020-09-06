class BillingSettingSerializer < ActiveModel::Serializer
  attributes :id, :instacart_email, :card_num, :exp_month, :exp_year, :street_address, :city, :state, :zipcode
  has_one :user
end
