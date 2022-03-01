import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updatePassword, updateProfile } from '../api';
import { getSaveProfileAction } from '../redux/actions';
import { isMatch, isValidPassword } from '../utils/validation';
import { ErrorMsg, SuccessMsg } from './alerts';

const Profile = () => {

  const authState = useSelector(state => state.authReducer);
  const tokenState = useSelector(state => state.tokenReducer);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: authState.user.name,
    password: "",
    confirmPassword: "",
    success: "",
    error: ""
  });

  const { user } = authState;

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleProfileUpdate = async e => {
    try {
      setLoading(true);
      const data = await updateProfile(formData.name, tokenState);
      setFormData(formData => ({ ...formData, success: data.msg }));
      setLoading(false);
    }
    catch (error) {
      error && setFormData({ ...formData, error });
    }
  }

  const handlePasswordUpdate = async e => {
    if (!isValidPassword(formData.password)) {
      return setFormData(formData => ({ ...formData, error: "Password must be atleast 4 characters.." }));
    }
    if (!isMatch(formData.password, formData.confirmPassword)) {
      return setFormData(formData => ({ ...formData, error: "Passwords are not matching.." }));
    }

    try {
      setLoading(true);
      const data = await updatePassword(formData.password, tokenState);
      setFormData(formData => ({ ...formData, success: data.msg }));
      setLoading(false);
    }
    catch (error) {
      error && setFormData({ ...formData, error });
    }
  }

  const handleSubmit = async e => {
    handleProfileUpdate();
    if (formData.password) handlePasswordUpdate();
    dispatch(getSaveProfileAction({ name: formData.name }));
  }


  return (
    <>
      {formData.success && <SuccessMsg msg={formData.success} />}
      {formData.error && <ErrorMsg msg={formData.error} />}
      {loading && <h3>Loading...</h3>}

      <div className='profile-page'>
        <h2>{user.role == "admin" ? "Admin profile" : "User Profile"}</h2>

        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id='name' defaultValue={authState.user.name} placeholder='Your name' onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id='email' defaultValue={authState.user.email} placeholder='Your email address' disabled />
        </div>

        <div className="form-group">
          <label htmlFor="password">New Password</label>
          <input type="password" name="password" id='password' value={formData.password} placeholder='Enter new password' onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input type="password" name="confirmPassword" id='confirm-password' value={formData.confirmPassword} placeholder='Enter password again' onChange={handleChange} />
        </div>

        <button disabled={loading} onClick={handleSubmit}>Update Profile</button>
      </div>
    </>

  )
}

export default Profile