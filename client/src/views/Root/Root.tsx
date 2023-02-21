import { BrowserRouter, Route, Routes } from "react-router-dom"

import Main from '../Main'
import Reset from '../Reset'
import Login from '../Login'
import Register from '../Register'
function Root() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="reset" element={<Reset />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Root