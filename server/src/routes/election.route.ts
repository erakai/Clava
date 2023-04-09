import { Router } from "express";
import { getElections, postElection, removeElection } from "../controllers/election.controller";
import { verifyUser } from "../config/auth";

const electionRouter = Router()

/*
Election Routes:
  - /elections GET (club id): returns all elections for a club
  - /elections POST (election, new election info): update election
  - /elections POST (all election info): create election
  - /elections DELETE (election_ids): deletes elecltions
*/

electionRouter.get('/', verifyUser, getElections)
electionRouter.post('/', verifyUser, postElection)
electionRouter.delete('/', verifyUser, removeElection)

export default electionRouter