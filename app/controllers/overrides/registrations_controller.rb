module Overrides
	class RegistrationsController < DeviseTokenAuth::RegistrationsController
		before_filter :set_user_by_token, :only => [:destroy, :update]
    skip_after_filter :update_auth_header, :only => [:create, :destroy]

    respond_to :json
		def create
      super

			user_repos_path = "#{Rails.root}/public/data/repository/#{@resource.id}"
			unless File.exists?(user_repos_path)
				Dir.mkdir(user_repos_path)
		  end
			#create user repository folder
    end

    def update
      super
    end

    def destroy
      super
    end

    def sign_up_params
	    params.permit(devise_parameter_sanitizer.for(:sign_up))
    end

    def account_update_params
			params.permit(devise_parameter_sanitizer.for(:account_update))
    end
	end
end
