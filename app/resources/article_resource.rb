class ArticleResource < JSONAPI::Resource
    attributes :title, :description, :user_id
end
