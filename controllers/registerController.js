const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/user');
const Issues =require ('../models/complaintCustomer');
const db = require('../database/db');


const tokenSecret = require('../config/configuration');

module.exports.registerCustomer = (req,res) =>{
    const user = new User({
        _id: new mongoose.Types.ObjectId(),               
        email: req.body.email,
        password: req.body.password,
        mobileNumber:req.body.mobileNumber,
        typeLogIn : 'customer'
    });
   
    
   
    user.save()
    .then(data => {
        res.json({msg:'User Saved Successfully'});
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error"
        });
    });
    
}

module.exports.registerAgent = (req,res) =>{
    const user = new User({                
        email: req.body.email,
        password: req.body.password,
        mobileNumber:req.body.mobileNumber,
        typeLogIn : 'agent'
    });
   
    
   
    user.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error"
        });
    });
    
}

module.exports.getcustomerComplaint = (req,res) =>{
    
   
   
    Issues.find({},function(err,data){
       
        if(err) throw err
        var userMap = {};

        data.forEach(function(user) {
      userMap[user._id] = user;
    });

        res.send(data)
    })
  }

module.exports.customerComplaint = (req,res) =>{
    
    const cust = new Issues({
        
        status:true,
        complaintHeading:req.body.heading,
        complaintDescription:req.body.description,
        dateCreated :new Date(),
        dateUpdated :new Date(),
        // userCustomer:user._id
    
    });
   
   
   
    cust.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error"
        });
    });
    
}

//Logged in User

module.exports.logIn = (req,res) =>{
   
   
  
    User.findOne({ email: req.body.email})
    .then(user => {        
        let isMatch = user.comparepasswords(req.body.password);
        if(isMatch){
            if(user.typeLogIn ==="customer"){
               let getToken = createToken(user.email);
                res.json({ success: true, msg: 'Logged In Customer', token: getToken,user: user._id })
            }
            else if(user.typeLogIn ==="agent"){
                let getToken = createToken(user.email);
                res.json({ success: true, msg: 'Logged In Customer', token: getToken,user: user._id })
            }
            }
        
        else{
            res.json({msg:'username or password do not match'})
        }
        // if(isMatch){
        //     // let tokenObj = {};
        //     // tokenObj.id = user._id;
        //     // tokenObj.username = user.email;

        //     // let token = jwt.sign(tokenObj, '' + tokenSecret.secret);
        //     // console.log('gooner',token)
        //     // res.json({ success: true, token: token, msg: 'Logged In Success', user: user._id });
        // }
    // }).catch(err => {
    //     res.status(500).send({
    //         message: err.message || "Could not find User."
    //     });
     });

    function createToken(mail){
        let tokenObj = {}
            tokenObj.username = mail;

            let token = jwt.sign(tokenObj, '' + tokenSecret.secret);
            return token;
    }
     
 }



 


