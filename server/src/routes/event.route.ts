import { verifyUser } from "../config/auth";
import { getClubs, getClub, createClub, addClubToUser, removeClubFromUser } from "../controllers/club.controller";
import { Router } from "express";
import {createEvent, getEvents, deleteEvents, incrementAttendance, getEvent, sendSchedule} from "../controllers/event.controller";

const eventRouter = Router()

/*
Event Routes:
  - /events GET (club id): returns all events for a club
  - /events POST (name, description, date, club id): creates a new event and returns it
*/

eventRouter.get('/', verifyUser, getEvents)
eventRouter.get('/single', verifyUser, getEvent)
eventRouter.post('/', verifyUser, createEvent)
eventRouter.delete('/', verifyUser, deleteEvents)
eventRouter.post('/increment/', incrementAttendance)
eventRouter.post('/sendSchedule/', sendSchedule)


export default eventRouter