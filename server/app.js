/*
Title: WEB450 NodeBucket
Author: Professor Krasso
Date: September 2020
Modified By: Kimberly Pierce
Description: NodeBucket
*/

//Require statements
const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const Employee = require ('./models/employees');
const Item = require ('./models/item');
const EmployeeApi = require ('./routes/employee-api'); 

//App configurations
let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended': true}));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../dist/nodebucket')));//server side render angular
app.use('/', express.static(path.join(__dirname, '../dist/nodebucket')));//server side render angular



//variable that holds db connection string
const conn = "mongodb+srv://nodebucket_user:tgVY8kPTQmlFeKRZ@buwebdev-cluster-1.brhxo.mongodb.net/nodebucket";



//database connection
mongoose.connect(conn, {
  promiseLibrary: require('bluebird'),
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndexes: true
}).then(() => {
  console.debug(`Connection to the database instance was successful`);
}).catch(err => {
  console.log(`MongoDB Error: ${err.message}`)
}); 



//API(s) go here...

app.use('/api/employees', EmployeeApi);







//Create and start server on localhost:3000
const port = process.env.PORT || 3000; // server port
http.createServer(app).listen(port, function() {
  console.log(`Application started and listening on port: ${port}`)
}); 
// end http create server function
