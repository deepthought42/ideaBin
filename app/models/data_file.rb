class DataFile < ActiveRecord::Base
  # attr_accessible :title, :body
  def self.chDir(dir_name)
  
  end  
    
  def self.save(upload_file, directory)
    # create the file path
		logger.debug "Entering upload_file"
		if upload_file
			path = File.join(directory, upload_file.original_filename)
			# write the file
			logger.debug "Upload file : #{upload_file.original_filename}"
			File.open(path, "wb") { |f| f.write(upload_file.read) }
		end
		logger.debug "Leaving data upload for file"
  end
  
  def cleanup(directory)
	  if File.exist?(directory)
  		File.delete(directory) 
    end
  end

end
