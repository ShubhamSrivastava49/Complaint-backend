const crypto = require('crypto');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;


const agentSchema = Schema({
    email:{type: String,unique:true},
    password:{type: String},
    mobileNumber:{type:Number},
    typeLogIn :{type:String}
});

const customerSchema = Schema({
    // _id: Schema.Types.ObjectId,
    email:{type: String,unique:true},
    password:{type: String},
    mobileNumber:{type:Number},
    typeLogIn:{type:String},
    // customerComplaint:[{
    //     type: Schema.Types.ObjectId,
    //     ref: 'customerComplaint'
    // }]
});


    agentSchema.pre('save',
	function (next) {

	    if (this.password) {
	        var md5 = crypto.createHash('md5');
	        this.password = md5.update(this.password).digest('hex');
	    }

    next();
	}
);

customerSchema.pre('save',
function (next) {

    if (this.password) {
        var md5 = crypto.createHash('md5');
        this.password = md5.update(this.password).digest('hex');
    }

next();
}
);

agentSchema.methods.comparepasswords  = function (password) {
    let md5 = crypto.createHash('md5');
    md5 = md5.update(password).digest('hex');
    console.log(md5);
    return this.password === md5;
};

customerSchema.methods.comparepasswords  = function (password) {
    let md5 = crypto.createHash('md5');
    md5 = md5.update(password).digest('hex');
    console.log(md5);
    return this.password === md5;
};

const Agent =  module.exports = mongoose.model('Agent',agentSchema,'users');
const Customer = module.exports = mongoose.model('Customer',customerSchema,'users')

