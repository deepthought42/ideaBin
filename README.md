IdeaBin is intended to be a platform to better enable people to easily collaborate with others while maintaining project versions allowing idea owners to retain control over their projects using the Git versioning sysem, as well as allowing them to approve and undo changes submitted by collaborators.

<h3><b>Stack:</b></h3>

1. Rails 4.1.5
2. Ruby 2.1.2
3. NodeJS
4. AngularJS
5. Bower
6. PostGreSql
7. imageMagick

<h3><b>Getting Started: </b></h3>
In order to get started you'll need Ruby 2.1.2 as well as Rails 4.1.5 installed. You can find documentation on installing these and getting started with Ruby on Rails at rubyonrails.org. This project also relies on PostGreSQL, and the database file currently relies on the default user with an empty password. The following list of instructions will guide you through getting setup.

	1. Install <a href="https://www.ruby-lang.org/en/documentation/installation/">Ruby</a>
	2. Install <a href="http://installrails.com/">Rails</a>: 
			gem install rails
	3. Install git.
	4. Install postrgreSQL
	5. Install NodeJS
	6. Install bower npm install -g bower
	7. Make sure you have imageMagick installed.

			For windows users this means not using the .dll file and setting
			up the appropriate paths 7. Open a command line and navigate to
			the directory that you would like to save the project and type in
			the following and press enter.

				git clone https://github.com/deepthought42/ideaBin.git

	8. create directories /public/data/repository
	9. On the command line navigate to the ideaBin folder and run the following commands:
		9.1) Install bower dependencies bower install
		9.2) Setup Database
		9.2.1) rename ideaBin/config/database.tmp.yml to ideaBin/config/database.yml
						Replace 'user_here' with your username Replace 'password_here' with
						your password
		9.2.2) rake db:setup
		9.3) install bundled gems bundle install
		9.4) Start server rails server 10. Navigate to localhost:3000 and you should
						see the home page for ideaBin.

<h3><b>Overview:</b></h3>
 <p>In ideaBin everything focuses on the management of and contribution to ideas,
so naturally an idea is the focal point of the code and the app in general.
Currently the code is quite simple and consists of just ideas and users. Whenever
an idea is created, we take the liberty of generating a folder in
/public/data/repository/:user_id as well as initializing a new git repository.
When users upload changes to the project by simply dragging and dropping either
a new file or one they downloaded and edited, ideaBin then does 1 of 2 things.
</p>
<p>
		1) If you are the user that created the idea then the upload is performed and
				changes are simultaneously committed to the repository so you don't have
				to worry about it.
		</p>
		<p>
		2) If you aren't the user that created the idea then the original repository
				is cloned and placed in the users repository folder at
				/public/data/repository/:user_id. The system then takes the uploaded file
				and places it in the folder as well as committing the changes. When
				finished ideaBin will be a fully open source platform that you can
				contribute to through the platform as well as managing your own projects
				through an intuitive User interface and integrated code editors, image
				editors, diagramming tools and other things that teams tend to need when
				collaborating on a project. There is certainly lots to do, so feel free
				to help out if that's something you'd be in to. Contribute: There's no
				shortage of things that need to be done on this project. If you are
				interested in contributing there are a number of things you can do.
				There is currently very limited bug reporting, but if you find one I'd
				love to know about it. You can also find features or whatnot that need
				to be fixed in the issues section of github. Any and all help or
				criticism are very much appreciated. Email us at support@ideabin.net.
</p>
