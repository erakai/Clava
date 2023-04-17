import { Router } from "express";
import { getElectionById, getElections, postElection, removeElection } from "../controllers/election.controller";
import { verifyUser } from "../config/auth";
import { getResults, vote } from "../controllers/electionresults.controller";

const electionRouter = Router()

/*
Election Routes:
  - /elections GET (club_id): returns all elections for a club
  - /elections POST (election_id, election: {new info}): update election
  - /elections POST (election: {all info}): create election
  - /elections DELETE (election_ids): deletes elections

  - /elections/id GET (election_id): returns the election with the id

  - /elections/votes GET (election_id): returns the corresponding election results
  - /elections/votes POST (election_id, candidate name, amount): updates votes for that candidate
*/

electionRouter.get('/', getElections)
electionRouter.post('/', verifyUser, postElection)
electionRouter.delete('/', verifyUser, removeElection)

electionRouter.get('/id', getElectionById)

electionRouter.get('/votes', verifyUser, getResults)
electionRouter.post('/votes', vote)

export default electionRouter