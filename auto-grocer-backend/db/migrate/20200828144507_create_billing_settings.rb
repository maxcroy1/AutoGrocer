class CreateBillingSettings < ActiveRecord::Migration[6.0]
  def change
    create_table :billing_settings do |t|
      t.references :user, null: false, foreign_key: true
      t.string :instacart_email
      t.string :instacart_pass
      t.string :card_num
      t.date :expiration
      t.string :cvc
      t.string :street_address
      t.string :city
      t.string :state
      t.string :zipcode

      t.timestamps
    end
  end
end
