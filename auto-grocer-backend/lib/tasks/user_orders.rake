namespace :user_orders do
  desc "Schedule successful user orders two days in advance"
  task schedule_orders: :environment do
    ruby "../script/grocery_bot.rb"
  end

end
