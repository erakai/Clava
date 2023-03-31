import { model, Model, Schema, SchemaTypes } from "mongoose";
import { ILog } from "../types/log";

const LogSchema = new Schema<ILog>({
  	user_id: SchemaTypes.ObjectId,
	club_id: SchemaTypes.ObjectId,
	method: SchemaTypes.String,
	route: SchemaTypes.String,
	body: SchemaTypes.String,
	date: SchemaTypes.Date
})

const Log = model('log', LogSchema) as Model<ILog>

export default Log