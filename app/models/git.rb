class GitHelper

	def self.init(repo, user_email, username)
		@git = Git.init()
		@git.config('user.name', username || 'Ideabin User')
		@git.config('user.email', user_email)

		return @git
	end
end
