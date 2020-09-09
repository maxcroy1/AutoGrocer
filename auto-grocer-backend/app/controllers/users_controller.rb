class UsersController < ApplicationController
    skip_before_action :authorized, only: [:create]

    def profile
        if !!current_user && !!current_user.billing_setting && !!current_user.orders
            render json: { user: UserSerializer.new(current_user), billing_settings: BillingSettingSerializer.new(current_user.billing_setting), orders: ActiveModel::Serializer::CollectionSerializer.new(current_user.orders, serializer: OrderSerializer) }, status: :accepted
        elsif !!current_user && !!current_user.billing_setting
            render json: { user: UserSerializer.new(current_user), billing_settings: BillingSettingSerializer.new(current_user.billing_setting) }, status: :accepted
        elsif !!current_user
            render json: { user: UserSerializer.new(current_user) }, status: :accepted
        end
    end

    def create 
        @user = User.create(user_params)
        if @user.valid?
            @token = encode_token(user_id: @user.id)
            render json: { user: UserSerializer.new(@user), jwt: @token }, status: :created
        else 
            render json: { error: 'Failed to create user' }, status: :not_acceptable
        end
    end

    def update
        @user = User.find(params[:id])
        if request.headers["Old-Pass"].present?
            old_pass = request.headers["Old-Pass"]
        end
        if @user.valid?
            if old_pass
                if old_pass == @user.password
                    @user.update(user_params)
                    render json: {user: UserSerializer.new(@user)}, status: :accepted
                else
                    render json: {message: "Current password doesn't match"}, status: :unacceptable
                end
            else
                @user.update(user_params)
                render json: {user: UserSerializer.new(@user)}, status: :accepted
            end
        end
    end

    private 
    def user_params
        params.require(:user).permit(:fname, :lname, :email, :username, :password)
    end

end
