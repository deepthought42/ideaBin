class GitHelper

	def self.init(repo_path, user_email, username)
    Dir.chdir(repo_path)
		@git = Git.init()
		@git.config('user.name', username || 'Ideabin User')
		@git.config('user.email', user_email)

		return @git
	end
end
