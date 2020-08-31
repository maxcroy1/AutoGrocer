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

    def update
        @order = Order.find(params[:id])
        if @order.valid?
            @order.update(order_params)
            render json: {message: "Order successfully updated", order: @order}, status: :accepted
        else
            render json: {message: 'Failled to add details to order'}, status: :not_acceptable
        end
    end

    private
    def order_params
        params.require(:order).permit(:delivery_address_one, :delivery_address_two, :zipcode, :instructions, :day, :time, :mobile_num)
    end

end
