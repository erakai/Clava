import { Model, model, Schema, SchemaTypes } from "mongoose";
import { IDocument } from "types/document";

const DocumentSchema = new Schema<IDocument>({
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

const Document = model('document', DocumentSchema) as Model<IDocument>

export default Document