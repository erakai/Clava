import to from 'await-to-js'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { getClub } from '../../api/clubApi'

import { ClavaNavbar } from '../../components/Navigation'
import useUser from '../../hooks/useUser'
import DocumentView from '../Documents'
import UrlNotFound from '../Error/UrlNotFound'
import { BadRequest, RestrictedAccess, DefaultError } from '../Error'
import { AxiosError } from 'axios'
import EventView from '../Events'
import FinanceView from '../Finances'
import MemberView from '../Members'
import { Settings } from '../Settings'
import { Typography } from '@mui/material'
import ActivityLogView from '../ActivityLog'

export default function ClubComposite() {
  const { state, user, logout } = useUser()
  const { clubId, clubRoute } = useParams<{
    clubId: string
    clubRoute: string
  }>()

  const [clubName, setClubName] = useState('')
  const [clubOwnerId, setClubOwner] = useState('')
  const [clubLoadCode, setClubLoadCode] = useState('Loading')

  useEffect(() => {
    const fetchClub = async () => {
      if (clubId) {
        const [err, res] = await to(getClub(clubId))
        if (err instanceof AxiosError) {
          setClubName("FAILED TO GET CLUB")
          var status_code = "Loading"
          if (err.response) {
            status_code = err.response.status.toString();
          }
          setClubLoadCode(status_code)
          return
        }

        if (!res) {
          setClubLoadCode('400')
          return
        }

        const retrieved = res.data.club
        if (retrieved) {
          setClubName(retrieved.name)
          setClubOwner(retrieved.owner_id)
          setClubLoadCode('200')
        }
      }
    }
    fetchClub()
  }, [])

  const getRoute = (): JSX.Element => {
    if (!clubId) return <UrlNotFound />
    if (clubLoadCode != '200') { 
      switch (clubLoadCode) {
        case 'Loading':
          return <div><Typography>Loading...</Typography></div>
        case '400':
          return <BadRequest />
        case '403':
          return <RestrictedAccess />
        default:
          return <DefaultError />
      }
    }

    switch (clubRoute) {
      case 'members':
        return <MemberView club_id={clubId} state={state} user_id={(user) ? user._id : ""} owner_id={clubOwnerId} />
      case 'events':
        return <EventView club_id={clubId}/>
      case 'documents':
        if (user == null) {
          return <DocumentView club_id={clubId} state={state} />
        }
        return <DocumentView club_id={clubId} state={state} />
      case 'finances':
        return <FinanceView club_id={clubId}/>
      case 'settings':
        return <Settings clubName={clubName} club_id={clubId}/>
      case 'log':
        if (user) {
          return <ActivityLogView
            isOwner={(user._id) == clubOwnerId} 
            club_id={clubId}
           />
        } else {
          return <div>Loading</div>
        }
      default:
        return <UrlNotFound />
    }
  }

  return (
    <div className="items-center">
      {user && clubLoadCode == '200' &&
      <div>
        <ClavaNavbar
          currentRoute={clubRoute || 'null'}
          clubId={clubId || 'null'}
          clubName={clubName} logout={logout}
          username={user.name || 'loading'}
          email={user.email || 'loading'}
          isOwner={user._id == clubOwnerId}
        />
      </div>
      }
      {getRoute()}
    </div>
  )
}
