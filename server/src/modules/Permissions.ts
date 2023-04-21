import Officer from '../models/officer.model';
import Role from '../models/role.model';
import Club from '../models/club.model';
import { IOfficer } from '../types/officer';
import { IRole } from '../types/role';
import { IClub } from "../types/club";

import to from 'await-to-js'

export async function getRolesFromUser(user_id : string, club_id : string) {
	// get officer from email + club_id
	const [officerErr, officers] = await to(Officer.find({club_id : club_id, user_id : user_id.toString()}).exec())

	if (officerErr) {
		return []
	}

	if (!(officers instanceof Array<IOfficer>)) {
		return []
	}

	if (officers.length != 1) {
		return [] // return nothing if we couldn't find our officer
		// return nothing if there are multiple options for safety :)
	}

	const role_ids = officers[0].role_ids
	const [rolesErr, roles] = await to(Role.find({'_id' : { $in: role_ids } }).exec());
	if (rolesErr) {
		return []
	}

	return roles
}

export async function isOwner(user_id : string, club_id : string) {
	const [clubErr, club] = await to(Club.find({_id : club_id}).exec())

	if (clubErr) {
		return false
	}

	return (club[0].owner_id.toString() === user_id.toString())
}

export async function isUserOfClub(user_id : string, club_id : string) {
	const [ownerErr, _isOwner] = await to(isOwner(user_id, club_id))
	if (ownerErr) { return false; }

	// is owner?
	if (_isOwner) {
		return true
	}

	// is officer?
	const [officerErr, officers] = await to(Officer.find({club_id : club_id, user_id : user_id.toString()}).exec())
	if (officerErr) {
		return false
	}

	if (!(officers instanceof Array<IOfficer>)) {	
		return false
	}

	if (officers.length != 1) { // only one officer should be found
		return false
	}

	return (officers[0].user_id.toString() === user_id.toString())
}

export async function hasPermission(perm : string, club_id, _user) {
	const [ownerErr, isUserOwner] = await to(isOwner(_user._id, club_id));
	if (ownerErr) { return false; }
	if (isUserOwner) {
		return true
	}

	const [rolesErr, roles] = await to(getRolesFromUser(_user._id, club_id))
	if (rolesErr) {
		return false
	}

	if (!(roles instanceof Array<IRole>)) {
		return false
	}

	var _flag = false
	roles.forEach(role => {
		if (role.perms.includes(perm)) {
			_flag = true
		}	
	})
	return _flag
}

export async function hasRole(role_id, club_id, _user) {
	const [ownerErr, isUserOwner] = await to(isOwner(_user._id, club_id));
	if (ownerErr) { return false; }
	if (isUserOwner) {
		return true
	}

	const [rolesErr, roles] = await to(getRolesFromUser(_user._id, club_id))
	if (rolesErr) {
		return false
	}

	if (!(roles instanceof Array<IRole>)) {
		return false
	}

	var _flag = false
	roles.forEach(role => {
		if (role._id.toString() === role_id.toString()) {
			_flag = true
		}	
	})
	return _flag
}


