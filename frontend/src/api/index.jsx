import axios from "axios"

// const url = "http://localhost:5000";
const url = "";


export const postRegisterData = async (formData) => {
  try {
    const { name, email, password } = formData;
    const res = await axios.post(`${url}/api/auth/register`, { name, email, password });
    return Promise.resolve(res.data);
  }
  catch (err) {
    return Promise.reject(err.response?.data?.msg);
  }
}

export const postLoginData = async (formData) => {
  try {
    const { email, password } = formData;
    const res = await axios.post(`${url}/api/auth/login`, { email, password });
    return Promise.resolve(res.data);
  }
  catch (err) {
    return Promise.reject(err.response?.data?.msg);
  }
}


export const activateAccount = async (activationToken) => {
  try {
    const res = await axios.post(`${url}/api/auth/activate-account`, { activationToken });
    return Promise.resolve(res.data);
  }
  catch (err) {
    return Promise.reject(err.response?.data?.msg);
  }
}

export const renewAccessToken = async () => {
  try {
    const res = await axios.post(`${url}/api/auth/renew-access-token`, null);
    return Promise.resolve(res.data);
  }
  catch (err) {
    return Promise.reject(err.response?.data?.msg);
  }
}

export const logoutUser = async () => {
  try {
    const res = await axios.get(`${url}/api/auth/logout`);
    return Promise.resolve(res.data);
  }
  catch (err) {
    return Promise.reject(err.response?.data?.msg);
  }
}

export const forgotPassword = async (email) => {
  try {
    const res = await axios.post(`${url}/api/auth/forgot-password`, { email });
    return Promise.resolve(res.data);
  }
  catch (err) {
    return Promise.reject(err.response?.data?.msg);
  }
}

export const resetPassword = async (password, accessToken) => {
  try {
    const res = await axios.post(`${url}/api/auth/reset-password`, { password }, {
      headers: { Authorization: accessToken }
    });
    return Promise.resolve(res.data);
  }
  catch (err) {
    return Promise.reject(err.response?.data?.msg);
  }
}

export const getProfile = async (accessToken) => {
  try {
    const res = await axios.get(`${url}/api/profile`, {
      headers: { Authorization: accessToken }
    });
    return Promise.resolve(res.data);
  }
  catch (err) {
    return Promise.reject(err.response?.data?.msg);
  }
}

export const updateProfile = async (name, accessToken) => {
  try {
    const res = await axios.put(`${url}/api/profile`, { name }, {
      headers: { Authorization: accessToken }
    });
    return Promise.resolve(res.data);
  }
  catch (err) {
    return Promise.reject(err.response?.data?.msg);
  }
}

export const updatePassword = async (password, accessToken) => {
  try {
    const res = await axios.post(`${url}/api/auth/reset-password`, { password }, {
      headers: { Authorization: accessToken }
    });
    return Promise.resolve(res.data);
  }
  catch (err) {
    return Promise.reject(err.response?.data?.msg);
  }
}