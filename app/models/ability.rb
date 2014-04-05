class Ability
  include CanCan::Ability

  def initialize(user)
    user ||= User.new

    can :read, Post

    if user.persisted?
        can :destroy, Post, user_id: user.id 
        can :create, Post
         
    end
  end
end
