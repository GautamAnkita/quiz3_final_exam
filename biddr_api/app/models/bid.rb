class Bid < ApplicationRecord
  belongs_to :auction
  belongs_to :user

  validates :bidprice, presence: true
end
