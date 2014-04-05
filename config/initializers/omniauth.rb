Rails.application.config.middleware.use OmniAuth::Builder do
  provider :facebook, ENV['TOBY_FB_KEY'], ENV['TOBY_FB_SECRET'], :scope => ''
end