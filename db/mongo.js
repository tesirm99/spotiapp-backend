const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.DB_URI, { useUnifiedTopology: true, useNewUrlParser: true, directConnection:true}).then(
 
    () => { console.log("Connected to DB") },
     
    err => { console.log(err) }
     
);

module.exports = mongoose;
