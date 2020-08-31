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
            @order_items = @order.order_items.map do |order_item|
                {
                    item: order_item.item.name,
                    quantity: order_item.quantity
                }
            end
            render json: {message: "Order successfully updated", order: @order, items: @order_items}
        else
            render json: {message: 'Failled to add details to order'}, status: :not_acceptable
        end
    end

    private
    def order_params
        params.require(:order).permit(:delivery_address_one, :delivery_address_two, :zipcode, :instructions, :time, :mobile_num)
    end

end
