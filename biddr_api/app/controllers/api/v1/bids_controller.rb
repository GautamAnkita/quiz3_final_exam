class Api::V1::BidsController < Api::ApplicationController
    before_action :authenticate_user!
  
    def destroy
      bid = Bid.find params[:id]
      bid.destroy
  
      render json: { status: 200 }, status: 200
    end

    def create
      @auction = Auction.find params[:auction_id]
      bid = Bid.new bid_params
      bid.user = current_user
      bid.auction = @auction
      bid.save!
      render json: {id: bid.id}
    end

    private
    def bid_params
      params.require(:bid).permit(:bidprice)
    end
end
