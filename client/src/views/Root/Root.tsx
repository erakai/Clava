import { BrowserRouter, Route, Routes } from "react-router-dom"

import Main from '../Main'
import ClubPage from '../ClubPage'

function Root() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<ClubPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Root
