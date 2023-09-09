const mongoose = require("mongoose");

const empSchema = new mongoose.Schema ({
    fullname :{
        type:String,
        required:true
    },

    email :{
        type:String,
        required:true,
        unique:true,
        index:true, 
        sparse:true
    },

    gender :{
        type:String,
        required:true,
        

    },
    dateofbirth:{
        type:Date,
        required:true
    },
    password:{
        type:Array,
        required:true
    },
    confirmpassword:{
        type:Array,
        required:true
    }

})

const Register = new mongoose.model('Register',empSchema);
module.exports = Register;

