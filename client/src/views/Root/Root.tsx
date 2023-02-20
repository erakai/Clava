import { BrowserRouter, Route, Routes } from "react-router-dom"

import Main from '../Main'
import Members from "../Members"

function Root() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Main />} />
        <Route path="members" element={<Members />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Root
