// didn't create cloud database for security reasons, should do this at home

const MongoClient = require("mongodb");
const database = process.env.ATLAS_URI; //or local host url depending on the test

const client = new MongoClient (database, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

var _db;

module.exports = { //we're exporting functions to connect to the server and to access the database
    connectToServer: function(callback) { 
        client.connect( function (err, db) {
            //verify we have a good db object
            if (db) // if database exists (is true)
                {
                _db = db.db("employees"); //TODO change this to a database of yours
                console.log("Successfully connected to MongoDB."); 
                }
            return callback(err); //need to check Node's callbacks to better understand this
        });
    },

    getDb: function () {
        return _db;
    },
};