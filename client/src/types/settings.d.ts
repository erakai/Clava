interface Settings {
  _id: string,
  club_id: string,
  dense: boolean,
  memberButtonPresetOne: string,
  memberButtonPresetTwo: string,
}

interface UpdateSettingsRequest {
  club_id: string,
  dense: boolean,
  memberButtonPresetOne: string,
  memberButtonPresetTwo: string,
}