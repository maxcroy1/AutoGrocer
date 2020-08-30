class User < ApplicationRecord
    has_one :billing_setting
    has_many :orders
    has_secure_password
    validates :username, uniqueness: {case_sensitive: false}
    validates :email, uniqueness: true
end
