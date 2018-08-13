class Auction < ApplicationRecord
  belongs_to :user

  has_many :bids, dependent: :destroy

  validates(:title, presence: true, uniqueness: true)

  validates(
    :details,
    presence: {
      message: "must be given" 
    },
    length: {
      minimum: 2,
      maximum: 5000
    }
  )
end
