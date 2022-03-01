import React from 'react'
import { useState } from 'react'
import { forgotPassword } from '../api';
import { isEmail } from '../utils/validation';
import { SuccessMsg, ErrorMsg } from './alerts';

const ForgotPassword = () => {

  const [formData, setFormData] = useState({
    email: "",
    success: "",
    error: ""
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value, error: "", success: "" });
  }

  const handleSubmit = async e => {
    e.preventDefault();
    if (!isEmail(formData.email)) {
      return setFormData({ ...formData, error: "Invalid email", success: "" });
    }

    try {
      const data = await forgotPassword(formData.email);
      return setFormData({ ...formData, error: "", success: data.msg });
    }
    catch (error) {
      error && setFormData({ ...formData, error: error, success: "" });
    }

  }

  const { success, error } = formData;

  return (
    <div className='forgot-password'>
      <h2>Forgot your Password?</h2>
      <div className="row">
        {success && <SuccessMsg msg={success} />}
        {error && <ErrorMsg msg={error} />}

        <label htmlFor="email">Enter your email address</label>
        <input type="email" id="email" name='email' value={formData.email} onChange={handleChange} />
        <button onClick={handleSubmit}>Verify your email</button>
      </div>
    </div>
  )
}

export default ForgotPassword