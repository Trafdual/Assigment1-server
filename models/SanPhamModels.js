const mongoose=require('mongoose');
var Schema=mongoose.Schema;
var SanPhamSchema=new Schema({
    tenSP:{
        type:String,

    },
    giaSP:{
        type:Number,
       
    },
    mausac:{
        type:String
    },
    loaiSP:{
        type:String
    },
    tenKH:{
        type:String
    }
});
module.exports=mongoose.model('SanPham',SanPhamSchema);