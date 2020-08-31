require 'selenium-webdriver'
require 'nokogiri'
require 'capybara'
require 'two_captcha'

#TwoCaptcha Configuration
client = TwoCaptcha.new(Rails.application.credentials.2captcha_secret)

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
browser.click_button('Log in')
sleep(2)
browser.fill_in('nextgen-authenticate.all.log_in_email', with: ) #insert user email here
sleep(2)
browser.fill_in('nextgen-authenticate.all.log_in_password', with: ) #insert userpass here
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

#Apply and submit response to Captcha
browser.execute_script("document.getElementById('g-recaptcha-response').innerHTML='#{response.text}';")
browser.execute_script("___grecaptcha_cfg.clients[0].V.V.callback('#{response.text}')")

sleep(300)



sleep(10)