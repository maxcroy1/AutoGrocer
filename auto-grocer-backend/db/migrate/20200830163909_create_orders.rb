class CreateOrders < ActiveRecord::Migration[6.0]
  def change
    create_table :orders do |t|
      t.references :user, null: false, foreign_key: true
      t.string :delivery_address_one
      t.string :delivery_address_two
      t.string :zipcode
      t.string :instructions
      t.string :time
      t.string :mobile_num

      t.timestamps
    end
  end
end
