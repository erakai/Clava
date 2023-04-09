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
  start: Date,
  end: Date,
  questions: Array<string>,
  candidates: Array<ICandidate>
}