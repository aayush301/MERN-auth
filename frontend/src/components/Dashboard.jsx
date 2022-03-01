import React from 'react'
import { useSelector } from 'react-redux'

const Dashboard = () => {

  const authState = useSelector(state => state.authReducer);
  return (
    <div style={{ textAlign: "center", fontSize: "20px" }}>
      <div>Welcome to your personal Dashboard</div>
      <div>{authState.user.name}</div>
    </div>
  )
}

export default Dashboard