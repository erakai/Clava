import { BrowserRouter, Route, Routes } from "react-router-dom"

import Main from '../Main'
import Members from "../Members"
import ResetRequest from '../Reset'
import Login from '../Login'

function Root() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Main />} />
        <Route path="members" element={<Members />} />
        <Route path="/" element={<Main />} />
        <Route path="login" element={<Login />} />
        <Route path="resetrequest" element={<ResetRequest />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Root