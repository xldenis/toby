class PostsController < ApplicationController
  load_and_authorize_resource
  before_filter :authorize, only: [:new,:create,:update,:edit,:destroy]
  def index
    @user = User.find(params[:user_id])
    @posts = @user.posts.order(created_at: :desc)
    respond_to do |format|
      format.html 
      format.json {render json: {user: @post,posts: @posts}}
    end    
  end

  def show
    @post = Post.find(params[:id])
    respond_to do |format|
      format.html 
      format.json {render json: @post}
    end    
  end

  def new
    @post = Post.new
    respond_to do |format|
      format.html 
      format.json {render json: @post}
    end
  end

  def create
    @post = current_user.posts.new(post_params)
    if @post.save 
      respond_to do |format| 
        format.html {redirect_to user_post_url(current_user,@post)}
        format.json {
          render json: user_post_url(current_user,@post)
        }
      end
    end
  end

  def destroy
    @post = Post.find(params[:id])
    if @post.destroy
      flash[:success] = "Post deleted"
    else 
      flash[:error] = "Wooops that post wasn't deleted."
    end
        respond_to do |format|
      format.html {redirect_to :root}
      format.json {render status: 200}
    end    
    
  end
  private
  def post_params
    params.require(:post).permit(:content,:image)
  end
end
