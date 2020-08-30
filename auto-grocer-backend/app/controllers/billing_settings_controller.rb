class BillingSettingsController < ApplicationController

    def create
        @user = current_user
        if @user.valid?
            @billing_settings = BillingSetting.new(billing_settings_params)
            @billing_settings.user = @user
            @billing_settings.save
            if @billing_settings.valid?
                render json: {message: "Billing settings successfully saved"}, status: :accepted
            else
                render json: {message: "Failed to save settings"}, status: :not_acceptable
            end
        else
            render json: {message: "Failed to save settings"}, status: :not_acceptable
        end
    end

    private
    def billing_settings_params
        params.require(:billing_setting).permit(:instacart_email, :instacart_pass, :card_num, :expiration, :cvc, :street_address, :city, :state, :zipcode)
    end

end
