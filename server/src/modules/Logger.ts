type RequestLog = {
	method : string,
	baseUrl : string,
	path : string,
	body,
	params : string,
	user_id : any
}

export function resolveClubId(key : string, value : any) {
	switch (key) {
	case "club_id":
		return value;
	case "member_ids":
		break;
	case "member_id":
		break;
	case "officer_ids":
		break;
	case "officer_id":
		break;
	default:
		return "";
	}
	return "!";
}

export function logRequest({method, baseUrl, path, body, params, user_id} : RequestLog) {
	console.log(method)
	console.log(path)
	console.log(baseUrl)
	console.log(body)
	console.log(user_id)

	if (!body["club_id"]) {
		return;
	}

	console.log(body["club_id"])


}

export { RequestLog };