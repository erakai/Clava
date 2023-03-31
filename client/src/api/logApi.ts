import axios from "axios";
import { intercepts } from "./config";
import { getRefreshToken } from "./userApi";

type GetLogsResponse = { logs: Log[] }

const LogInstance = axios.create({
	baseURL: `http://localhost:8080/logs`,
	timeout: 1000,
	withCredentials: true
})

intercepts(LogInstance, getRefreshToken);

export const getLogs = (club_id: string) => {
	return LogInstance.get<GetLogsResponse>('/', { params: { club_id : club_id }})
}