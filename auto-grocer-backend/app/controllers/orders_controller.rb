class OrdersController < ApplicationController

    def create
        @user = current_user
        if @user.valid?
            @order = Order.new()
            @order.user = @user
            @order.save
            if @order.valid?
                render json: {message: 'Order successfully initialized', orderID: @order.id}, status: :accepted
            else
                render json: {message: 'Failled to initialize order'}, status: :not_acceptable
            end
        else
            render json: {message: 'Failled to initialize order'}, status: :not_acceptable
        end
    end

    private
    def order_params
        params.require(:order).permit(:delivery_address_one, :delivery_address_two, :zipcode, :instructions, :time, :mobile_num)
    end

end
