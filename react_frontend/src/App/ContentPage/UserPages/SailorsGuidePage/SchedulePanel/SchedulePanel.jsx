import React from 'react';
import {makeStyles} from '@material-ui/core/styles';

import ScheduleRow from './ScheduleRow';
import {schedule} from './Schedule';


const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
	},
	gridItem: {
		display: "flex",
		alignItems: "center",
		justifyContent: "left",
	},
	divider: {
		marginTop: theme.spacing(2),
		marginBottom: theme.spacing(2),
	},
}));

export default function SchedulePanel() {
	const classes = useStyles();

	let scheduleRows = schedule.map(day => {
		return (
			<ScheduleRow colored={day.colored}
			             date={day.date}
			             weekday={day.weekday}
			             title={day.title}
			             details={day.details}/>
		);
	});
	return (
		<div className={classes.root}>
			{scheduleRows}
		</div>
	);
}