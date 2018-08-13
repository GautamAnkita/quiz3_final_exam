class AuctionSerializer < ActiveModel::Serializer
  attributes(
    :id,
    :title,
    :details,
    :endson,
    :reserveprice,
    :created_at,
    :updated_at
  )

  belongs_to(:user, key: :author)
  has_many(:bids)
end
