// the data schema is defined as follows
const mongoose = require("mongoose");

const loanSchema = new mongoose.Schema({
    name:{
        type:String, required:true, 
    },
    email:{
        type:String, required:true, match: /.+\@.+\..+/  // see the new way to verify the email format
    },
    loamAmount:{
        type:Number, required:true, min:1, default:1,
    },
    purpose:{
        type:String, required:true,
    },
    status:{
        type:String,
        enum:["submitted", "In Review", "Approved", "Rejected"],
        default:"submitted",
    },
    createdAt:{
        type:Date, default:Date.now(),
    }
})

module.exports = mongoose.model("Loan", loanSchema);

