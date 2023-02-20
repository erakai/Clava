import { BrowserRouter, Route, Routes } from "react-router-dom"

import Main from '../Main'
import Reset from '../Reset'

function Root() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Main />} />
          <Route path="reset" element={<Reset />} />v
      </Routes>
    </BrowserRouter>
  )
}

export default Root