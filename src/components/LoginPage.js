import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';


function LoginPage() {

    const navigate = useNavigate();

    useEffect(()=>{
        const checkToken = () => {
            if(Cookies.get('token')){
                navigate('./home');
            }
        }

        checkToken();
    },[])

    const handleLogin = async () =>{
        
        const response = await fetch('https://dummyjson.com/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: 'kminchelle',
                password: '0lelplR',
            })
        });
        const data = await response.json();

        const date = new Date();
        const expirationTime = new Date(date.getTime() + (5*60*1000));

        Cookies.set('token', data.token , { httpOnly: false, expires:expirationTime });
        navigate('\home');
    }

  return (
    <>
    <center><h1 className='mt-5'>Click Below To Login</h1></center>
    <div className="container d-flex justify-content-center">
        <button onClick={handleLogin} className="btn btn-info mt-5">Login</button>
    </div>
        
    </>
        
  )
}

export default LoginPage