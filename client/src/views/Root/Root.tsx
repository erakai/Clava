import { BrowserRouter, Route, Routes } from "react-router-dom"

import Main from '../Main'
import Login from '../Login'

function Root() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Root
