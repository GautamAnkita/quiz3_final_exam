class Api::V1::AuctionsController < Api::ApplicationController

    before_action :authenticate_user!, except: [:index, :show]
  

    def index
        auctions = Auction.order(created_at: :desc)
        render(
            json: auctions,
            each_serializer: AuctionSerializer
        )
    end

    def show
        render(
          json: auction,
          include: [ :author, { bids: [ :author ]}]
        )
    end


    def create
        auction = Auction.new auction_params
        auction.user = current_user
    
        auction.save!
        render json: { id: auction.id }
    end


    def destroy
        auction.destroy
        render(json: {status: 200}, status: 200)
    end
    
    private
    def auction
        @auction ||= Auction.find params[:id]
    end

    def auction_params
        params.require(:auction).permit(:title, :details, :endson, :reserveprice)
    end
end
