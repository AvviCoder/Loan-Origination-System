import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminDashboard.css'; // Importing the CSS file

const AdminDashboard = () => {
  const [loans, setLoans] = useState([]);
  const [filterStatus, setFilterStatus] = useState('');

  useEffect(() => {
    const fetchLoans = async () => {
      const res = await axios.get('http://localhost:4000/api/v1/admin');
      setLoans(res.data);
    };
    fetchLoans();
  }, []);

  const handleStatusChange = async (loanId, newStatus) => {
    try {
      await axios.put(`http://localhost:4000/api/v1/admin/${loanId}`, { status: newStatus });
      setLoans(loans.map(loan => loan._id === loanId ? { ...loan, status: newStatus } : loan));
    } catch (error) {
      console.error(error);
    }
  };

  const filteredLoans = loans.filter(loan => filterStatus ? loan.status === filterStatus : true);

  return (
    <div className="admin-dashboard">
      <h2 className="admin-dashboard__title">Admin Dashboard</h2>
      <div className="admin-dashboard__filter">
        <label htmlFor="status-filter">Filter by Status:</label>
        <select 
          id="status-filter"
          className="admin-dashboard__select" 
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">All</option>
          <option value="Submitted">Submitted</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>
      <ul className="admin-dashboard__loan-list">
        {filteredLoans.map(loan => (
          <li key={loan._id} className="admin-dashboard__loan-item">
            <span>{loan.name} - ${loan.loanAmount} - {loan.status}</span>
            <button 
              className="admin-dashboard__button approve" 
              onClick={() => handleStatusChange(loan._id, 'Approved')}
            >
              Approve
            </button>
            <button 
              className="admin-dashboard__button reject" 
              onClick={() => handleStatusChange(loan._id, 'Rejected')}
            >
              Reject
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;

