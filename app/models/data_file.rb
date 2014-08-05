class DataFile < ActiveRecord::Base
  # attr_accessible :title, :body
  
    
  def self.save(upload, user_id)
    name =  upload['file'].original_filename
    directory = "public/data/repository/#{user_id}"
    # create the file path
    path = File.join(directory, name)
    # write the file
    File.open(path, "wb") { |f| f.write(upload['file'].read) }
  end
  
  def cleanup
	if File.exist?("#{RAILS_ROOT}/dirname/#{@filename}")
		File.delete("#{RAILS_ROOT}/dirname/#{@filename}") 
    end
  end

end
