class OrderItemsController < ApplicationController

    def create
        @item = Item.find_by(id: order_item_params[:item][:id])
        @order = Order.find_by(id: order_item_params[:order][:id])
        if @item.valid? && @order.valid?
            @order_item = OrderItem.create(order: @order, item: @item, quantity: order_item_params[:item][:quantity])
            if @order_item.valid?
                render json: {message: 'Item added to order', item: { name: @order_item.item.name, quantity: @order_item.quantity, img_url: @item.img_url, price: @item.price, id: @order_item.id }}, status: :accepted
            else
                render json: {message: 'Unable to add item to order'}, status: :not_acceptable
            end
        else
            render json: {message: 'Unable to add item to order'}, status: :not_acceptable
        end
    end

    def update
    end

    def destroy
        OrderItem.destroy(params[:id])
        render json: {message: 'Item successfully removed from order.'}, status: :accepted
    end

    private
    def order_item_params
        params.require(:order_item).permit(item: [:id, :quantity], order: [:id])
    end

end
