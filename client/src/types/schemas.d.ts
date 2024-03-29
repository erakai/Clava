interface User {
  _id: string,
  name: string,
  email: string,
  club_ids: Array<string>
}

interface UserRequest {
  email: string
  password: string
  name?: string
}

interface UserResetRequest {
  email: string
}

interface UserChangePasswordRequest {
  user_id: string
  password: string
}

interface Member {
  _id: string,
  name: string,
  email: string,
  expiration?: number,
  club_id: string,
  tag_ids: Array<string> 
}

interface MemberRequest {
  name: string,
  email: string,
  expiration?: number,
  club_id: string,
}

interface MemberUpdateRequest {
  name: string,
  email: string,
  member_id: string
}

interface Tag {
  _id: string,
  name: string,
  color: string,
}

interface CreateTagRequest {
  name: string,
  color: string,
  club_id: string,
}

interface EditTagRequest {
  newName: string,
  newColor: string,
  _id: string,
}

interface DeleteTagRequest {
  _id: string,
}

interface DeleteTagFromMemberRequest {
  tag_id: string
  member_id: string
}

interface AddTagToMemberRequest {
  tag_id: string
  member_ids: string[]
}

interface Officer {
  _id: string,
  name: string,
  email: string,
  expiration?: number,
  club_id: string,
  user_id: string,
  role_ids: Array<string> 
}

interface AddOfficerRequest {
  name: string,
  email: string,
  club_id: string
}

interface Role {
  _id: string,
  name: string,
  color: string,
}


interface Reimbursement {
  _id: string,
  name: string,
  amount: number,
  creditor: string,
  link: string,
  paid: boolean,
  club_id: string
}

interface CreateReimbursementRequest {
  name: string,
  amount: number,
  creditor: string,
  link: string,
  paid: boolean,
  club_id: string
}

interface EditReimbursementRequest {
  _id: string,
  name: string,
  amount: number,
  creditor: string,
  link: string,
  paid: boolean,
  club_id: string
}

interface ClubDocument {
  _id: string,
  name: string,
  link: string,
  club_id: string
  role_ids: Array<string> // should actually be permisions
}

interface AddDocumentRequest {
  name: string,
  link: string,
  club_id: string,
  //role_ids: Array<string> // should actually be permisions
}

interface DeleteDocumentRequest {
  _id: string,
}

interface GetSingleDocumentRequest {
  _id: string,
}

interface EditDocumentRequest {
  newName: string,
  newLink: string,
  _id: string,
}

interface GetDocumentRolesRequest {
  _id: string
}

interface AddDeleteDocumentRoleRequest {
  _id: string,
  role_id: string
}

interface Event {
  _id: string,
  name: string,
  date: Date,
  description: string,
  attendance: number,
  club_id: string
}

interface CreateEventRequest {
  name: string,
  date?: Date,
  description: string,
  club_id: string
}

interface SendEventScheduleRequest {
  header?: string,
  date?: Date,
  club_id: string
}

interface IncrementEventAttendanceRequest {
  _id: string
}

interface MassCreateEventRequest {
  name: string,
  description?: string,
  start_date: Date,
  end_date: Date,
  days: string[],
  club_id: string
}

interface NotifyMembersElectionRequest {
  message: string,
  club_id: string
}

interface Log {
  _id : string,
  user_id : string,
  club_id : string,
  method : string,
  route : string,
  body : string,
  date : Date
}
