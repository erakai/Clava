import { Document } from "mongoose"

interface ILog extends Document {
	user_id : number,
	club_id : number,
	method : string,
	route : string,
	body : string
}