class UsersController < ApplicationController
  def index
    @posts = Post.all.order(created_at: :desc)
    render 'posts/index'
  end
  def show  
    redirect_to user_posts_url(params[:id])
  end
end
