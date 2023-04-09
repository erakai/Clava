import { Model, Schema, SchemaTypes, model } from "mongoose";
import { ICandidate, IElection } from "../types/elections";

const CandidateSchema = new Schema<ICandidate>({
  name: SchemaTypes.String,
  description: SchemaTypes.String,
  answers: [SchemaTypes.String]
}) 

const ElectionSchema = new Schema<IElection>({
  name: SchemaTypes.String,
  club_id: SchemaTypes.ObjectId,
  description: SchemaTypes.String,
  start: SchemaTypes.Date,
  end: SchemaTypes.Date,
  questions: [SchemaTypes.String],
  candidates: [CandidateSchema]
})

const Election = model('election', ElectionSchema) as Model<IElection>

export default Election