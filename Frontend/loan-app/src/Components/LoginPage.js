import React, { useState } from 'react'
import "./loginPage.css"
import axios from "axios"

const LoginPage = () => {
  
    const[email, setEmail] = useState('');
    const[password, setPassword] =useState('');
    
    const handleLogin = async(e) =>{
        e.preventDefault();
        try{
          const res = await axios.post("http://localhost:4000/api/v1/login", {email, password});
          alert("Successfully logged");
        }catch(error)
        {
          console.error(error);
          alert("The credentials are invalid");
        }
        
    }

    return (
    <div className='login-page'>
       <h2>Welcome to the Login Form</h2>
       
       <form onSubmit={handleLogin}>
          <label>
            Email:
            <input 
             type="text"
             required
             value={email}
             onChange={(e) => setEmail(e.target.value)}
             />
          </label>
          <br/>
          <label>
            password:
            <input
            type="text"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}/>
          </label>
          <br/>
          <button type='submit'>Login In</button>
       </form>
    </div>
  )
}

export default LoginPage