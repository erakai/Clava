import axios from 'axios'
import { AuthResponse, Token } from './config';
import { intercepts } from './config';
import { getRefreshToken } from "./userApi"

export type GetEventsResponse = { events: Event[] }
export type CreateEventResponse = { event: Event }
export type DeleteEventResponse = {}

const EventInstance = axios.create({
  baseURL: `http://localhost:8080/events`,
  timeout: 1000,
  withCredentials: true,
})

/* Very important - embeds tokens! */
intercepts(EventInstance, getRefreshToken)

export const _createEvent = ({ name, description, date, club_id }: CreateEventRequest) => {
  if (!description) {
    return EventInstance.post<CreateEventResponse>('/', { name, date, club_id })
  } 
  return EventInstance.post<CreateEventResponse>('/', { name, description, date, club_id })
}

export const _getEvents = (club_id: string) => {
  return EventInstance.get<GetEventsResponse>('/', { params: { club_id: club_id }})
}

export const _deleteEvents = (event_ids: string[]) => {
  return EventInstance.delete<DeleteEventResponse>('/', { data : { event_ids } })
}
