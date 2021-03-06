class GitHelper
	
	##
	#	Initializes a repository and configures it to use the user
	# email and username passed
	##
	def self.init(repo_path, user_email, username)
    Dir.chdir(repo_path)
		@git = Git.init()
		@git.config('user.name', username || 'Ideabin User')
		@git.config('user.email', user_email || 'contributor@ideabin.net')

		return @git
	end

	##
	#	commits all current changes available to be added for
	# git instance passed. Uses the provided commit_message for
	# the commit message
	##
	def self.commitAll(gitInstance, commit_message)
		gitInstance.add(:all => true)
		gitInstance.commit(commit_message)
	end

	##
	# returns a unique array of contributor usernames
	##
	def self.getContributors(gitInstance)
		contributor_arr = Array.new		
		gitInstance.log.each{|l| contributor_arr.include?(l.author.email) ? nil : contributor_arr.push(l.author.email) }

		return contributor_arr
	end
end
