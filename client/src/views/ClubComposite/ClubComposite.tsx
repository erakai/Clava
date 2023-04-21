import to from 'await-to-js'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
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
import { ElectionView } from '../Elections'
import { ClavaAlertList, createClavaAlert } from '../../components/Alert'
import { getPerms } from '../../api/roleApi'

export let hasPermission = (perm : string) : boolean => {return false}

export function ClubComposite() {
  const { state, user, logout } = useUser()
  const { clubId, clubRoute } = useParams<{
    clubId: string
    clubRoute: string
  }>()

  const [clubName, setClubName] = useState('')
  const [clubOwnerId, setClubOwner] = useState('')
  const [clubLoadCode, setClubLoadCode] = useState('Loading')
  const [userPerms, setUserPerms] = useState<string[]>(['LOADING'])

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
          createClavaAlert("warning", err.message)
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

    const fetchPerms = async () => {
      if (clubId) {
        const [err, res] = await to(getPerms(clubId))
        if (err instanceof AxiosError) {
          createClavaAlert("warning", "Permissions: " + err.message)
        }

        if (!res) {
          return
        }

        const retrieved = res.data.perms
        if (retrieved) {
          setUserPerms(retrieved)
        }
      }
    }

    fetchClub()
    fetchPerms()
  }, [])

  hasPermission = (perm : string) : boolean => {
    var _flag = false // !!!!!! I LOVE TYPESCRIPT !!!
    // WHY WOULD I EVER NEED TO RETURN A BOOLEAN IN MY FOR LOOP???
    userPerms.forEach(_perm => {
      if (_perm === perm || _perm === "OWNER") {
        _flag = true
      }
    })
    return _flag
  } 

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
      case 'elections':
        return <ElectionView club_id={clubId}/>
      case 'settings':
        return <Settings clubName={clubName} club_id={clubId}/>
      case 'log':
        if (user) {
          return <ActivityLogView
            isOwner={(user._id) == clubOwnerId} 
            club_id={clubId}
           />
        } else {
          return <div>Loading...</div>
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
      <ClavaAlertList />
      {userPerms[0] !== 'LOADING' ? // wait till permissions are here
        getRoute()
      :
      <div>
        Loading
      </div>
      }
    </div>
  )
}
