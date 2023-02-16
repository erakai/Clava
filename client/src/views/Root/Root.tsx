import { BrowserRouter, Route, Routes } from "react-router-dom"

import Main from 'views/Main'

function Root() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Main />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Root
