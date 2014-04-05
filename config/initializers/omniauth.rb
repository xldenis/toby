Rails.application.config.middleware.use OmniAuth::Builder do
  provider :facebook, ENV['LYD_FB_KEY'], ENV['LYD_FB_SECRET'], :scope => ''
end