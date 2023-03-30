 import { Model, model, Schema, SchemaTypes } from "mongoose";
import { ITag } from "types/tag";

const TagSchema = new Schema<ITag>({
  club_id: SchemaTypes.ObjectId,
  name: {
    type: SchemaTypes.String,
    required: true,
  },
  color: {
    type: SchemaTypes.String,
    default: "#000000"
  }
})

const Tag = model('tag', TagSchema) as Model<ITag>

export default Tag