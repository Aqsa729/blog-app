class ArticlesController < ApplicationController
  before_action :set_article, only: [:edit, :update, :show, :destroy]  
  helper_method :current_user, :logged_in?

  def new
      @article = Article.new
    end

    def create
      @article = Article.new(article_params)
      if logged_in?
        @article.user = current_user
        @article.save
        redirect_to article_path(@article)
      else
        flash[:notice] = "You must be logged in to create a new article"
        render 'new'
      end

    end

    def show

    end

    def edit

    end

    def update
        if @article.user == current_user and 
          @article.update(article_params) 
         flash[:notice] = "Article was updated"
         redirect_to article_path(@article)
        else
         flash[:notice] = "Article was not updated"
         render 'edit'
        end
        
    end

    def index
        @articles = Article.all
    end

    def destroy
      if @article.user == current_user
      puts "Article is being deleted"
       puts @article.inspect
        @article.destroy
        flash[:notice] = "Article was deleted"
        redirect_to articles_path
      else
        flash[:notice] = "You must be logged in to delete this article"
        render 'edit'
      end
       
    end

    private
      def article_params
        params.require(:article).permit(:title, :description)
      end

      def set_article
        @article = Article.find(params[:id])
     end

    end

