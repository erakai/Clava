import IconButton from '@mui/material/IconButton';
import Fingerprint from '@mui/icons-material/Fingerprint';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';

import GroupsIcon from '@mui/icons-material/Groups'; // Members
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'; // Events
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined'; // Documents
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined'; // Finances

import { Link } from "react-router-dom";
import { ReactNode } from 'react';

type ButtonParams = {
	name: 'Members' | 'Events' | 'Documents' | 'Finances';
	icon?: ReactNode;
	onClick? : () => any;
	url?: string
}

function getButtonParams(title : string) : ButtonParams {
	var buttonParams : ButtonParams = { name : title as 'Members' | 'Events' | 'Documents' | 'Finances' }
	switch (title) {
		case 'Members': {
			buttonParams.icon = <GroupsIcon />;
			buttonParams.url = "/members"
			break;
		} 
		case 'Events' : {
			buttonParams.icon = <CalendarTodayIcon />;
			buttonParams.url = "/";
			break;
		}
		case 'Documents' : {
			buttonParams.icon = <InsertDriveFileOutlinedIcon />;
			buttonParams.url = "/";
			break;
		} 
		case 'Finances' : {
			buttonParams.icon = <PaidOutlinedIcon />;
			buttonParams.url = "/";
			break;
		}  
	}
	return buttonParams;
}

type NavButtonProps = {
	title: 'Members' | 'Events' | 'Documents' | 'Finances';
	isSelected: boolean;
}


function NavButton({title, isSelected}: NavButtonProps) {
	const buttonParams : ButtonParams = getButtonParams(title);

	return (
		<Tooltip title={title}>
			<Avatar sx={{ bgcolor: "secondary.main", mx:1, width:48, height:48 }}>
				<IconButton
					disabled={isSelected}
			        key={title as string}	
			        sx={{ color: 'white', display: 'block', width:48, height:48 }}
			      >
		            {buttonParams.icon}
		        </IconButton>
	        </Avatar>
        </Tooltip>
	)
}

export default NavButton