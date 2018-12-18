const register = require('../controllers/registerController');
   
   
   module.exports =  (app) => {

    // Registering User Routes
    // app.route('/register').post(register.registerUser);

    app.route('/registerCustomer').post(register.registerCustomer); 
    app.route('/registerAgent').post(register.registerAgent);

    

      app.route('/login').post(register.logIn);
    
     // app.route('/users').get(register.getUser)
     
     app.route('/customerComplaint').get(register.getcustomerComplaint).post(register.customerComplaint)

     
    
}
