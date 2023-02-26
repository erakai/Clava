import { BrowserRouter, Route, Routes } from "react-router-dom"

import Main from '../Main'
import Login from '../Login'
import Test from "../Main/Test"
import ClubPage from '../ClubPage'
import MemberView from "../Members"
import EventView from "../Events"
import DocumentView from "../Documents"
import FinanceView from "../Finances";
import Reset from "../Reset";
import ClubComposite from "../ClubComposite"

function Root() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/test" element={<Test />} /> 
        <Route path="/clubs" element={<ClubPage />} />
        <Route path="/reset" element={<Reset />} />
        {/*TODO: Add Regex for clubId, clubRoute*/}
        <Route path="/:clubId/:clubRoute" element={<ClubComposite />} />
      </Routes>
    </BrowserRouter>
  ) 
}

export default Root