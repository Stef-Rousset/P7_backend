# Groupomania #

This is the code for Project 7 of the Junior Web Developer path.
The purpose is to build an intern social network for Groupomania employees.
The user will be able to:
- see all posts,
- add one post, modify it or delete it,
- like others posts,
- add comments to a post,
- signaled unappropriate posts or comments,
- see and update his account.


### Installation ###

You need to have NodeJS 12.14 or 14.0 (See https://nodejs.org/ for more informations)

Clone this repo.
Then, from within the project folder, run `npm install` to install all dependencies needed
After that, you can launch the server with `node server`.
The server should only run on `localhost` port `3000`.
You should get a message "Listening on port 3000" and then "db connected"
If you want to stop the server, use Ctrl + C.

### Configuration ###

This app uses MySQL as database (See https://www.mysql.com/)
Please create an account and set those environment variables in a .env file with
your own identifiers:
- DBPASSWORD=<your password>
- DBUSERNAME=<your username>
- DBNAME=<the name of your db>

You will also need to set a secret key (=a long random string) to be used by jsonwebtoken
- TOKENSECRET=<your long random string>

As the content of the images folder is not sent to github, you will have to add a
folder called `images` in this project to store the photos of the users.
