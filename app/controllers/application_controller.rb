class ApplicationController < ActionController::Base
  include DeviseTokenAuth::Concerns::SetUserByToken
  protect_from_forgery

  before_filter :configure_permitted_parameters, if: :devise_controller?
  after_filter :set_csrf_cookie_for_ng

  respond_to :html, :json
  def index
  end

  def set_csrf_cookie_for_ng
    cookies['XSRF-TOKEN'] = form_authenticity_token if protect_against_forgery?
  end
  protected

	def configure_permitted_parameters
	  devise_parameter_sanitizer.for(:sign_up) {
 		|u| u.permit(:username, :email, :first_name, :last_name, :profile_name, :password, :password_confirm) }
	  devise_parameter_sanitizer.for(:account_update) { |u| u.permit(:name, :email, :password, :current_password, :avatar) }
	end

	def verified_request?
	  super || form_authenticity_token == request.headers['X-XSRF-TOKEN']
	end
end
