import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';

const Login = (props) => {
    const {ShowAlert} =props
    const [credentials, setcredentials] = useState({ email: "", password: "" });
    let history = useHistory();

    const handlesubmit = async (e) => {
        e.preventDefault();
        console.log('clicked');
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: 'post',

            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        console.log(json);
        if(json.success){
            //redirect
            localStorage.setItem('token',json.authtoken);
            history.push('/')
            ShowAlert("Loged in sucessfully","success")
        }
        else{
            ShowAlert("invalid credentials","danger")
        }
    }
    const onChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value })

    }
    return (
        <>
            <div className='container'>
                <form onSubmit={handlesubmit}>
                    <div className="mb-3">
                        <label htmlhtmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input className="form-control" type="email" name="email" value={credentials.email} onChange={onChange} id="email" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label htmlhtmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input className="form-control" type="password" name="password" value={credentials.password} onChange={onChange} id="password" />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </>
    )
}

export default Login
