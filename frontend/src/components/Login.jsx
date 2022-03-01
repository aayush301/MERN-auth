import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { postLoginData } from '../api';
import { SuccessMsg, ErrorMsg } from "./alerts"
import { useDispatch, useSelector } from 'react-redux';
import { getLoginAction } from '../redux/actions';


const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    success: "",
    error: ""
  });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await postLoginData({ email: formData.email, password: formData.password });
      setFormData({ ...formData, error: "", success: data.msg });
      localStorage.setItem("isLoggedIn", true);
      dispatch(getLoginAction());
      setLoading(false);
      navigate("/dashboard");
    }
    catch (error) {
      error && setFormData({ ...formData, error, success: "" });
      setLoading(false);
    }
  }

  return (
    <>
      {loading ? (
        <h3>Loading...</h3>
      ) : (
        <div className='login-page'>
          <h2>Login</h2>
          {formData.success && <SuccessMsg msg={formData.success} />}
          {formData.error && <ErrorMsg msg={formData.error} />}

          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" name="email" value={formData.email} placeholder='Enter email address' onChange={handleChange} required />
            </div>

            <div>
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" value={formData.password} placeholder='Enter password' onChange={handleChange} required />
            </div>

            <div className="row">
              <button type='submit'>Login</button>
              <Link to="/auth/forgot-password">Forgot your password?</Link>
            </div>
          </form>

          <p>New User? <Link to="/auth/register">Register</Link></p>
        </div>
      )}
    </>

  )
}

export default Login;