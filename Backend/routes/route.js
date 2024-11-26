// // Let's define all the required routes here to link our application with the controller

// const express = require("express");
// const router = express.Router();

// const {createLoan, getLoanStatus, getAllLoan, updateLoanStatus} = require("../controllers/controller");

// // following are the routes that are defined


// // routes for user
// router.post("/loan", createLoan);
// router.get("/:id", getLoanStatus);


// // routes for Admin
// router.get("/admin", getAllLoan);
// router.put("/admin/:id", updateLoanStatus);

// module.exports = router;


const express = require("express");
const router = express.Router();

const {
  createLoan, 
  getLoanStatus, 
  getAllLoan, 
  updateLoanStatus
} = require("../controllers/controller");

const {verifyAdmin, verifyToken} = require("../middlewares/adminAuth");

// Admin routes should be defined first to avoid "admin" being treated as an ID
router.get("/admin",verifyAdmin, getAllLoan);  // only the admins can get all the loan applications
router.put("/admin/:id",verifyAdmin, updateLoanStatus); // only the admin can update the loan status

// User routes
router.post("/loan",verifyToken, createLoan);  
router.get("/:id",verifyToken, getLoanStatus);

module.exports = router;
