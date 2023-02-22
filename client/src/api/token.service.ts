// retrieves the refresh token from user object that is in local storage
const getLocalRefreshToken = () => {
  const user = JSON.parse(localStorage.getItem("user") || '{}')
  return user?.refreshToken
}

// retrieves the access token from user object that is in local storage
const getLocalAccessToken = () => {
  const user = JSON.parse(localStorage.getItem("user") || '{}')
  return user?.accessToken
}

// set the access token of the user object in local storage to the one passed in
const updateLocalAccessToken = (token: string) => {
  let user = JSON.parse(localStorage.getItem("user") || '{}')
  user.accessToken = token
  localStorage.setItem("user", JSON.stringify(user))
}

// returns the user object that is in local storage
const getUser = () => {
  return JSON.parse(localStorage.getItem("user") || '{}')
}

// sets the user stored in the local storage to the one passed in
const setUser = (user: any) => {
  // for debugging purposes
  console.log(JSON.stringify(user));
  localStorage.setItem("user", JSON.stringify(user))
}

// removes the user stored in local storage
const removeUser = () => {
  localStorage.removeItem("user");
}

const TokenService = {
  getLocalRefreshToken,
  getLocalAccessToken,
  updateLocalAccessToken,
  getUser,
  setUser,
  removeUser,
}

export default TokenService