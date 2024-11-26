import React, { useState } from 'react'
import axios from 'axios'
import "./signUp.css"


const SignUp = () => {
    const [formData, setFormData] = useState({
        name:'',
        email:'',
        password:'',
    })

    const signUpHandler = async(e) => {
        e.preventDefault();
        try{
          const res = await axios.post("http://localhost:4000/api/v1/auth/signup", formData);
          alert("Logged In successfully");

        }catch(error)
        {
          console.error(error);
          alert("Unable to SignIn");
        }
    }
  return (
    <div>
        <h2>Welcome the SignUp Area</h2>
       <form onSubmit={signUpHandler}>
         <label>
            Name:
            <input
            type="text"
            required
            value={formData.name}
            onChange={(e) =>{setFormData({...formData, name:e.target.value})}}/>
         </label>

         <br/>

         <label>
            Email:
            <input
            type="text"
            required
            value={formData.email}
            onChange={(e) => setFormData({...formData, email:e.target.value})}/>

         </label>

         <br/>

         <label>
            Password:
            <input
            type="text"
            required
            value={formData.password}
            onChange={(e) => setFormData({...formData, password:e.target.value})}/>
         </label>

         <button type="submit">Sign Up</button>
       </form>
    </div>
  )
}

export default SignUp