class Article < ActiveRecord::Base
    validates :title, presence: true, length: { minimum: 1, maximum: 50 }
    validates :description, presence: true, length: { minimum: 1, maximum: 300 }
    validates :user_id, presence: true


    belongs_to :user

   end