import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const notifydata = {
  position: "top-center",
  autoClose: 1000,
  hideProgressBar: false,
  closeOnClick: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
};

const successNotify = () => toast.success("Login Successfully!", notifydata);
const errNotify = () => toast.error("Login Failed!", notifydata);

const Login = ({ handleLoginStatus }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [err, setErr] = useState('');
  const navigate = useNavigate();


  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      errNotify();
      setError(true);
      return false;
    }
    try {
      const url = process.env.REACT_APP_API_URL + 'user/login';
      const response = await axios.post(url, { email, password });
      const data = response.data;
      if (data.authtoken) {
        localStorage.setItem("token", data.authtoken);
        localStorage.setItem("id", data.user._id);
        localStorage.setItem("name", data.user.name);
        localStorage.setItem("dob", data.user.dob);
        localStorage.setItem("email", data.user.email);
        localStorage.setItem("password", data.user.password);
        localStorage.setItem("date", data.user.date);
        handleLoginStatus();
        setErr('');
        successNotify();
        navigate('/dashboard');
      } else {
        errNotify();
      }
    } catch (err) {
      setErr(err.response.data);
      errNotify();
    }
  };

  return (
    <div className="signup-form">
      <h6 className='invalid-input'>{err}</h6>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
      <div class='form'>
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            autocomplete="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          {error && !email && (
            <span className="invalid-input">Enter valid email</span>
          )}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            autocomplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && !password && (
            <span className="invalid-input">Enter valid password</span>
          )}
        </div>
        <button className="formButton" type="submit">
          Login
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
