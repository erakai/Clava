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

  const [clubOwnerId, setClubOwner] = useState('')

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
        if (retrieved) {
          setClubName(retrieved.name)
          setClubOwner(retrieved.owner_id)
        }
      }

    }

    fetchClub()
  }, [])

  const getRoute = (): JSX.Element => {
    if (!clubId) return <UrlNotFound />

    switch (clubRoute) {
      case 'members':
        if (user == null) {
          return <MemberView club_id={clubId} state={state} user_id={""} owner_id={clubOwnerId} />
        }
        return <MemberView club_id={clubId} state={state} user_id={user._id} owner_id={clubOwnerId} />
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
      {user && 
      <ClavaNavbar
        currentRoute={clubRoute || 'null'}
        clubId={clubId || 'null'}
        clubName={clubName} logout={logout}
        username={user.name || 'loading'}
        email={user.email || 'loading'}
      />
      }
      {getRoute()}
    </div>
  )
}
