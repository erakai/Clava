interface Role {
  _id: string,
  name: string,
  color: string,
  perms: Array<string>
}

interface RoleRequest {
  name: string,
  color: string,
  perms: Array<string>
}

interface RoleDeleteRequest {
  _id: string
}