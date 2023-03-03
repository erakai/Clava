import axios from "axios"
import { intercepts } from "./config"
import { getRefreshToken } from "./userApi"

type GetRolesResponse = { roles: Role[] }
type CreateRoleResponse = { role: Role }
type DeleteRoleResponse = { role: Role }


const RoleInstance = axios.create({
  baseURL: `http://localhost:8080/clubs`,
  timeout: 1000,
  withCredentials: true,
})

intercepts(RoleInstance, getRefreshToken)

export const getRoles = (club_id: string) => {
  return RoleInstance.get<GetRolesResponse>('/roles', { params: { club_id: club_id }})
}

export const createRole = ({ name, color, perms, club_id }: RoleRequest) =>  {
  return RoleInstance.post<CreateRoleResponse>('/roles', { name, color, perms, club_id })
}

export const deleteRole = ({ _id }: RoleDeleteRequest) =>  {
  return RoleInstance.delete<DeleteRoleResponse>('/roles', { data: { _id }})
}