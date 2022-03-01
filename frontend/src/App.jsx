import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { getProfile, renewAccessToken } from "./api";
import { getLoginAction, getSaveProfileAction, getSaveTokenAction } from "./redux/actions";
import AccountActivation from "./components/AccountActivation";
import Dashboard from "./components/Dashboard";
import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";

function App() {

  const authState = useSelector(state => state.authReducer);
  const tokenState = useSelector(state => state.tokenReducer);
  const dispatch = useDispatch();

  useEffect(async () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn) {
      const data = await renewAccessToken();
      dispatch(getSaveTokenAction(data.accessToken));
    }
  }, [authState.isLoggedIn]);


  useEffect(async () => {
    if (tokenState) {
      dispatch(getLoginAction());
      const data = await getProfile(tokenState);
      dispatch(getSaveProfileAction(data.user));
    }
  }, [tokenState]);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/activate-account/:activationToken" element={<AccountActivation />} />
        <Route path="/auth/forgot-password" element={<ForgotPassword />} />
        <Route path="/auth/reset-password/:accessToken" element={<ResetPassword />} />
        <Route path="/dashboard" element={authState.isLoggedIn && authState.user.email ? <Dashboard /> : ""} />
        <Route path="/profile" element={authState.isLoggedIn && authState.user.email ? <Profile /> : ""} />
      </Routes>
    </BrowserRouter>
  );

}

export default App
