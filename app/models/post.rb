class Post < ActiveRecord::Base
  belongs_to :user

  has_attached_file :image,
                    storage: :s3,
                    s3_credentials: Rails.configuration.s3_credentials
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/

  validates_presence_of :content
  validates :image, attachment_presence: true
end
