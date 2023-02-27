import { Model, model, Schema, SchemaTypes } from "mongoose";
import { IRole } from "types/role";

const RoleSchema = new Schema<IRole>({
  name: {
    type: SchemaTypes.String, 
    required: true,
  },
  color: {
    type: SchemaTypes.String,
    default: "#000000"
  },
  perms: [SchemaTypes.String],
})

const Role = model('role', RoleSchema) as Model<IRole>

export default Role