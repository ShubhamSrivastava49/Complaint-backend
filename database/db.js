// const MongoClient = require('mongodb').MongoClient;



// const connection = MongoClient.connect("mongodb://localhost:27017/login")
// .then(result =>{
//   console.log('shubham db connected')
// })
// .catch(err =>{
//   console.log(err)
// });

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const connection =  mongoose.connect("mongodb://localhost:27017/login")
.then(()=>{
    console.log('Successfully connected to the database');
}).catch((err) => {
    console.log('Could not connect to the database.. Exiting now...');
    process.exit();
});

  module.exports.dbConnection = {connection:connection}
