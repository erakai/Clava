import { Document } from "mongoose"

interface IOfficer extends Document {
	name: string,
	expiration: Date,
	club_id : number
	role_ids: Array<number>
}