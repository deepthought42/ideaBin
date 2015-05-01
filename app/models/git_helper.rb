class GitHelper

	def self.init(repo_path, user_email, username)
    Dir.chdir(repo_path)
		@git = Git.init()
		@git.config('user.name', username || 'Ideabin User')
		@git.config('user.email', user_email)

		return @git
	end

	def self.commitAll(gitInstance, commit_message)
		gitInstance.add(:all => true)
		gitInstance.commit(commit_message)
	end
end
