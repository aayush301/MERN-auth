export const getLoginAction = () => {
  return {
    type: "LOGIN"
  }
}

export const getSaveTokenAction = (accessToken) => {
  return {
    type: "SAVE_TOKEN",
    payload: accessToken
  }
}

export const getSaveProfileAction = (user) => {
  return {
    type: "SAVE_PROFILE",
    payload: user
  }
}