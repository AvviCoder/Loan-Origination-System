
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const LoanStatus = ({ userId }) => {
//   const [loanStatus, setLoanStatus] = useState(null);

//   useEffect(() => {
//     const fetchLoanStatus = async () => {
//       try {
//         const res = await axios.get(`http://localhost:4000/api/v1/${userId}`);
//         setLoanStatus(res.data.status);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchLoanStatus();
//   }, [userId]);

//   return (
//     <div>
//       <h2>Loan Status: {loanStatus || "Fetching..."}</h2>
//     </div>
//   );
// };

// export default LoanStatus;

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './LoanStatus.css';

const LoanStatus = () => {
  const { userId } = useParams();
  const [loanStatus, setLoanStatus] = useState(null);

  useEffect(() => {
    const getLoanStatus = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/v1/loan/${userId}`);
        setLoanStatus(res.data.status);
      } catch (error) {
        console.error(error);
      }
    };

    getLoanStatus();
  }, [userId]);

  return (
    <div className="loan-status-container">
      <h2 className="loan-status-title">Your Loan Status</h2>
      <p className="loan-status-info">
        {loanStatus ? `Current Status: ${loanStatus}` : 'Loading...'}
      </p>
    </div>
  );
};

export default LoanStatus;

