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

interface CanRes { // Candidate Results Interface
  _id: string,
  name: string,
  votes: number
}

interface EleRes { // Election Results
  id: string,
  election_id: string,
  name: string,
  candidates: Array<CanRes>
}