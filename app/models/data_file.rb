class DataFile < ActiveRecord::Base
  # attr_accessible :title, :body
  
    
  def self.save(upload)
    name =  upload['file'].original_filename
    directory = "public/data"
    # create the file path
    path = File.join(directory, name)
    # write the file
    File.open(path, "wb") { |f| f.write(upload['datafile']) }
  end
  
  def cleanup
	if File.exist?("#{RAILS_ROOT}/dirname/#{@filename}")
		File.delete("#{RAILS_ROOT}/dirname/#{@filename}") 
    end
  end

end
