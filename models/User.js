const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    image:{
        type: String,
        default:'image'
    },
    companyName:{
        type: String,
    },
    name:{
        type: String,
        default:'user'
    },
    surname:{
        type: String,
        default:'user'
    },
    email:{
        type:String,
        required: true,
    },
    password:{
        type:String,
        required:true
    },
    postCode:{
        type:Number,
    },
    contactNumber:{
        type:Number,
    },
    address:{
        type:String,
    },
    shippingAddress:{
        type:String,
        default:'user'
    },
    payHistory: [{
        type: mongoose.Types.ObjectId,
        ref: 'Order'
    }],
    myProducts: [{
        type: mongoose.Types.ObjectId,
        ref: 'Product'
    }],
    cart:[],
    role:{
        type: Number,
        default:0
    } 

    //roles: 0 - Customer; 1 - Seller, 2 - Admin
},{
    timestamps:true
})

module.exports = mongoose.model('User', userSchema)