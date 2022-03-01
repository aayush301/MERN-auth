import React from 'react'
import { useState } from 'react';
import { useParams } from 'react-router-dom'
import { resetPassword } from '../api';
import { isMatch, isValidPassword } from '../utils/validation';
import { SuccessMsg, ErrorMsg } from './alerts';

const ResetPassword = () => {
  const { accessToken } = useParams();
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
    success: "",
    error: ""
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value, error: "", success: "" });
  }

  const handleSubmit = async e => {
    e.preventDefault();
    if (!isValidPassword(formData.password)) {
      return setFormData({ ...formData, error: "Password length should be atleast 4", success: "" });
    }

    if (!isMatch(formData.password, formData.confirmPassword)) {
      return setFormData({ ...formData, error: "Passwords are not matching", success: "" });
    }

    try {
      const data = await resetPassword(formData.password, accessToken);
      return setFormData({ ...formData, error: "", success: data.msg });
    }
    catch (error) {
      error && setFormData({ ...formData, error: error, success: "" });
    }

  }

  const { success, error } = formData;

  return (
    <div className='forgot-password'>
      <h2>Reset your Password</h2>
      <div className="row">
        {success && <SuccessMsg msg={success} />}
        {error && <ErrorMsg msg={error} />}

        <label htmlFor="password">Enter new password</label>
        <input type="password" id="password" name='password' value={formData.password} onChange={handleChange} />

        <label htmlFor="confirm-password">Confirm password</label>
        <input type="password" id="confirm-password" name='confirmPassword' value={formData.confirmPassword} onChange={handleChange} />
        <button onClick={handleSubmit}>Reset password</button>
      </div>
    </div>
  )
}

export default ResetPassword