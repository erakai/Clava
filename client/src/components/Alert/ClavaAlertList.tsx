import  React, { useState } from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Grid from '@mui/material/Grid';

import ClavaAlert from "./ClavaAlert"

let addAlert = (alertValue: AlertValues) => {}

function createClavaAlert(t: string, m: string, s?: number) {
	const c : AlertValues = {type: t, message: m, statusCode : s}
	addAlert(c)
}

const defaultMessages: { [key: number]: string } = {
  403: "Sorry, you don't have permissions to do that!",
  200: "Success! "
}

function getStatusMessage(msg : string, statusCode? : number) : string {
  if (statusCode) {
    if (statusCode == 200) {
      return defaultMessages[statusCode] + msg
    }

    if (defaultMessages[statusCode]) {
      return defaultMessages[statusCode]
    }
  }
  return msg
}

type AlertValues = {
	type : string,
	message : string
	statusCode?: number
}

function generate(element: React.ReactElement, alertValues: AlertValues[]) {
  return alertValues.map((value) =>
  	<ListItem key={alertValues.indexOf(value)} alignItems="flex-start">
	    {React.cloneElement(element, {
	    	key: alertValues.indexOf(value),
	    	type: value.type,
	    	message: getStatusMessage(value.message, value.statusCode),
	    })}
	</ListItem>
  );
}

function ClavaAlertList() {
	const [alerts, setAlerts] = useState<AlertValues[]>([]);

	addAlert = (alertValue: AlertValues) => {
		setAlerts(prevAlerts => [...prevAlerts, alertValue])
	}

	return (
		<div id="alert-list">
			<style>
		        {
		          `#alert-list {
		              height: 2vh;
		              display: flex;
  					  		justify-content: center;
		              position:fixed;
		              top: 12%;
		              width: 50vw;
					  			left: 50%;
					  			transform: translate(-50%, -5%);
		              z-index: 10; /* Set z-index to 0 as it will be on a layer below the contact form */
		            }`
		        }
	      	</style>
	      	<Grid
			  container
			  spacing={0}
			  direction="column"
			  alignItems="center"
			  justifyContent="center"
			>
			<List sx={{maxWidth: "50%", maxHeight: "20%"}}>
		      {generate(
		      		<ClavaAlert key={''} type={'success'} message={''} />, alerts
		  		)}
		    </List>
		    </Grid>	
		</div>
	)
}

export {ClavaAlertList, createClavaAlert}