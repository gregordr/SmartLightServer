import express = require('express');
const app: express.Application = express();
import bodyParser = require('body-parser')
import mongoose = require('mongoose');
require('./scheduler')

app.use(bodyParser.urlencoded({ extended: true }));

require('dotenv').config();

const uri = process.env.MONGO_URI;
let uriString: string = "";
if (typeof uri === "undefined") {
    console.log("MongoDB connection required for scheduling to work");
} else {
    uriString = uri;
}

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("Connected to MongoDB");
});

mongoose.connect(uriString, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});

const controlRouter = require('./routers/controlRouter');
app.use('/light/control', controlRouter);

const scheduleRouter = require('./routers/scheduleRouter');
app.use('/light/schedule', scheduleRouter);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}`));