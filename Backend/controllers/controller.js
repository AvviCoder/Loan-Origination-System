// Here's the overall functionality of the application to deal with loan processing

const Loan = require("../models/model");

 exports.createLoan = async(req,res) =>{
    const{name, email, loanAmount, purpose} = req.body;

    if(!name || !email || !loanAmount || !purpose)
    {
        res.status(404).json({
            message:"please fill in all the details..."
        })
    }

    try{
        const LoanInfo = new Loan({name, email, loanAmount, purpose});
        await LoanInfo.save();

        res.status(200).json({
            message:"The database entry for the new Loan application is done successfully",
        })

    }catch(error){
        res.status(500).json({
            message:"Error occured while creating the database entery"
        })
    }
};

// getting the current status for the requested user
exports.getLoanStatus = async(req,res) =>{
    try{
        const loan = await Loan.findById(req.params.id);
        if(!loan)
        {
            res.status(404).json({
                message:"No current user with a loan request is found"
            })
        }
         res.json({
            status: loan.status,
         })
    }catch(error)
    {
            res.status(500).json({
                message:error.message,
            })
    }
};

// CONTROLLERS RELATED TO THE ADMIN OF THE LOAN PORTAL

exports.getAllLoan = async(req, res) =>{
    const {status} = req.query;
    let filter = {};
    if(status)
    {
        filter.status = status;
    }

    try{
        const loans = await Loan.find(filter);
        res.json(loans); // all the loan requests particular to a single status will be fetched from the database
    }catch(error)
    {
        res.status(500).json({
            message:"Error occured while processing the desired loan requests",
        })
    }
};

// Admin controller for updating the status of various loan applications

exports.updateLoanStatus = async(req,res) =>{
    const {status} = req.body;
    
    if(!["In Review", "Approved", "Rejected"].includes(status)){
        res.status(400).json({
            error:"Invalid status is requested to be updated",
        })
    }

    try{
       const updatedLoan = await Loan.findByIdAndUpdate(req.params.id, {status}, {new:true});
       if(!updatedLoan){
        res.status(400).json({
            message:"No Loan found for updation",
        })
       }

       res.status(200).json({
        message:"The Loan status has been updated successfully",updatedLoan
       })
    }catch(error)
    {
       res.status(500).json({
        message:"Error occured while updating the status of the loan application"
       })
    }
}



