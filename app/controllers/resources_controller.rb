class ResourcesController < ApplicationController
  before_filter :authenticate_user!
	#before_action :set_resource, except: [:new, :create, :index]
	respond_to :html, :json
	
  # GET /resources
  # GET /resources.json
  def index
    @resources = []
		Dir.glob("#{params[:path]}/*").each do |f| 
		unless File.directory?(f)
			@resources.push(File.basename(f))
		end
	end
	
	render json: @resources
  end

  # GET /resources/1
  # GET /resources/1.json
  def show
		send_file(params[:path])
  end

  # GET /resources/new
  # GET /resources/new.json
  def new
    @resource = Resource.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @resource }
    end
  end

  # GET /resources/1/edit
  def edit
    @resource = Resource.find(params[:id])
		respond_with(@resource)
  end

  #Takes directory id and resouce in.
  #
  # POST /resources
  # POST /resources.json
  def create
    data =params[:data]

    resource = ActiveSupport::JSON.decode(data)
		logger.debug "REPO ID :: #{resource["repo_id"]}"
    @repo = Repository.find(resource["repo_id"])

    post = DataFile.save(params['file'], @repo.path)
    
    Dir.chdir(@repo.path)
		@git = Git.init()
		@git.add(:all => true)
		@git.commit(resource["comment"])
   
		render json: {success: "file uploaded"}
  end

  # PUT /resources/1
  # PUT /resources/1.json
  def update
    @resource = params[:content]
	
		if params[:dir_path] == "/"
			params[:dir_path]=""			
		end

		file_path = "#{params[:dir_path]}/#{params[:filename]}"
		
    if File.open(file_path, 'w') {|f| f.write(params[:content]) }
			Dir.chdir(params[:dir_path])
			@git = Git.init()
			@git.add(:all => true)
			@git.commit(params[:comment])
			
			render json: {success: "file successfully uploaded"}
    else
      render json: { error: "SOMETHING WENT WRONG SAVING RESOURCE" }
    end
  end

  # DELETE /resources/1
  # DELETE /resources/1.json
  def destroy
    @repo = Repository.find(params[:id])
		
		#REMOVE FILE FROM FILE SYSTEM AND DO A GIT commit
		if(FileUtils.rm(params[:path]))
			Dir.chdir(@repo.path)
			@git = Git.init()
			@git.add(:all => true)
			@git.commit("Removed file :: #{params[:path]}")
		end

  end
	
	#GET /resources/1/contents.json
	def contents
		extname = File.extname(params[:filename])[1..-1]
    mime_type = Mime::Type.lookup_by_extension(extname)
    content_type = mime_type.to_s unless mime_type.nil?

		@content = IO.read("#{params[:path]}/#{params[:filename]}")
		
		if(@content)
			render text: @content
		else
			render plain: "OH NO!"
		end
	end
	
	# GET /resources/1
  # GET /resources/1.json
  def download
		#send_file(params[:path], :disposition => 'attachment', :x_sendfile=>true)
		send_file(params[:path])
  end
	
	private
		def set_resource
      @resource = Resource.find(params[:id])
    end

    def resource_params
      #params.require(:resource).permit(:name)
    end
end
