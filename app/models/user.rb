class User < ActiveRecord::Base
    has_many :posts
    def self.find_or_create_by_auth(auth_hash)
    @user = User.where(identifier: auth_hash["uid"], provider: auth_hash["provider"]).first

    if @user.nil?
      @user = User.new
      @user.provider = auth_hash["provider"]
      @user.token = auth_hash.credentials["token"]
      @user.expires_at = auth_hash.credentials["expires_at"]
      @user.identifier = auth_hash["uid"]
      @user.save
    end
    @user
  end
end

