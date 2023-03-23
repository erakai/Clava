import { Document } from 'mongoose'

interface ISettings extends Document {
  club_id: string,
  dense: boolean,
  memberButtonPresetOne: string,
  memberButtonPresetTwo: string,
}