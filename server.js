const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const tokenSecret = require('./config/configuration');
const jwt = require('jsonwebtoken')

// const db = require('./database/db');


const app = express();


// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// CORS support
app.use(cors());

//tocken verification
app.use((req,res,next)=>{
    if (req.url !== '/login' && req.url !== '/register' && req.url !=='/registerCustomer' ) {
    let token = req.headers['auth'];
    if (token) {

        console.log('token present');

        console.log('Max');
        console.log(token, '' + tokenSecret.secret)
        try {
            var decoded = jwt.verify(token, '' + tokenSecret.secret);

            if (decoded) {
             next();
            }
        }
        catch (err) {

            //next();
            console.log('Bad Token');
            return res.status(403).send({ success: false, id: 101, message: 'Invalid Token. Please relogin' })


        }

    }
    else {

        // if there is no token
        // return an error
        return res.status(403).json({
            success: false,
            message: 'no token provided.'
        });
    }
} else{
    next();
}
});

// Require users routes
require('./routes/users.js')(app);

// db.connection;


app.listen(3000,() =>{
    console.log('Server is being listened at port 3000')
})