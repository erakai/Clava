import IconButton from '@mui/material/IconButton';
import Fingerprint from '@mui/icons-material/Fingerprint';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';

import GroupsIcon from '@mui/icons-material/Groups'; // Members
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'; // Events
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined'; // Documents
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined'; // Finances

import { useNavigate } from "react-router-dom";

import { ReactNode } from 'react';

type ButtonParams = {
	name: 'Members' | 'Events' | 'Documents' | 'Finances';
	icon?: ReactNode;
	onClick? : () => any;
	route?: string
}

function getButtonParams(title : string) : ButtonParams {
	var buttonParams : ButtonParams = { name : title as 'Members' | 'Events' | 'Documents' | 'Finances' }
	switch (title) {
		case 'Members': {
			buttonParams.icon = <GroupsIcon />;
			buttonParams.route = "/members"
			break;
		} 
		case 'Events' : {
			buttonParams.icon = <CalendarTodayIcon />;
			buttonParams.route = "/events";
			break;
		}
		case 'Documents' : {
			buttonParams.icon = <InsertDriveFileOutlinedIcon />;
			buttonParams.route = "/documents";
			break;
		} 
		case 'Finances' : {
			buttonParams.icon = <PaidOutlinedIcon />;
			buttonParams.route = "/finances";
			break;
		}  
	}
	return buttonParams;
}

type NavButtonProps = {
	title: 'Members' | 'Events' | 'Documents' | 'Finances';
	isSelected: boolean;
	clubId : string;
}


function NavButton({title, isSelected, clubId}: NavButtonProps) {
	const navigate = useNavigate();

	const buttonParams : ButtonParams = getButtonParams(title);

	const onLinkChange = (): void => {
		navigate('/' + clubId + '/' + title.toLowerCase());
	}

	return (
		<Tooltip title={title}>
			<Avatar sx={{ bgcolor: "secondary.main", mx:1, width:48, height:48 }}>
				<IconButton
					disabled={isSelected}
			        key={title as string}
			        onClick={onLinkChange}	
			        sx={{ color: 'white', display: 'block', width:48, height:48 }}
			      >
		            {buttonParams.icon}
		        </IconButton>
	        </Avatar>
        </Tooltip>
	)
}

export default NavButton