import { Model, model, Schema, SchemaTypes } from "mongoose";
import { IClubDocument } from "../types/document";

const DocumentSchema = new Schema<IClubDocument>({
  name: {
    type: SchemaTypes.String,
    required: true,
  },
  link: {
    type: SchemaTypes.String,
    required: true,
  },
  club_id: SchemaTypes.ObjectId,
})

const ClubDocument = model('document', DocumentSchema) as Model<IClubDocument>

export default ClubDocument