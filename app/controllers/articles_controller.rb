class ArticlesController < JSONAPI::ResourceControllerMetal
  # skip_before_action :verify_authenticity_token
  # before_action :set_article, only: [:edit, :update, :show, :destroy]  
  # helper_method :current_user, :logged_in?

  def new
    @article = Article.new
  end

  def current_user    
    puts "USER ID", article_params[:user_id]
    @current_user ||= User.find(article_params[:user_id])
  end

  def logged_in_hack?
    !!current_user
  end

  # TODO auth...
  def create
    @article = Article.new(article_params)

    if logged_in_hack?
      @article.user = current_user
      @article.save
      render json: @article.to_json
    else
      puts "ERROR: Not created article"
    end
  end

  def show
  end

  def edit
  end

  # TODO auth...
  def update
    if @article.user == current_user and 
      @article.update(article_params) 
      render json: @article.to_json
    else
      puts "ERROR: Not updated article"
    end  
  end

  # TODO auth...
  def destroy
    puts "Article is being deleted"
    puts @article.inspect
    @article.destroy
    flash[:notice] = "Article was deleted"
    redirect_to articles_path
  end

  private
    def article_params
      params.require(:article).permit(:title, :description, :user_id)
    end

    def set_article
      @article = Article.find(params[:id])
    end
end
