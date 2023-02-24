import { BrowserRouter, Route, Routes } from "react-router-dom"

import Main from '../Main'
import ClubPage from '../ClubPage'
import MemberView from "../Members"
import Login from '../Login'
import Reset from "../Reset"
import ResetRequest from "../ResetRequest"

function Root() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/clubs" element={<ClubPage />} />
        <Route path="/members" element={<MemberView />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset" element={<Reset />} /> 
        <Route path="/resetrequest" element={<ResetRequest />} /> 
      </Routes>
    </BrowserRouter>
  )
}

export default Root