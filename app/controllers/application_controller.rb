class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  before_filter :configure_permitted_parameters, if: :devise_controller?
	after_filter :set_csrf_cookie_for_ng

	respond_to :html, :json
	def index
	end

	def set_csrf_cookie_for_ng
		cookies['XSRF-TOKEN'] = form_authenticity_token if protect_from_forgery?
	end
  protected

		def configure_permitted_parameters
			devise_parameter_sanitizer.for(:sign_up) { |u| u.permit(:username, :email, :first_name, :last_name, :profile_name, :password, :password_confirm) }
		end
		
		def verified_request?
			super || form_authenticity_token == request.headers['X-XSRF-TOKEN']
		end
end
