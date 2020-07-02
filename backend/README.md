# Simpy-backend
Backend repo for Simpy, Node.js 

## Start the server ###
### Install and Start the database
Install MongoDB on your local machine using the following commands:
`brew tap mongodb/brew`
`brew install mongodb-community`
`brew services start mongodb-community`
Then, run `mongo` to initialize your local database, and `mongod` to open command line to monitor your local db, which 
should be installed at directory `/data/db`

In addition, you can download Mongo Compass to visualize and manage the data more easily.
Link is [here](https://www.mongodb.com/try/download/compass)

More on how to set up MongoDB locally: [Mongo Setup Guide](https://zellwk.com/blog/local-mongodb/)

### Starting the Server
We're almost there! Finally, start the server with `npm start` and the server will start on `http://localhost:8888`.
The starting script has already been configured to run `nodemon server.js` when you run `npm start`.




