import { Router } from "express";
import { getElections, postElection, removeElection } from "../controllers/election.controller";
import { verifyUser } from "../config/auth";

const electionRouter = Router()

/*
Election Routes:
  - /elections GET (club_id): returns all elections for a club
  - /elections POST (election_id, election: {new info}): update election
  - /elections POST (election: {all info}): create election
  - /elections DELETE (election_ids): deletes elections
*/

electionRouter.get('/', verifyUser, getElections)
electionRouter.post('/', verifyUser, postElection)
electionRouter.delete('/', verifyUser, removeElection)

export default electionRouter