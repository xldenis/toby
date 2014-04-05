class PostsController < ApplicationController
  load_and_authorize_resource
  before_filter :authorize, only: [:new,:create,:update,:edit,:destroy]
  def index
    @user = User.find(params[:user_id])
    @posts = @user.posts
  end

  def show
    @post = Post.find(params[:id])
  end

  def new
    @post = Post.new
  end

  def create
    @post = current_user.posts.new(post_params)
    if @post.save 
      redirect_to user_post_url(current_user,@post)
    end
  end

  def destroy
    @post = Post.find(params[:id])
    if @post.destroy
      flash[:success] = "Post deleted"
    else 
      flash[:error] = "Wooops that post wasn't deleted."
    end
    redirect_to :root
  end
  private
  def post_params
    params.require(:post).permit(:content,:image)
  end
end
