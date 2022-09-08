class UsersController < JSONAPI::ResourceControllerMetal
    # skip_before_action :verify_authenticity_token

    def new
        @user = User.new
    end

    def create
        @user = User.new(user_params)
  
        if @user.save
            render json: @user.to_json
        else
            puts "ERROR: Not created user"
        end
    end 

    def edit
        @user = User.find(params[:id])
        render json: @user.to_json
    end

    def update
        @user = User.find(params[:id])
        if @user.update(user_params)
         render json: @user.to_json
        else
         puts "Error: Failed to update user"
        end
    end

    def login
        user = User.find_by(email: login_params[:email].downcase)
        
        if user && user.authenticate(params[:password])
            session[:user_id] = user.id
            puts "logged in!", user.inspect

            render json: user.to_json
        else
            puts "ERROR: Not logged in"
            
        end
    end
       
    def logout
        session[:user_id] = nil
    end

    private
    def user_params
        params.require(:user).permit(:username, :email, :password)
    end
    
    def login_params
        params.permit(:email, :password)
    end
end
