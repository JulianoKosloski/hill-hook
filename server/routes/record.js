const express = require("express");
const { connectToServer } = require("../db/conn");

// instance of express router that will be used to define our routes
const recordRoutes = express.Router();

const dbo = require("../db/conn");

const ObjectId = require("mongodb").ObjectId; //used to convert strings to ObjectIds

//---------------------------API-----------------------------

// READ - get a list of all records
recordRoutes.route("/record").get( function (req, res) {
    let db_connect = dbo.getDb("employees"); //change db name later

    db_connect
        .collection("records")
        .find({})
        .toArray( function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});

// READ - get a single record by id
recordRoutes.route("/record:id").get( function (req, res) {
    let db_connect = dbo.getDb();
    let query = { _id: ObjectId(req.params.id)};

    db-connect
        .collection("records")
        .findOne(query, function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});

// CREATE - create a new record

recordRoutes.route("/record/add").post( function (req, res) {
    let db_connect = dbo.getDb();
    let obj = { //change params later for my own database requirements
        name: req.body.name,
        position: req.body.position,
        level: req.body.level,
    }

    db_connect
        .collection("records")
        .insertOne(obj, function (err, post_res) { 
            if (err) throw err;
            res.json(post_res);
        });
});

// UPDATE - update record by id
recordRoutes.route("/record:id").post( function (req, res) {
    let db_connect = dbo.getDb();
    let query = { _id: ObjectId(req.params.id)};

    let updateValues = {
        $set: {
            name: req.body.name,
            position: req.body.position,
            level: req.body.level,
        },
    };

    db_connect
        .collection("records")
        .updateOne(query, updateValues, function (err, post_res) {
            if (err) throw err;
            console.log("1 document updated");
            res.json(post_res);
        });
});

// DELETE - delete a record by id
recordRoutes.route("/record:id").delete( function (req, res) {
    let db_connect = dbo.getDb();
    let query = { _id: ObjectId(req.params.id)};

    db_connect
        .collection("records")
        .deleteOne(query, function (err, delete_res) {
            if (err) throw err;
            console.log("1 document deleted");
            res.json(delete_res);
        });
});

 
module.exports = recordRoutes;