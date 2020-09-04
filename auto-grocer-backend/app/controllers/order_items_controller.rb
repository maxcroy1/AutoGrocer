class OrderItemsController < ApplicationController

    def create
        item_search = Item.find_by(name: order_item_params[:item][:name])
        if item_search
            @item = item_search
        else
            @item = Item.create(name: order_item_params[:item][:name])
        end
        @order = Order.find_by(id: order_item_params[:order][:id])
        if @item.valid? && @order.valid?
            @order_item = OrderItem.create(order: @order, item: @item, quantity: order_item_params[:item][:quantity])
            if @order_item.valid?
                render json: {message: 'Item added to order', item: { name: @order_item.item.name, quantity: @order_item.quantity, id: @order_item.id }}, status: :accepted
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
        params.require(:order_item).permit(item: [:name, :quantity], order: [:id])
    end

end
