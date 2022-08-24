class AddDescriptionToArticles < ActiveRecord::Migration[7.0]
  def change
    add_column :articles, :describe, :text
    add_column :articles, :created_at, :datetime
    add_column :articles, :updated_at, :datetime
  end
end
