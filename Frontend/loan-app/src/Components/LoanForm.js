// import React, { useState } from 'react'
// import axios from "axios"
// const LoanForm = () => {

//   const[formData, setFormData] = useState({
//     name:'',
//     email:'',
//     loanAmount:'',
//     purpose:'',
//   });
    
//    const HandleSubmit = async(e) =>{
//        e.preventDefault();
//        try{
//        const res = await axios.post('http://localhost:4000/api/v1/loan', formData);
//        alert("The loan application is submitted successfully....");
//        }catch(error){
//        console.error(error);
//        alert("Unable to submit the loan application");
//        }

//    }
   
//   return (
//     <div> 
//       <form onSubmit={HandleSubmit}>
//         <input type="text" placeholder='Enter your name' required value={formData.name} onChange={(e) =>setFormData({...formData, name:e.target.value})} />
//         <input type="text" placeholder='Enter your email' required value={formData.email} onChange={(e) =>setFormData({...formData, email:e.target.value})} />
//         <input type="number" placeholder='Enter the loan amount' required value={formData.loanAmount} onChange={(e) =>setFormData({...formData, loanAmount:e.target.value })} />
//         <input type="text" placeholder='What is the purpose for loan' required value={formData.purpose} onChange={(e) =>setFormData({...formData, purpose:e.target.value})}/>
//         <button type="submit">Submit your Loan application</button>
//       </form>
//     </div>
//   )
// }

// export default LoanForm;

import React, { useState } from 'react';
import axios from 'axios';
import './LoanForm.css';

const LoanForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    loanAmount: '',
    loanType: '',
  });

  const[errors, setErrors] = useState({});

  const validate = () =>{
     const errors={};
     if(!formData.name.trim()){
      errors.name="Please enter your name";
     }

     if(!formData.loanAmount || (formData.loanAmount < 0))
     {
      errors.loanAmount = "Enter the correct loan amount";
     }

     if(!formData.loanType.trim())
     {
      errors.loanType = "Please enter the correct loan type";
     }
      return errors;
  }



  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent default form behavior
    const validateErrors = validate(); // checking if the correct data is entered
    if(Object.keys(validateErrors).length > 0)
    {
      setErrors(validateErrors);
      return;
    }
    try {
      await axios.post('http://localhost:4000/api/v1/loan', formData);
      alert('Loan Application Submitted Successfully');
    } catch (error) {
      console.error(error);
      alert('Error submitting loan application');
    }
  };

  return (
    <form className="loan-form" onSubmit={handleSubmit}>
      <h2 className="form-title">Loan Application Form</h2>
      <label className="form-label">
        Name:
        <input
          className="form-input"
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </label>
      {errors.name && <span className='errors'>{errors.name}</span>}
      <br />
      <label className="form-label">
        Loan Amount:
        <input
          className="form-input"
          type="number"
          value={formData.loanAmount}
          onChange={(e) => setFormData({ ...formData, loanAmount: e.target.value })}
          required
        />
      </label>
      {errors.loanAmount && <span className='errors'>{errors.loanAmount}</span>}
      <br />
      <label className="form-label">
        Loan Type:
        <input
          className="form-input"
          type="text"
          value={formData.loanType}
          onChange={(e) => setFormData({ ...formData, loanType: e.target.value })}
          required
        />
      </label>
      {errors.loanType && <span className='errors'>{errors.loanType}</span>}
      <br />
      <button className="form-submit-btn" type="submit">Submit Application</button>
    </form>
  );
};

export default LoanForm;
