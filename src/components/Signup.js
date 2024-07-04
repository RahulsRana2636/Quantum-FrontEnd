import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("");
  const [error, setError] = useState(false);
  const [err, setErr] = useState('');
  const notifydata = {
    position: "top-center",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  };
  const successNotify = () => toast.success("Now you can login", notifydata);
  const errNotify = () => toast.error("SignUp Failed!", notifydata);

  const collectData = async (e) => {
    e.preventDefault();  // Prevents the default form submission behavior
    if (!name || !email || !password || !dob) {
      setError(true);
      errNotify();
      return false;
    }
    try {
      const url = process.env.REACT_APP_API_URL + 'user/createuser';
      const response = await axios.post(url, {
        name,
        email,
        password,
        dob,
      });
      const data = response.data;
      if (data.authtoken) {
        setErr('');
        setName('');
        setEmail('');
        setPassword('');
        setDob('');
        successNotify();
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
      <h2>Register</h2>
      <form className='form' onSubmit={collectData}>
        <input
          required
          type="text"
          placeholder="Username"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {error && !name && <span className='invalid-input'>Enter name</span>}
        <input
          required
          name="email"
          type="email"
          placeholder="Email Address"
          value={email}
          autoComplete="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        {error && !email && <span className='invalid-input'>Enter email</span>}
        <input
          required
          type="password"
          name="password"
          placeholder="Password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && !password && <span className='invalid-input'>Enter password</span>}
        <input
          required
          type="date"
          name="DOB"
          placeholder="DOB"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
        />
        {error && !dob && <span className='invalid-input'>Enter Dob</span>}
        <button className="formButton" type="submit">
          Sign Up
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
