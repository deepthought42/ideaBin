class DataFile < ActiveRecord::Base
  # attr_accessible :title, :body
  
    
  def self.save(upload_file, directory)
  
    # create the file path
    path = File.join(directory, upload_file.original_filename)
    # write the file
    File.open(path, "wb") { |f| f.write(upload_file.read) }
  end
  
  def cleanup(directory)
	  if File.exist?(directory)
  		File.delete(directory) 
    end
  end

end
