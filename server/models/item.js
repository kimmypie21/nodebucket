/*
Title: WEB450 NodeBucket
Author: Professor Krasso
Date: September 2020
Modified By: Kimberly Pierce
Description: NodeBucket
*/

//require statements
const mongoose = require ('mongoose');
//schema allows us to define fields, templates for documents in collection
const Schema = mongoose.Schema;


//create model and specify which collection in the database to connect it to
let itemSchema = new Schema ({
   text: {type: String}
});


//export this module so the rest of the app can use it
module.exports =  itemSchema ;

