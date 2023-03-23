interface Settings {
  _id: string,
  club_id: string,
  dense: boolean,
  memberButtonPresetOne: string,
  memberButtonPresetTwo: string,
  memberButtonLabelOne: string,
  memberButtonLabelTwo: string,
}

interface UpdateSettingsRequest {
  club_id: string,
  dense?: boolean,
  memberButtonPresetOne?: string,
  memberButtonPresetTwo?: string,
  memberButtonLabelOne?: string,
  memberButtonLabelTwo?: string,
}

interface GetSettingsRequest {
  club_id: string
}