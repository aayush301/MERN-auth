import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { postLoginData, postRegisterData } from '../api';
import { isEmail, isEmpty, isMatch, isValidPassword } from '../utils/validation';
import { SuccessMsg, ErrorMsg } from "./alerts"


const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    success: "",
    error: ""
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = async e => {
    e.preventDefault();

    if (isEmpty(formData.name) || isEmpty(formData.email) || isEmpty(formData.password) || isEmpty(formData.confirmPassword)) {
      return setFormData({ ...formData, error: "Please fill in all fields..", success: "" });
    }

    if (!isEmail(formData.email)) {
      return setFormData({ ...formData, error: "Invalid Email..", success: "" });
    }

    if (!isValidPassword(formData.password)) {
      return setFormData({ ...formData, error: "Password must be atleast 4 characters..", success: "" });
    }

    if (!isMatch(formData.password, formData.confirmPassword)) {
      return setFormData({ ...formData, error: "Passwords are not matching..", success: "" });
    }

    try {
      const { name, email, password } = formData;
      const data = await postRegisterData({ name, email, password });
      setFormData({ ...formData, error: "", success: data.msg });

    }
    catch (error) {
      error && setFormData({ ...formData, error, success: "" });
    }
  }

  return (
    <div className='login-page'>
      <h2>Register</h2>
      {formData.success && <SuccessMsg msg={formData.success} />}
      {formData.error && <ErrorMsg msg={formData.error} />}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" value={formData.name} placeholder='Enter name' onChange={handleChange} required />
        </div>

        <div>
          <label htmlFor="email">Email Address</label>
          <input type="text" id="email" name="email" value={formData.email} placeholder='Enter email address' onChange={handleChange} required />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" value={formData.password} placeholder='Enter password' onChange={handleChange} required />
        </div>

        <div>
          <label htmlFor="confirm-password">Confirm Password</label>
          <input type="password" id="confirm-password" name="confirmPassword" value={formData.confirmPassword} placeholder='Enter password again' onChange={handleChange} required />
        </div>

        <div className="row">
          <button type='submit'>Register</button>
        </div>
      </form>

      <p>Already have an account? <Link to="/auth/login">Login</Link></p>

    </div>
  )
}

export default Register;