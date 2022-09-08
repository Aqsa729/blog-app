class UserResource < JSONAPI::Resource
    attributes :username, :email
    
    has_many :articles
end
