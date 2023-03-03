interface Role {
  _id: string,
  name: string,
  color: string,
  perms: [string]
}

interface RoleRequest {
  name: string,
  color: string,
  perms: [string]
}