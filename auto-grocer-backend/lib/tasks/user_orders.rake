namespace :user_orders do
  desc "Schedule successful user orders two days in advance"
  task schedule_orders: :environment do
    
    #TwoCaptcha Configuration
    client = TwoCaptcha.new(Rails.application.credentials.twocaptcha_secret)

    #Capybara Configurations
    Capybara.register_driver :selenium do |app|
        Capybara::Selenium::Driver.new(app, browser: :chrome)
    end
    Capybara.javascript_driver = :chrome
    Capybara.configure do |config|
        config.default_max_wait_time = 10 # seconds
        config.default_driver = :selenium
    end

    #Get orders that are two days out
    today_plus_two = DateTime.now + 2.days
    date_check = today_plus_two.strftime("%A")
    orders = Order.all.filter { |order| order.day === date_check }

    #Fulfill each order - think of ways to do this where we avoid nested loops. Simultaneous orders? Multiple instances?
    orders.each do |order|

      #Initialize Visit
      browser = Capybara.current_session
      driver = browser.driver.browser
      browser.visit "https://www.instacart.com/"

      #Interact with login screen
      browser.first(:button, 'Log in').click
      sleep(2)
      browser.fill_in('nextgen-authenticate.all.log_in_email', with: order.user.billing_setting.instacart_email)
      sleep(2)
      browser.fill_in('nextgen-authenticate.all.log_in_password', with: order.user.billing_setting.instacart_pass)
      sleep(2)
      browser.find_field('Password (min 6 characters)').native.send_keys(:return)
      sleep(3)

      #Find div with id grecaptcha-logo
      #Parse site key from this 'src' in iFrame : src="https://www.google.com/recaptcha/api2/anchor?ar=1&k=6LdTtuEUAAAAAGpMWJ6n7qT6mqWi-u6HjtqmAQ7E&co=aHR0cHM6Ly93d3cuaW5zdGFjYXJ0LmNvbTo0NDM.&hl=en&type=image&v=aUMtGvKgJZfNs4PdY842Qp03&theme=light&size=invisible&badge=bottomright&cb=fcfk9isxio88"
      frameParent = browser.find('.grecaptcha-logo', :visible => false)
      frame = frameParent.find(:xpath, 'descendant::iframe[1]', :visible => false)
      unformatted_captcha_key = frame[:src]

      close_captcha_key = unformatted_captcha_key.split('k=')[1]
      captcha_key = close_captcha_key.split('&')[0]

      # Solve Captcha
      options = {
          googlekey: captcha_key,
          pageurl: browser.current_url
      }

      response = client.decode_recaptcha_v2(options)

      #Apply response to Captcha
      browser.execute_script("document.getElementById('g-recaptcha-response').innerHTML='#{response.text}';")
      browser.execute_script("___grecaptcha_cfg.clients[0].A.A.callback('#{response.text}')")
      sleep(5)

      #Start search & add items to cart
      order.items.each do |item|
        browser.fill_in("Search Wegmans...", {placeholder: true, with: item.name}).native.send_keys(:return)
        sleep(7)
        browser.first(:xpath, ".//text()[contains(., '#{item.name}')]//parent::span//parent::div").click
        sleep(2)
        quantity = item.order_items.filter{|oi| oi.order_id == order.id}[0].quantity
        browser.find(:xpath, ".//select[contains(@id, 'quantity-selector')]").click
        sleep(2)
        browser.find(:xpath, ".//option[contains(@value, '#{quantity}')]").click
        sleep(2)
        #UPDATE QUANTITY
        browser.find_button('Add to cart').click
        sleep(2)
        browser.find(:xpath, ".//button[contains(@aria-label, 'Close modal')]").click
        sleep(2)
      end

      #Start checkout
      browser.find_button('Cart').click
      sleep(2)
      browser.find(:xpath, ".//a[contains(@href, 'checkout_v3')]").click
      sleep(10)
      #Set delivery address
      if browser.has_xpath?(".//button[@aria-label='Change Delivery address']")
          browser.find(:xpath, ".//button[contains(@aria-label, 'Change Delivery address')]").click
          sleep(7)
      end
      browser.find(:xpath, ".//button[contains(@aria-label, 'Edit:')]").click
      sleep(7)
      browser.fill_in("Address line 1", {placeholder: true, with: order.delivery_address_one})
      sleep(2)
      browser.fill_in("Address line 2 (optional)", {placeholder: true, with: order.delivery_address_two})
      sleep(2)
      browser.fill_in("Zip code", {placeholder: true, with: order.zipcode})
      sleep(2)
      browser.fill_in("Instructions for delivery (optional)", {placeholder: true, with: order.instructions})
      sleep(2)
      browser.first(:xpath, ".//text()[contains(., 'Confirm')]//parent::button").click
      sleep(7)

      #Set delivery day and time
      if browser.has_xpath?(".//button[@aria-label='Change Delivery time']")
          browser.find(:xpath, ".//button[contains(@aria-label, 'Change Delivery time')]").click
          sleep(7)
      end
      day_abbr = order.day.slice(0, 3).upcase
      browser.first(:xpath, ".//text()[contains(., '#{day_abbr}')]//parent::span").click
      sleep(5)
      browser.first(:xpath, ".//button[contains(@aria-controls, 'Delivery options')]").click
      sleep(5)
      browser.find(:xpath, ".//text()[contains(.,'#{order.time}')]//parent::div").click
      sleep(5)

      #Set delivery instructions
      if browser.has_xpath?(".//button[@aria-label='Change Delivery Instructions']")
          browser.find(:xpath, ".//button[contains(@aria-label, 'Change Delivery Instructions')]").click
          sleep(7)
      end
      browser.fill_in("Add delivery instructions (optional)", {placeholder: true, with: order.instructions})
      sleep(5)
      browser.click_on('Continue')
      sleep(5)

      #Set mobile number
      if browser.has_xpath?(".//button[@aria-label='Change Mobile number']")
          browser.find(:xpath, ".//button[contains(@aria-label, 'Change Mobile number')]").click
          sleep(7)
      end
      browser.fill_in("Mobile number (10-digit)", {placeholder: true, with: order.mobile_num})
      sleep(5)
      browser.click_on('Save')
      sleep(5)

      #Set payment
      if browser.has_xpath?(".//button[@aria-label='Change Payment']")
          browser.find(:xpath, ".//button[contains(@aria-label, 'Change Payment')]").click
          sleep(7)
      end
      last_four = order.user.billing_setting.card_num.slice(-4, 4)
      if browser.has_xpath?(".//text()[contains(., '#{last_four}')]//parent::div")
          browser.first(:xpath, ".//text()[contains(., 'Choose payment method')]//parent::button").click
          sleep(5)
      else
          browser.first(:xpath, ".//text()[contains(., 'Add new card')]//parent::a").click
          sleep(5)
          browser.fill_in('Card Number', {with: order.user.billing_setting.card_num})
          sleep(5)
          browser.find(:xpath, ".//input[contains(@aria-label, 'Credit or debit card expiration date')]").set("#{order.user.billing_setting.exp_month}/#{order.user.billing_setting.exp_year}")
          sleep(5)
          browser.find(:xpath, ".//input[contains(@aria-label, 'Credit or debit card CVC/CVV')]").set(order.user.billing_setting.cvc)
          sleep(5)
          if !browser.has_xpath?(".//text()[contains(., '#{order.user.billing_setting.street_address}')]//parent::div")
              browser.first(:xpath, ".//text()[contains(., 'Billing address')]//parent::label").click
              sleep(5)
              browser.first(:xpath, ".//text()[contains(., 'Use a new address...')]//parent::div").click
              sleep(5)
              browser.fill_in("Billing Address", {placeholder: true, with: order.user.billing_setting.street_address})
              sleep(5)
              browser.fill_in("Zip code", {placeholder: true, with: order.user.billing_setting.zipcode})
              sleep(5)
          end
          #Find div with id grecaptcha-logo
          #Parse site key from this 'src' in iFrame : src="https://www.google.com/recaptcha/api2/anchor?ar=1&k=6LdTtuEUAAAAAGpMWJ6n7qT6mqWi-u6HjtqmAQ7E&co=aHR0cHM6Ly93d3cuaW5zdGFjYXJ0LmNvbTo0NDM.&hl=en&type=image&v=aUMtGvKgJZfNs4PdY842Qp03&theme=light&size=invisible&badge=bottomright&cb=fcfk9isxio88"
          frameParent = browser.find('.grecaptcha-logo', :visible => false)
          frame = frameParent.find(:xpath, 'descendant::iframe[1]', :visible => false)
          unformatted_captcha_key = frame[:src]

          close_captcha_key = unformatted_captcha_key.split('k=')[1]
          captcha_key = close_captcha_key.split('&')[0]

          # Solve Captcha
          options = {
              googlekey: captcha_key,
              pageurl: browser.current_url
          }

          response = client.decode_recaptcha_v2(options)

          #Apply response to Captcha
          browser.execute_script("document.getElementById('g-recaptcha-response').innerHTML='#{response.text}';")
          browser.execute_script("___grecaptcha_cfg.clients[0].A.A.callback('#{response.text}')")
          sleep(3)
      end

      #HIT PLACE ORDER AND YOU'RE DONE
      sleep(300)

    end

  end

end
