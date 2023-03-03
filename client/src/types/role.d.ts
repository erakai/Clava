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

interface DeleteRoleFromOfficerRequest {
  role_id: string
  officer_id: string
}

interface AddRoleToOfficerRequest {
  role_id: string
  officer_ids: string[]
}
