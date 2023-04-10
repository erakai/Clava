interface Candidate {
  _id: string,
  name: string,
  description: string,
  answers: string[]
}

interface Election {
  _id: string,
  name: string,
  club_id: string,
  description: string,
  start: Date,
  end: Date,
  questions: string[]
  candidates: Candidate[]
}