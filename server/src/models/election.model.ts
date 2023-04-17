import { Model, Schema, SchemaTypes, model } from "mongoose";
import { ICanRes, ICandidate, IEleRes, IElection } from "../types/elections";

const CandidateSchema = new Schema<ICandidate>({
  name: SchemaTypes.String,
  description: SchemaTypes.String,
  answers: [SchemaTypes.String]
}) 

const ElectionSchema = new Schema<IElection>({
  name: SchemaTypes.String,
  club_id: SchemaTypes.ObjectId,
  description: SchemaTypes.String,
  running: {
    type: SchemaTypes.Boolean,
    default: false
  },
  ended: {
    type: SchemaTypes.Boolean,
    default: false
  },
  start: SchemaTypes.Date,
  end: SchemaTypes.Date,
  questions: [SchemaTypes.String],
  candidates: [CandidateSchema]
})

const Election = model('election', ElectionSchema) as Model<IElection>

const CandidateResultsSchema = new Schema<ICanRes>({
  name: SchemaTypes.String,
  votes: SchemaTypes.Number
})

const ElectionResultsSchema = new Schema<IEleRes>({
  election_id: SchemaTypes.ObjectId,
  name: SchemaTypes.String,
  candidates: [CandidateResultsSchema]
})

const ElectionResults = model('electionresults', ElectionResultsSchema) as Model<IEleRes>

export { Election, ElectionResults} 