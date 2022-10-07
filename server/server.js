const express = require("express");
const app = express();
const cors = require("cors"); // Cross-origin resource sharing allows loading resources from different domains 

require("dotenv").config({path: "./config.env"}); //sets up a file for environment variables
const port = process.env.port || 3000; //use port 3000 unless otherwise specified

//all app.use statements will get processed each time express is called
app.use("cors()");  
app.use("express.json()"); //allows json parsing on requests
app.use(require("./routes/record"));
//get driver connection
const dbo = require("./db/conn");

app.listen( port, () => {
//connect to database when server starts
    dbo.connectToServer( function (err) {
        if (err) console.error(err);
    });

    console.log(`Server is running on port: ${port}`); //the backstick ` allows for interpolation of variables with the $ sign
});
