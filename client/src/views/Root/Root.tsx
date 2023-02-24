import { BrowserRouter, Route, Routes } from "react-router-dom"

import Main from '../Main'
import Login from '../Login'
import Test from "../Main/Test"

function Root() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Root