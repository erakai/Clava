import { BrowserRouter, Route, Routes } from "react-router-dom"

import Main from '../Main'
import Members from "../Members"
import Reset from '../Reset'
import Login from '../Login'

function Root() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Main />} />
        <Route path="members" element={<Members />} />
        <Route path="/" element={<Main />} />
        <Route path="login" element={<Login />} />
        <Route path="reset" element={<Reset />} /> 
      </Routes>
    </BrowserRouter>
  )
}

export default Root