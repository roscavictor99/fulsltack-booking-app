import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import { toast } from 'react-toastify';
import { login } from '../actions/auth';
import { useDispatch } from 'react-redux';

const Login = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = async e => {
    e.preventDefault();
    console.log('SEND LOGIN DATA', { email, password });
    try {
      const { data } = await login({ email, password });
      console.log(data);

      // save user and token to local storage
      localStorage.setItem('auth', JSON.stringify(data));

      // save user and token to redux
      dispatch({
        type: 'LOGGED_IN_USER',
        payload: data,
      });
      history.push('/dashboard');
    } catch (error) {
      toast.error(error.response.data);
    }
  };
  return (
    <>
      <div className="container-fluid bg-secondary p-5 text-center">
        <h1>Login</h1>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <LoginForm
              handleSubmit={handleSubmit}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
