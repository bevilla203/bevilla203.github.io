import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../api/axios';
// import { useDispatch, useSelector } from "react-redux";
// import { selectUser, setCurrentUser } from "../../app/reducers/userSlice";
import { v4 as uuidv4 } from 'uuid';

const LOGIN_URL = '/api/login';

const Login = () => {
  const isLoggedIn = sessionStorage.getItem('accessToken') ? true : false;
  // const { setAuth } = useContext(AuthContext);
  const emailRef = useRef();
  const errRef = useRef();
  // const user = useContext(AuthProvider());
  // const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setError('');
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        LOGIN_URL,
        {
          email,
          password,
          guestId: sessionStorage.getItem('guestId'),
        },
        {
          headers: {
            'Content-Type': 'application/json',
            withCredentials: true,
          },
        }
      );
      sessionStorage.setItem('accessToken', response?.data?.accessToken);
      sessionStorage.setItem('isAdmin', response?.data?.isAdmin);
      sessionStorage.setItem('userId', response?.data?.userId);
      sessionStorage.setItem('firstName', response?.data?.firstName);
      sessionStorage.setItem('lastName', response?.data?.lastName);
      sessionStorage.setItem('email', response?.data?.email);
      sessionStorage.removeItem('guestId');
      setEmail('');
      setPassword('');
      // setSuccess(true);
      window.location.replace('/home');
    } catch (e) {
      if (!e) {
        setError('No server response');
      } else if (e.response?.status === 400) {
        setError('Missing email or password');
      } else if (e.response?.status === 401) {
        setError('Unauthorized');
      }
      console.log(
        'ERROR IN CATCH OF handleLogin function IN LOGIN COMPONENT: ',
        e
      );
      errRef.current.focus();
    }
  };
  // const user = useSelector(selectUser);
  const isNotValid = !email && !password;
  useEffect(() => {
    if (
      !sessionStorage.getItem('accessToken') &&
      !sessionStorage.getItem('guestId')
    ) {
      sessionStorage.setItem('guestId', uuidv4());
    }
  }, []);
  return (
    <div className="bodyContent">
      {
        // success ? (
        // 	<div className="successfulLogin">
        // 		<h1>You're logged in!</h1>
        // 		<p>
        // 			Go to <Link to="/api">Home</Link>
        // 		</p>
        // 	</div>
        // ) : (
        <div className="loginPage">
          <div style={{ backgroundColor: 'red' }}>
            <p
              ref={errRef}
              className={error ? 'errorMessage' : 'offScreen'}
              aria-live="assertive"
            >
              {error}
            </p>
          </div>
          <h1 className="header">Log In</h1>
          <div className="loginBox">
            <form onSubmit={handleSubmit}>
              <div class="form-group">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  ref={emailRef}
                  value={email}
                  autoComplete="off"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email..."
                  required
                  className="form-control w-125"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  className="form-control"
                  id="password"
                  type="password"
                  placeholder="Password..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button
                disabled={isNotValid}
                type="submit"
                className="btn btn-primary loginMarginFix"
              >
                Log In
              </button>
              <p className='loginMarginFix'>
                Need an account? <br />
                <span>
                  <Link to="/signup">Sign Up</Link>
                </span>
              </p>
            </form>
          </div>
        </div>
      }
    </div>
  );
};

export default Login;
