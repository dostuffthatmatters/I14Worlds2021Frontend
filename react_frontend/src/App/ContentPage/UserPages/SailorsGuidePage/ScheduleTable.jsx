
/* General Imports --------------------------------------------------------------- */
import React from 'react';


/* Style Imports ----------------------------------------------------------------- */
import {makeStyles} from '@material-ui/core/styles';


/* Material UI Imports ----------------------------------------------------------- */
import {
	Table,
	TableBody,
	TableRow,
	TableCell,
	Paper} from '@material-ui/core';


/* Data -------------------------------------------------------------------------- */


const rows = [
	{
		colored: false,
		date: "07.08.2021",
		weekday: "Saturday",
		category: "Welcome",
		details: "Arrival, unpacking of containers"
	},{
		colored: false,
		date: "08.08.2021",
		weekday: "Sunday",
		category: "Welcome",
		details: "Arrival, unpacking of containers\n" +
			"Measuring of skiffs and equipment, registration of competitors / teams"
	},{
		colored: true,
		date: "09.08.2021",
		weekday: "Monday",
		category: "Team Worlds",
		details: "Arrival, unpacking of containers\n" +
			"Measuring of skiffs and equipment, registration of competitors / teams Welcome and skippers meeting at the FSC\n" +
			"Round Robin #1, after sailing beer / snacks\n" +
			"Evening: Barbecue at the FSC (guest tickets available), Tiki Bar"
	},{
		colored: true,
		date: "10.08.2021",
		weekday: "Tuesday",
		category: "Team Worlds",
		details: "Arrival, unpacking of containers\n" +
			"Measuring of skiffs and equipment, registration of competitors\n" +
			"BlackBox Tours (for all those who are not sailing)\n" +
			"Round Robin #2, Finals, after sailing beer / snacks\n" +
			"Evening: Price giving, Team Worlds Dinner at the FSC (guest tickets available)\n" +
			"Presentation Night at the boat shed of the FSC / Tiki Bar / Bar FSC"
	},{
		colored: false,
		date: "11.08.2021",
		weekday: "Wednesday",
		category: "Lay-Day",
		details: "Arrival, unpacking of containers\n" +
			"Measuring of skiffs and equipment, registration of competitors\n" +
			"BlackBox Tours (for all those who are not sailing)\n" +
			"Bastardo Race, after sailing beer / snacks\n" +
			"6pm: AGM of German Int14 Class Association at the FSC, Bar FSC"
	},{
		colored: true,
		date: "12.08.2021",
		weekday: "Thursday",
		category: "Worlds",
		details: "Welcome and skippers meeting at the FSC (snacks / soft drinks)\n" +
			"Practice Race (Start 2 pm), after sailing beer / snacks\n" +
			"Evening: Welcome dinner at Robbe & Berking Heritage Center, please dress\n" +
			"nice (guest tickets available)"
	},{
		colored: true,
		date: "13.08.2021",
		weekday: "Friday",
		category: "Worlds",
		details: "Race 1 (start 12 am), after sailing beer / snacks\n" +
			"6 pm: Crews Union Meeting, youth room of the FSC / Tiki Bar"
	},{
		colored: true,
		date: "14.08.2021",
		weekday: "Saturday",
		category: "Worlds",
		details: "Race 2 (start 12 am), after sailing beer / snacks\n" +
			"Int14 test sailing afternoon, boats for sale, food truck \"ono deli\" 6 pm: " +
			"Presentation of future Worlds Proposals at the FSC Evening: \"Veteran's Night\" " +
			"at the Bar of the FSC"
	},{
		colored: true,
		date: "15.08.2021",
		weekday: "Sunday",
		category: "Worlds",
		details: "Race 3 (start 12 am), after sailing beer / snacks\n" +
			"Int14 test sailing afternoon, boats for Sale, food truck \"ono deli\"\n" +
			"6 pm: World Council Meeting, youth room of the FSC, Bar FSC"
	},{
		colored: true,
		date: "16.08.2021",
		weekday: "Monday",
		category: "Worlds",
		details: "Race 4 (start 12 am), after sailing beer / snacks\n" +
			"Evening: \"Barbecue Night\" at the FSC, FSC Bar (guest tickets available)"
	},{
		colored: false,
		date: "17.08.2021",
		weekday: "Tuesday",
		category: "Reserve-Day",
		details: "Offers for self-organized excursions: Sightseeing water castle of " +
			"Glücksburg, BlackBox tours, excursion to Flensburg with MS Viking, Hansen's " +
			"brewery, Flensburger brewery, rum museum, city walk through ancient town, " +
			"beach day with beach chair, recommendations for nice cafes and restaurants, " +
			"etc. Evening: meeting at the bar of the FSC"
	},{
		colored: true,
		date: "18.08.2021",
		weekday: "Wednesday",
		category: "Worlds",
		details: "Race 5 (start 11 am), after sailing beer / snacks\n" +
			"5 pm: Welcome on the terrace of the Hanseatic Naval School (DHH)\n" +
			"Evening: Tiki Bar"
	},{
		colored: true,
		date: "19.08.2021",
		weekday: "Thursday",
		category: "Worlds",
		details: "Race 6 (Start 12 am), after sailing beer / snacks\n" +
			"Evening: Tiki Bar (last night)"
	},{
		colored: true,
		date: "20.08.2021",
		weekday: "Friday",
		category: "Worlds",
		details: "Race 7 (start 12 am), after sailing beer / snacks\n" +
			"Packing of boats and containers\n" +
			"Evening: Price giving and Worlds Dinner at the FSC, Crews Union, please\n" +
			"dress nicely (guest tickets available)"
	},{
		colored: false,
		date: "21.08.2021",
		weekday: "Saturday",
		category: "Goodbye",
		details: "Packing of boats and containers, departure\n" +
			"Party night in Hamburg"
	},{
		colored: false,
		date: "22.08.2021",
		weekday: "Sunday",
		category: "Goodbye",
		details: "Packing of boats and containers, departure"
	}
];


/* Styles ------------------------------------------------------------------------ */


const useStyles = makeStyles({
	root: {
		width: '100%',
		overflowX: 'auto',
	},
	table: {
		minWidth: 650,
	},
	grayRow: {
		backgroundColor: "hsla(340, 0%, 50%, 0.1)",
	},
	tableCell: {
		whiteSpace: "pre-line",
	}
});


/* Component --------------------------------------------------------------------- */


export default function ScheduleTable() {
	const classes = useStyles();

	return (
		<Paper className={classes.root} elevation={3}>
			<Table className={classes.table} aria-label="simple table">
				<TableBody>
					{rows.map(row => (
						<TableRow key={row.date} className={row.colored ? classes.grayRow : ""}>
							<TableCell align="center" component="th" scope="row">
								{row.date}
							</TableCell>
							<TableCell align="center">{row.weekday}</TableCell>
							<TableCell align="center">{row.category}</TableCell>
							<TableCell className={classes.tableCell} align="left">{row.details}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</Paper>
	);
}
