import { Document } from "mongoose";

interface ICandidate extends Document {
  name: string,
  description: string,
  answers: Array<string>
}

interface IElection extends Document {
  name: string,
  club_id: string,
  description: string,
  running: boolean,
  ended: boolean,
  start: Date,
  end: Date,
  questions: Array<string>,
  candidates: Array<ICandidate>
}

interface ICanRes extends Document { // Candidate Results Interface
  name: string,
  votes: number
}

interface IEleRes extends Document { // Election Results
  election_id: string,
  name: string,
  candidates: Array<ICanRes>
}