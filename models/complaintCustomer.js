const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;


const cutomerComplaintSchema = Schema({
    // userCustomer:{
    //     type: Schema.Types.ObjectId,
    //     ref: 'Customer'
    // },
    status:{type:Boolean},
    dateCreated:{type:  Date},
    dateUpdated:{type:  Date},
    complaintHeading :{type:String},
    complaintDescription:{type:String},
    
});




const customerComplaint = module.exports = mongoose.model('customerComplaint',cutomerComplaintSchema,'customerComplaints')
