IdeaBin::Application.routes.draw do


  resources :application
  root 'application#index'
  get '/userIdeas/:id' => 'ideas#userIdeas'
	get '/pull_requests/count' => 'pull_requests#count'
	
  resources :directories do
		member do
			get 'topDir'
		end
	end
	
  resources :uploads
  resources :resources do
		member do
			get 'contents'
			get 'download'
		end
	end
	
  resources :ideas do
		member do
			put 'uploadCover'
		end
	end
	
	resources :pull_requests
	resources :repositories
	resources :comments
	resources :repository_comments
	resources :contacts
	resources :resource_comments
  devise_for :users, controllers: {sessions: 'users/sessions', registrations: 'users/registrations'}

   # define :users as the first devise mapping:i
  namespace :api do
	  mount_devise_token_auth_for 'User', at: 'auth' 
  end

  # The priority is based upon order of creation:
  # first created -> highest priority.

  # Sample of regular route:
  #   match 'products/:id' => 'catalog#view'
  # Keep in mind you can assign values other than :controller and :action

  # Sample of named route:
  #   match 'products/:id/purchase' => 'catalog#purchase', :as => :purchase
  # This route can be invoked with purchase_url(:id => product.id)

  # Sample resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Sample resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Sample resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Sample resource route with more complex sub-resources
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', :on => :collection
  #     end
  #   end

  # Sample resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end

  # You can have the root of your site routed with "root"
  # just remember to delete public/index.html.
  # root :to => 'welcome#index'

  # See how all your routes lay out with "rake routes"

  # This is a legacy wild controller route that's not recommended for RESTful applications.
  # Note: This route will make all actions in every controller accessible via GET requests.
  # match ':controller(/:action(/:id))(.:format)'
end
