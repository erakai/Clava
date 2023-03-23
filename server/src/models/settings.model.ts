import { model, Model, Schema, SchemaTypes } from "mongoose";
import { ISettings } from "types/settings";

const SettingsSchema = new Schema<ISettings>({
  dense: SchemaTypes.Boolean,
  memberButtonPresetOne: SchemaTypes.String,
  memberButtonPresetTwo: SchemaTypes.String,
  club_id: SchemaTypes.ObjectId,
})

const Settings = model('settings', SettingsSchema) as Model<ISettings>

export default Settings