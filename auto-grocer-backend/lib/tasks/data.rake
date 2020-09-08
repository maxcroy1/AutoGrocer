namespace :data do
  desc "TODO"
  task scrape_site: :environment do

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

    #Initialize Visit
    browser = Capybara.current_session
    driver = browser.driver.browser
    browser.visit "https://www.instacart.com/"

    #Interact with login screen
    browser.first(:button, 'Log in').click
    sleep(2)
    browser.fill_in('nextgen-authenticate.all.log_in_email', with: 'max.croy1@gmail.com')
    sleep(2)
    browser.fill_in('nextgen-authenticate.all.log_in_password', with: ']zAmUTeQFnW3vkrt')
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
    sleep(3)

    #Navigate to department page
    browser.find(:xpath, ".//a[contains(@href, '#Departments')]").click
    sleep(3)

    #Collect array of all departments and remove 'Your Items' result
    departments = browser.all(:css, 'li.rmq-62906a91').count()
    items_array = []
    for i in 1...departments do
      departments_array = browser.all(:css, 'li.rmq-62906a91')
      if departments_array[i].has_text?('Your Items')
        nil 
      else
        departments_array[i].find(:xpath, ".//h3[contains(@class,'rmq-c4a045a4')]//child::a").click
        sleep(3)
        browser.execute_script("window.scrollTo(0, document.body.scrollHeight/2)")
        sleep(5)
        browser.evaluate_script("window.scrollTo(0, document.body.scrollHeight)")
        lenOfPage = browser.evaluate_script("document.body.scrollHeight")
        match = false
        while match == false
          lastCount = lenOfPage
          sleep(5)
          browser.evaluate_script("window.scrollTo(0, document.body.scrollHeight)")
          lenOfPage = browser.evaluate_script("document.body.scrollHeight")
          sleep(5)
          if lastCount == lenOfPage
            match = true
          end
        end
        department_source = browser.body
        doc = Nokogiri::HTML(department_source)
        items = doc.css('.items-list').css('.items-grid').css('.item-card-contents')
        items.each do |item|
          new_item = {}
          new_item["image"] = item.css('.item-image').attribute('src').value
          new_item["name"] = item.css('.full-item-name').text
          new_item["price"] = item.css('.item-price').text
          items_array.push(new_item)
        end
      end
      browser.go_back
    end
    items_array.each do |item|
      new_item = Item.create(name: item["name"], price: item["price"])
      if item.has_key?("image")
        new_item["img_url"] = item["image"]
        new_item.save
      end
    end
  end

end
