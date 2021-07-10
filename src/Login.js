import { Button } from '@material-ui/core';
import React from 'react'
import "./Login.css"
import { auth, provider } from "./firebase"

function Login() {
    const signIn = () =>{
        auth.signInWithPopup(provider)
        .catch((error) => alert(error.message));
    }
    return (
        <div className="login">
            <div className="login__logo">
                <img 
                src="https://www.thecompassforsbc.org/sites/default/files/COVID-19%20icon%202FINAL.png"
                alt="ismessage"
                ></img>
                <h1>COVID-19 Tracker</h1>
            </div>
            <Button onClick={signIn} type="submit">
                Sign In
            </Button>
        </div>
    )
}

export default Login
