class SessionsController < ApplicationController
  def new
    if logged_in?
      redirect_to :root
    end
  end

  def create
    unless logged_in?
      @user = User.find_or_create_by_auth(auth_hash)
      session[:current_user_id] = @user.id
    end
    redirect_to user_posts_path(current_user)
  end

  def destroy
    @user = nil
    session[:current_user_id] = nil
    redirect_to :root
  end
  private
  def auth_hash
    request.env['omniauth.auth']
  end
end
