import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { ClavaNavbar } from '../../components/Navigation'
import DocumentView from '../Documents'
import _404View from '../Error'
import UrlNotFound from '../Error/UrlNotFound'
import EventView from '../Events'
import FinanceView from '../Finances'
import MemberView from '../Members'

export default function ClubCompositie() {
  const { clubId, clubRoute } = useParams<{
    clubId: string
    clubRoute: string
  }>()

  const getRoute = (): JSX.Element => {
    switch (clubRoute) {
      case 'members':
        return <MemberView club_id="5e1a0651741b255ddda996c4" />
      case 'events':
        return <EventView />
      case 'documents':
        return <DocumentView />
      case 'finances':
        return <FinanceView />
      default:
        return <UrlNotFound />
    }
  }

  return (
    <div className="items-center">
      <ClavaNavbar
        currentRoute={clubRoute || 'null'}
        clubId={clubId || 'null'}
        clubName="Bookclub!"
      />
      {getRoute()}
    </div>
  )
}
