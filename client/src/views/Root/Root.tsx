import { BrowserRouter, Route, Routes } from "react-router-dom"

import Main from '../Main'
import ClubPage from '../ClubPage'
import Members from "../Members"
import MemberView from "../Members"
import Reset from '../Reset'
import Login from '../Login'

function Root() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/clubs" element={<ClubPage />} />
        <Route path="/members" element={<MemberView />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset" element={<Reset />} /> 
      </Routes>
    </BrowserRouter>
  )
}

export default Root