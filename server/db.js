const mongoose = require('mongoose');
const MONGO_USERNAME = 'shashikanth';
const MONGO_PASSWORD = 'root';
const MONGO_HOSTNAME = '127.0.0.1';
const MONGO_PORT = '27017';
const MONGO_DB = 'employee_db';
const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;
 mongoose.connect(url, {useNewUrlParser: true})
.then(()=>{
    console.log("Success Mongo DB connected on local server");
})
.catch((err)=>{
    console.log(err);
})



module.exports = {url};