import { BrowserRouter, Route, Routes } from "react-router-dom"

import Main from '../Main'
import Login from '../Login'
import Test from "../Main/Test"
import ClubPage from '../ClubPage'
import MemberView from "../Members"
import Reset from "../Reset"
import ResetRequest from "../ResetRequest/ResetRequest";

function Root() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/test" element={<Test />} />
        <Route path="/clubs" element={<ClubPage />} />
        <Route path="/members" element={<MemberView />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/resetrequest" element={<ResetRequest />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Root