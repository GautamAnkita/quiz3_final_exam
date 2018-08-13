class BidSerializer < ActiveModel::Serializer
  attributes :id, :bidprice, :created_at, :updated_at

    belongs_to(:user, key: :author)
end
