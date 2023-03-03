interface Role {
  _id: string,
  name: string,
  color: string,
  perms: Array<string>
  club_id: string
}

interface RoleRequest {
  name: string,
  color: string,
  perms: Array<string>
  club_id: string
}

interface RoleDeleteRequest {
  _id: string
}