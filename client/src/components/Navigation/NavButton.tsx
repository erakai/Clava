import IconButton from '@mui/material/IconButton';
import Fingerprint from '@mui/icons-material/Fingerprint';
import Avatar from '@mui/material/Avatar';

import GroupsIcon from '@mui/icons-material/Groups'; // Members
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'; // Events
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined'; // Documents
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined'; // Finances


type ButtonParams = {
	name: 'Members' | 'Events' | 'Documents' | 'Finances';
	icon: HTMLElement;
	onClick : () => any;
}

function getButtonParams(title : string) : ButtonParams {
	var buttonParams : ButtonParams = { name : title }
	switch (title) {
		case 'Members': {
			buttonParams.icon = <GroupsIcon />;
			break;
		} 
		case 'Events' : {
			buttonParams.icon = <CalendarTodayIcon />;
			break;
		}
		case 'Documents' : {
			buttonParams.icon = <InsertDriveFileOutlinedIcon />;
			break;
		} 
		case 'Finances' : {
			buttonParams.icon = <PaidOutlinedIcon />;
			break;
		}  
	}
	return buttonParams;
}

type NavButtonProps = {
	title: 'Members' | 'Events' | 'Documents' | 'Finances';
}


function NavButton({title}: NavButtonProps) {
	console.log(title)
	const buttonParams : ButtonParams = getButtonParams(title);

	return (
		<Avatar sx={{ bgcolor: "secondary.main", mx:1, width:48, height:48 }}>
			<IconButton
		        key={title}	
		        sx={{ color: 'white', display: 'block', width:48, height:48 }}
		      >
	            {buttonParams.icon}
	        </IconButton>
        </Avatar>
	)
}

export default NavButton