// didn't create cloud database for security reasons, should do this at home

const{ MongoClient} = require("mongodb");
const database = process.env.ATLAS_URI;

const client = new MongoClient (database, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

var _db;

module.exports = {
    connectToServer: function(callback) { 
        client.connect( function (err, db) {
            //verify we have a good db object
            if (db)
                {
                _db = db.db("employees");
                console.log("Successfully connected to MongoDB."); 
                }
            return callback(err);
        });
    },

    getDb: function () {
        return _db;
    },
};