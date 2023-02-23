import { BrowserRouter, Route, Routes } from "react-router-dom"

import Main from '../Main'
import Members from "../Members"
import Login from '../Login'
import ResetRequest from "../RestRequest";
import Reset from "../Reset"

function Root() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Main />} />
        <Route path="members" element={<Members />} />
        <Route path="/" element={<Main />} />
        <Route path="login" element={<Login />} />
        <Route path="resetrequest" element={<ResetRequest />} />
        <Route path="reset" element={<Reset />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Root