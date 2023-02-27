import { BrowserRouter, Route, Routes } from 'react-router-dom'

import ClubComposite from '../ClubComposite'
import ClubPage from '../ClubPage'
import UrlNotFound from '../Error/UrlNotFound'
import Login from '../Login'
import Main from '../Main'
import Test from '../Main/Test'
import Reset from '../Reset'

function Root() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/test" element={<Test />} />
        <Route path="/clubs" element={<ClubPage />} />
        <Route path="/1reset" element={<Reset />} />
        {/* TODO: Add Regex for clubId, clubRoute */}
        <Route path="/:clubId/:clubRoute" element={<ClubComposite />} />
        <Route path="*" element={<UrlNotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Root
