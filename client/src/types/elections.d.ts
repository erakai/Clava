interface Candidate {
  _id?: string,
  name: string,
  description: string,
  answers: string[]
}

interface Election {
  _id?: string,
  name: string,
  club_id: string,
  description: string,
  running?: boolean,
  ended?: boolean,
  start?: Date,
  end?: Date,
  questions?: string[]
  candidates?: Candidate[]
}

interface ElectionUpdateRequest {
  name?: string,
  club_id?: string,
  description?: string,
  running?: boolean,
  ended?: boolean,
  start?: Date,
  end?: Date,
  questions?: string[]
  candidates?: Candidate[]
}