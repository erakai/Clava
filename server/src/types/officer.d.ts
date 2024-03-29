import { Document } from "mongoose"

interface IOfficer extends Document {
	name: string,
	email: string,
	expiration: Date,
	club_id : number
	user_id : number
	role_ids: Array<number>
}