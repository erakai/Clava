import to from 'await-to-js'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { getClub } from '../../api/clubApi'

import { ClavaNavbar } from '../../components/Navigation'
import useUser from '../../hooks/useUser'
import DocumentView from '../Documents'
import _404View from '../Error'
import UrlNotFound from '../Error/UrlNotFound'
import EventView from '../Events'
import FinanceView from '../Finances'
import MemberView from '../Members'

export default function ClubCompositie() {
  const { state, user, logout } = useUser()
  const { clubId, clubRoute } = useParams<{
    clubId: string
    clubRoute: string
  }>()

  const [clubName, setClubName] = useState('')

  useEffect(() => {
    const fetchClub = async () => {
      if (clubId) {
        const [err, res] = await to(getClub(clubId))
        if (err) {
          console.log(err)
          setClubName("FAILED TO GET CLUB")
          return
        }

        const retrieved = res.data.club
        console.log(retrieved)
        if (retrieved) {
          setClubName(retrieved.name)
        }
      }

    }

    fetchClub()
  }, [])

  const getRoute = (): JSX.Element => {
    if (!clubId) return <UrlNotFound />

    switch (clubRoute) {
      case 'members':
        return <MemberView club_id={clubId} state={state} />
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
        clubName={clubName} logout={logout}
      />
      {getRoute()}
    </div>
  )
}
