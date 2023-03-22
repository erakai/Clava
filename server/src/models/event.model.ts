import { Model, model, Schema, SchemaTypes } from "mongoose";
import {IEvent} from "../types/event";

const EventSchema = new Schema<IEvent>({
  event_id: SchemaTypes.ObjectId,
  name: {
    type: SchemaTypes.String, 
    required: true,
  },
  date: SchemaTypes.Date,
  started: SchemaTypes.Boolean,
  description: SchemaTypes.String,
  attendance: SchemaTypes.Number
})

const Event = model('event', EventSchema) as Model<IEvent>

export default Event