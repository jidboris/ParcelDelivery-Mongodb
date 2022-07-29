const express = require("express");
const {mongoose} = require('mongoose');
const parcelModel = require("./Modules/parcelModel");
const parcelRoute = require("./Route/parcelRoute");
const jwt = require('jsonwebtoken');
//const users = require('../Route/user');
const app = express();
const PORT = process.env.PORT || '3100';
//Bellow is a middleware to shutout unregistered user trying to access the database
const validateUser = (req,res,next) => {
     decodedPayload = jwt.verify(req.headers['x-access-token'], 'secretkey' )
     if(decodedPayload){
         req.body.usedId = decodedPayload.id
         next();
     }
     else{res.json({
         status: 'error',
         message: 'User not validated'
     })
 }
};

app.use(express.json());
app.use('/Parcels', validateUser, parcelRoute);
//To use another route for user, it will be
//app.use('/user', users)



// can also connect here alternatively
// async function connect() {
//      await mongoose.connect('mongodb://localhost:27017')
//  }
//  connect().then(() => console.log('connected to database')).catch((error) => 
//  { console.log('Error:', error()) })
    

app.listen(PORT, () =>
    console.log('listening on port ${PORT}..')
);