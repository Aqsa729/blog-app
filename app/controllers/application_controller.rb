require "application_responder"

class ApplicationController < ActionController::API
    self.responder = ApplicationResponder
    respond_to :html

    helper_method :current_user, :logged_in?


    def current_user
      @current_user ||= User.find(session[:user_id]) if session[:user_id]
    end

    def logged_in?
      !!current_user
    end
    
    def require_user
      if !logged_in?
        redirect_to root_path
      end
    end
end
