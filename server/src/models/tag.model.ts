import { Model, model, Schema, SchemaTypes } from "mongoose";
import { ITag } from "types/tag";

const TagSchema = new Schema<ITag>({
  tag_id: SchemaTypes.Number,
  name: {
    type: SchemaTypes.String,
    required: true,
  },
  color: SchemaTypes.String
})

const Tag = model('tag', TagSchema) as Model<ITag>

export default Tag