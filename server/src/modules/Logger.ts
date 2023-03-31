import to from "await-to-js";
import Log from "models/log.model";
import Member from "models/member.model";
import Officer from "models/officer.model";

type RequestLog = {
	method : string,
	baseUrl : string,
	path : string,
	_body : any,
	params : string,
	user_id : any
}

export async function resolveClubId(_body : any) {
	// single handly the worst code i've ever written
	var key : string;
	var value : any;

	const { officer_id } = _body
	if (officer_id) {
		key = "officer_id"
		value = officer_id
	}

	const { officer_ids } = _body
	if (officer_ids) {
		key = "officer_ids"
		value = officer_ids
	}

	const { member_id } = _body
	if (member_id) {
		key = "member_id"
		value = member_id
	}

	const { member_ids } = _body
	if (member_ids) {
		key = "member_ids"
		value = member_ids
	}

	switch (key) {
	case "officer_ids":
		const [err1, officers] = await to(Officer.find({'_id' : { $in: value } }).exec());
		if (err1) {
			return ""
		}
		return officers[0].club_id;
	case "officer_id":
		const [err2, officer] = await to(Officer.findById(value).exec());
		if (err2) {
			return ""
		}
		return officer.club_id;
	case "member_ids":
		const [err3, members] = await to(Member.find({'_id' : { $in: value } }).exec());
		console.log(members)
		if (err3) {
			return ""
		}
		return members[0].club_id;
	case "member_id":
		const [err4, member] = await to(Member.findById(value).exec());
		console.log("a:", member, value)
		if (err4) {
			return ""
		}
		return member.club_id;
	}
	return "";
}

export async function logRequest({method, baseUrl, path, _body, params, user_id} : RequestLog) {
	var { club_id } = _body;
	if (!club_id) {
		const [clubiderr, res_club_id] = await to(resolveClubId(_body))
		if (clubiderr) { return; }
		club_id = res_club_id;
	}
	
	if (!club_id) { return; }

	const route = baseUrl + path;
	const body : string = JSON.stringify(_body) + params
	const date = Date()

	Log.create({
		user_id, club_id, method, route, body, date
	}, async (err, log) => {
		if (err) {
			console.log(err)
			return;
		}
	})
}

export { RequestLog };