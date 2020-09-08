class ItemsController < ApplicationController
    skip_before_action :authorized, only: [:index, :search]

    def index
        @items = Item.all 
        render :json => @items, each_serializer: ItemSerializer 
    end

    def search
        @results = Item.all.filter{|item| item.name.to_s.include? "#{params[:query].gsub(/[^0-9a-z ]/i, '')}"}
        render :json => @results, each_Serializer: ItemSerializer
    end

end
