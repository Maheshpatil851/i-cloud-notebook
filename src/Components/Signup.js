import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';

const Signup = (props) => {
  const [credentials, setcredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
  let history = useHistory();

  const handlesubmit = async (e) => {
    e.preventDefault();
    console.log('clicked');
    const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
      method: 'post',

      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
    });
    const json = await response.json();
    console.log(json);
    if(json.success){
      //redirect
      localStorage.setItem('token',json.authtoken);
      history.push('/')
      props.ShowAlert("signed in sucessfully","success")
  }
  else{
    props.ShowAlert("invalid credentials","danger")
  }
  }
  const onChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value })

  }
  return (
    <div>
      <div className='container'>
        <form onSubmit={handlesubmit}>
          <div className="mb-3">
            <label htmlhtmlFor="exampleInputEmail1" className="form-label">Name </label>
            <input className="form-control" type="text" name="name" value={credentials.name} onChange={onChange} id="name" aria-describedby="namehelp" />

          </div>
          <div className="mb-3">
            <label htmlhtmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input className="form-control" type="email" name="email" value={credentials.email} onChange={onChange} id="email" aria-describedby="emailHelp" />
          </div>
          <div className="mb-3">
            <label htmlhtmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input className="form-control" type="password" name="password" value={credentials.password} onChange={onChange} id="password" minLength={5} required/>
          </div>
          <div className="mb-3">
            <label htmlhtmlFor="exampleInputPassword1" className="form-label">cpassword</label>
            <input className="form-control" type="password" name="cpassword" value={credentials.cpassword} onChange={onChange} id="cpassword" minLength={5} required/>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>

    </div>
  )
}

export default Signup
