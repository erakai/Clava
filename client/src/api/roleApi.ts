import axios from "axios"
import { intercepts } from "./config"
import { getRefreshToken } from "./userApi"

type GetRolesResponse = { roles: Role[] }
type CreateRoleResponse = { role: Role }
type DeleteRoleResponse = { role: Role }
type EditRoleResponse = { role: Role }
type DeleteTagFromOfficerResponse = {}
type AddTagToOfficerResponse = {}


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

export const editRole = ({ newName, newColor, _id }: EditRoleRequest) =>  {
  return RoleInstance.put<EditRoleResponse>('/roles', { newName, newColor, _id })
}
 
export const deleteRoleFromOfficer = ({role_id, officer_id}: DeleteRoleFromOfficerRequest) => {
  return RoleInstance.delete<DeleteTagFromOfficerResponse>('/roles/', { data: {role_id, officer_id }})
}

export const addRolesToOfficer = ({role_id, officer_ids}: AddRoleToOfficerRequest) => {
  return RoleInstance.post<AddTagToOfficerResponse>('/roles/', {role_id, officer_ids})
}