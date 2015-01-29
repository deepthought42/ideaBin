class DataFile < ActiveRecord::Base
  # attr_accessible :title, :body
  def self.chDir(dir_name)
  
  end  
    
  def self.save(upload_file, directory)
    # create the file path
		if upload_file
			path = File.join(directory, upload_file[:name])
			# write the file
			File.open(path, "wb") { |f| f.write(upload_file.read) }
		end
  end
  
  def cleanup(directory)
	  if File.exist?(directory)
  		File.delete(directory) 
    end
  end

end
