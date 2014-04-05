class UsersController < ApplicationController
  def show  
    redirect_to user_posts_url(params[:id])
  end
end
