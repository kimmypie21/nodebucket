/*
Title: WEB450 NodeBucket
Author: Professor Krasso
Date: October 2020
Modified By: Kimberly Pierce
Description: NodeBucket
*/


//require statements
const mongoose = require ('mongoose');
//schema allows us to define fields, templates for documents in collection
const Schema = mongoose.Schema;
const Item = require ('./item');

//create model and specify which collection in the database to connect it to
let employeeSchema = new Schema ({
    empId: {type: String, unique: true, dropDups: true},//dropDups won't allow duplicate records to be added
    firstName: {type: String}, 
    lastName: {type: String},
    todo: [ Item ],
    done: [ Item ]
}, { collection: 'employees' });


//export this module so the rest of the app can use it
module.exports = mongoose.model( "Employee", employeeSchema );




