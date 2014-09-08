class DataFile < ActiveRecord::Base
  # attr_accessible :title, :body
  
    
  def self.save(upload, user_id, idea_id)
    name =  upload['file'].original_filename
    @idea = Idea.find(idea_id)
    directory = "#{Rails.root}/public/data/repository/#{user_id}/#{@idea.name}"
    # create the file path
    path = File.join(directory, name)
    # write the file
    File.open(path, "wb") { |f| f.write(upload['file'].read) }
  end
  
  def cleanup
	  if File.exist?("#{Rails.root}/public/data/repository/#{@filename}")
  		File.delete("#{Rails.root}/public/data/repository/#{@filename}") 
    end
  end

end
