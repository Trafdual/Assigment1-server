const mongoose=require('mongoose');
var Schema=mongoose.Schema;
var UserSchema=new Schema({
    tenUser:{
        type:String,
        required:true,
        uniqe:true,
        sparse:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }, imageUrl:{
        type:String
    }
});
module.exports=mongoose.model('User',UserSchema);