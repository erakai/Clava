import { BrowserRouter, Route, Routes } from "react-router-dom"

import Main from '../Main'
import Login from '../Login'
import Test from "../Main/Test"
import ClubPage from '../ClubPage'
import MemberView from "../Members"
import Reset from "../Reset"

function Root() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/clubs" element={<ClubPage />} />
        <Route path="/members" element={<MemberView />} />
        <Route path="/reset" element={<Reset />} /> 
        <Route path="/test" element={<Test />} /> 
      </Routes>
    </BrowserRouter>
  )
}

export default Root