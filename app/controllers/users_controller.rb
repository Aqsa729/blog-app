class UsersController < ApplicationController
    def new
        @user = User.new
    end

    def create
        @user = User.new(user_params)
  
        if @user.save
            flash[:success] = "Welcome to the alpha blog #{@user.username}"
            redirect_to login_path
        else
            render 'new'
        end
    end 

    def edit
        @user = User.find(params[:id])
    end

    def update
        @user = User.find(params[:id])
        if @user.update(user_params)
         flash[:success] = "Your account was updated successfully"
         redirect_to articles_path
        else
         render 'edit'
        end
    end

    def api
        
        respond_to do |format|
            msg = { :status => "ok", :message => session[:user_id], :html => "<b>...</b>" }
            format.json  { render :json => msg }
          end
    end

    private
    def user_params
        params.require(:user).permit(:username, :email, :password)
    end
end