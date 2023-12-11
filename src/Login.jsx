import { useState, useEffect } from 'react'
import './Login.css'
import { LoginApiUrl } from './ApiUrl'
export default function Login() {
    const [loginMessage, setLoginMessage] = useState(<label><b> Please login or create a user to save your time to the leaderboard.</b></label>);
  return (
<form className='LeaderboardLogin' method='post' onSubmit={(e) => {
    console.log(e.target.elements[0].value);
    console.log(e.target.elements[1].value);
    console.log(e.target.elements[2].value);
      const PostData = async () => {
          const Response = await fetch(LoginApiUrl,{method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'body': JSON.stringify({'username': e.target.elements[0].value, password: e.target.elements[1].value})}});
          let jsonMessage = await Response.json();
            setLoginMessage('Login');
      }
      PostData();
}
}>
    <p htmlFor="username">Username:</p>
    <input type="text" id="username" name="username"  placeholder="Username" size="5" required autoComplete="current-username"/>
    <label htmlFor="pass">Password (8 characters minimum):</label>
    <input type="password" id="pass" name="password" placeholder="Password" minLength="8" required autoComplete="current-password" size="8"/>
    <input type="submit" value="Sign in / Sign Up" />
    {loginMessage}
</form>
  )
}
