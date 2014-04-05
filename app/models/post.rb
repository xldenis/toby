class Post < ActiveRecord::Base
  belongs_to :user

  has_attached_file :image
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/

  validates_presence_of :image, :content
end
