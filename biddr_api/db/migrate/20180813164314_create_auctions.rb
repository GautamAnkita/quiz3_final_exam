class CreateAuctions < ActiveRecord::Migration[5.2]
  def change
    create_table :auctions do |t|
      t.string :title
      t.text :details
      t.date :endson
      t.float :reserveprice
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
