import React from 'react';
import {makeStyles} from '@material-ui/core/styles';

import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';


import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import clsx from 'clsx';

import Breakpoint from 'react-socks';

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
	},
	coloredRow: {
		backgroundColor: "hsl(210, 100%, 97.5%)"
	},
	gridItem: {
		display: "flex",
		alignItems: "center",
		justifyContent: "left",
		whiteSpace: "pre-line",
	},
	detailsBlock: {
		marginRight: theme.spacing(4),
	},
	divider: {
		marginTop: theme.spacing(2),
		marginBottom: theme.spacing(2),
	},
	mobileDetailLabel: {
		paddingBottom: theme.spacing(1),
	},
}));

export default function ScheduleRow(props) {
	const classes = useStyles();

	let detailRows = props.details.map((detail, index) => {
		return (
			<React.Fragment>
				{index !== 0 && (
					<Grid item xs={12}>
						<Divider className={classes.divider}/>
					</Grid>
				)}
				<Grid item xs={12}>
					<Breakpoint small down>
						<Grid container justify="flex-start">
							<Grid xs={12} md={2} className={clsx(classes.gridItem, classes.mobileDetailLabel)}>
								<Typography variant="h7">
									<strong>{detail.label}</strong>
								</Typography>
							</Grid>
							<Grid xs={12} md={10} className={classes.gridItem}>
								<Typography variant="body1">{detail.content}</Typography>
							</Grid>
						</Grid>
					</Breakpoint>
					<Breakpoint medium up>
						<Grid container justify="flex-start">
							<Grid xs={12} md={2} className={classes.gridItem}>
								<Typography variant="h7">
									<strong>{detail.label}</strong>
								</Typography>
							</Grid>
							<Grid xs={12} md={10} className={classes.gridItem}>
								<Typography variant="body1">{detail.content}</Typography>
							</Grid>
						</Grid>
					</Breakpoint>
				</Grid>
			</React.Fragment>
		);
	});

	return (
		<ExpansionPanel elevation={3} className={props.colored ? classes.coloredRow : ""}>
			<ExpansionPanelSummary
				expandIcon={<ExpandMoreIcon/>}
				aria-controls="panel1a-content"
				id="panel1a-header">
				<Breakpoint small down>
					<Grid container justify="flex-start">
						<Grid xs={12} className={classes.gridItem}>
							<Typography variant="subtitle1">{props.date} ({props.weekday})</Typography>
						</Grid>
						<Grid xs={12} className={classes.gridItem}>
							<Typography variant="subtitle1"><strong>{props.title}</strong></Typography>
						</Grid>
					</Grid>
				</Breakpoint>
				<Breakpoint medium up style={{width: "100%"}}>
					<Grid container justify="flex-start">
						<Grid xs={2} className={classes.gridItem}>
							<Typography variant="subtitle1">{props.date}</Typography>
						</Grid>
						<Grid xs={2} className={classes.gridItem}>
							<Typography variant="subtitle1">{props.weekday}</Typography>
						</Grid>

						<Grid xs={2} className={classes.gridItem}>
							<Typography variant="subtitle1">{props.title}</Typography>
						</Grid>
					</Grid>
				</Breakpoint>
			</ExpansionPanelSummary>
			<ExpansionPanelDetails>
				<Breakpoint small down style={{width: "100%"}}>
					<Grid container justify="flex-start">
						{detailRows}
					</Grid>
				</Breakpoint>
				<Breakpoint medium up style={{width: "100%"}}>
					<div className={classes.detailsBlock}>
						<Grid container justify="flex-start">
							{detailRows}
						</Grid>
					</div>
				</Breakpoint>
			</ExpansionPanelDetails>
		</ExpansionPanel>
	);
}