import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, call /user/register or login API here
    // We navigate to /nodes after successful login/registration
    navigate('/nodes');
  };

  return (
    <div className="login-page-body">
      <div className="ring">
        <i style={{ '--clr': '#00ff0a' }}></i>
        <i style={{ '--clr': '#ff0057' }}></i>
        <i style={{ '--clr': '#fffd44' }}></i>

        <div className="login">
          <h2>{isLogin ? 'Login' : 'Register'}</h2>
          <form onSubmit={handleSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="inputBx">
              <input type="text" placeholder="Username" required />
            </div>
            {!isLogin && (
              <div className="inputBx">
                <input type="email" placeholder="Email" required />
              </div>
            )}
            <div className="inputBx">
              <input type="password" placeholder="Password" required />
            </div>
            <div className="inputBx">
              <input type="submit" value={isLogin ? 'Sign in' : 'Sign up'} />
            </div>
          </form>
          <div className="links">
            <a href="#" onClick={(e) => e.preventDefault()}>Forget Password</a>
            <a href="#" onClick={(e) => { e.preventDefault(); setIsLogin(!isLogin); }}>
              {isLogin ? 'Signup' : 'Login'}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

