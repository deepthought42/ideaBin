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
		
		respond_with(@resources)
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
		@repo = Repository.find(params[:repo_id])
		
    post = DataFile.save(params['file'], @repo.path)
    
    Dir.chdir(@repo.path)
		@git = Git.init()
		@git.add(:all => true)
		@git.commit(params[:comment])
   
		@resource = Resource.new
		@resource.repo_id = params[:repo_id]
		@resource.filename = params[:file].original_filename
		@resource.content_type = params[:file].content_type
		@resource.comment = params[:comment]
		@resource.directory_id = params[:directory_id]
	
		@resource.save
		respond_with(@resource)
  end

  # PUT /resources/1
  # PUT /resources/1.json
  def update
    @resource = Resource.find(params[:id])
		@parentDir = Directory.find(@resource.directory_id)
		
		file_path = "#{@parentDir.path}/#{@resource.filename}"
		
    respond_to do |format|
      if File.open(file_path, 'w') {|f| f.write(params[:content]) }
				Dir.chdir(@parentDir.path)
				@git = Git.init()
				@git.add(:all => true)
				@git.commit(params[:comment])
				
        format.json { head :no_content }
      else
        format.json { render json: @resource.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /resources/1
  # DELETE /resources/1.json
  def destroy
    @resource = Resource.find(params[:id])
    @repo = Repository.find(params[:repo_path])
		
		image_path = "#{@repo.path}#{params[:dir_path]}/#{@resource.filename}"
		if(FileUtils.rm(image_path))
		
			@resource.destroy
			Dir.chdir(@repo.path)
			@git = Git.init()
			@git.add(:all => true)
			@git.commit("Removed file :: #{@resource.filename}")
		end
		#REMOVE FILE FROM FILE SYSTEM AND DO A GIT commit
    respond_to do |format|
      format.json { head :no_content }
    end
  end
	
	#GET /resources/1/contents.json
	def contents
		@resource = Resource.find(params[:id])
		@directory = Directory.find(@resource.directory_id)
		
		extname = File.extname(@resource.filename)[1..-1]
    mime_type = Mime::Type.lookup_by_extension(extname)
    content_type = mime_type.to_s unless mime_type.nil?

		@content = IO.read("#{@directory.path}/#{@resource.filename}")
		
		if(@resource)
			render text: @content
		else
			render plain: "OH NO!"
		end
	end
	
	#GET /resources/1/download.json
	def download
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
