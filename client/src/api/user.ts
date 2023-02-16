import axios from "axios"

const UserInstance = axios.create({
  baseURL: `${process.env.SERVER_URL}/users`,
  timeout: 2000
})

// returns a promise
export const getUsers = () => {
  return UserInstance.get<Array<User>>('/')
}