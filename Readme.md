# Groupomania #

This is the backend code for Project 7 of the Junior Web Developer path.
The purpose is to build an intern social network for Groupomania employees.
The user will be able to:
- see all posts,
- see or delete his own posts,
- add one post,
- like or dislike others posts,
- add comments to a post,
- signaled unappropriate posts or comments,
- see, update and delete his account.

The admin will be able to perform specific actons:
- see all signaled posts and comments,
- delete a signaled post or a signaled comment.

### Installation ###

You need to have NodeJS 12.14 or 14.0 (See https://nodejs.org/ for more informations)

Clone this repo.
Then, from within the project folder, run `npm install` to install all dependencies
needed.
After that, you can launch the server with `node server`.
The server should only run on `localhost` port `8080`.
You should get a message "Listening on port 8080" and then "db connected"
If you want to stop the server, use Ctrl + C.

### Configuration ###

This app uses MySQL as database (See https://www.mysql.com/)
To interact wtih the database, this project use Sequelize as ORM (See https://www.sequelize.org)
From within the project folder, you will have to run
`npm install --save sequelize`
`npm install --save mysql2`
`npm install -g sequelize-cli`

Next, you will have to create databases with sequelize-cli from the backend folder:
sequelize-cli db:create
sequelize-cli db:migrate

Then, you will have to set the environment variables for mysql in a .env file with
your own identifiers:
- DBPASSWORD=<your password>
- DBUSERNAME=<your username>
- DBNAME=<the name of your db>

You will also need to set a secret key (= a long random string) in the .env file
to be used by jsonwebtoken
- TOKENSECRET=<your long random string>

As the content of the images folder is not sent to github, you will have to add a
folder called `images` in this project to store the photos of the users.
You will also have to add in the `images` folder a default image for users who
doesn't load a specific image: this image's name must be defaultAvatar.jpg
