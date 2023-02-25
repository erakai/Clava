import { BrowserRouter, Route, Routes } from "react-router-dom"

import Main from '../Main'
import Login from '../Login'
import Test from "../Main/Test"
import ClubPage from '../ClubPage'
import MemberView from "../Members"
import EventView from "../Events"
import DocumentView from "../Documents"
import Finances from "../Finances";
import Reset from "../Reset"
import FinanceView from "../Finances"

function Root() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/test" element={<Test />} />
        <Route path="/clubs" element={<ClubPage />} />
        <Route path="/members" element={<MemberView />} />
        <Route path="/events" element={<EventView />} />
        <Route path="/documents" element={<DocumentView />} />
        <Route path="/finances" element={<FinanceView />} />
        <Route path="/reset" element={<Reset />} /> 
      </Routes>
    </BrowserRouter>
  )
}

export default Root