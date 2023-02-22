import { BrowserRouter, Route, Routes } from "react-router-dom"

import Main from '../Main'
import ClubPage from '../ClubPage'
import Reset from '../Reset'
import Login from '../Login'

function Root() {
  return (
    <BrowserRouter>
      <Routes>
        <ClubPage></ClubPage>
      </Routes>
    </BrowserRouter>
  )
}

export default Root