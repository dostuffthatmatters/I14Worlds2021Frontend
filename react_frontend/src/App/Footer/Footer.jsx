import React from 'react';
import './Footer.scss';

import VRSportTVLogo from './images/vr_sport_logo.svg';
import ESALogo from './images/ESA_LOGO.svg';
import SpaceXLogo from './images/SpaceX_Logo.svg';

import {makeStyles} from '@material-ui/core/styles';
import {Card, Grid, Container, Typography} from '@material-ui/core';

import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
	headline: {
		display: "block",
		textAlign: "center",
		color: "white",
		paddingBottom: theme.spacing(2),
	},
	supporterBox: {
		paddingTop: theme.spacing(4),
		paddingBottom: theme.spacing(4),
		backgroundColor: theme.palette.secondary.main,
		width: "100vw",

	},
	impressumBox: {
		paddingTop: theme.spacing(4),
		paddingBottom: theme.spacing(3),
		backgroundColor: theme.palette.primary.main,
		width: "100vw",
	},
	simpleBox: {
		textAlign: "center",
		padding: theme.spacing(1),
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
	},
}));

export function Footer(props) {

	const classes = useStyles();

	return (
		<div className="Footer">
			<div className={clsx(classes.supporterBox, "SupporterBox")}>
				<Container maxWidth="lg">
					<Typography variant="h5" className={classes.headline}>
						Thanks to our amazing <strong>Sponsors</strong>!
					</Typography>
					<Grid container justify="center" spacing={2}>

						<Grid item>
							<Card elevation={0} className="DarkCard Logo">
								<a href="https://en.wikipedia.org/wiki/European_Space_Agency"
								   rel="noopener noreferrer"
								   target="_blank">
									<img className="NarrowImage" src={ESALogo} alt="Logo of the ESA"/>
								</a>
							</Card>
						</Grid>

						<Grid item>
							<Card elevation={0} className="DarkCard Logo">
								<a href="https://www.vrsport.tv/"
								   rel="noopener noreferrer"
								   target="_blank">
									<img className="WideImage" src={VRSportTVLogo} alt="Logo of VR Sport TV"/>
								</a>
							</Card>
						</Grid>

						<Grid item>
							<Card elevation={0} className="DarkCard Logo">
								<a href="https://en.wikipedia.org/wiki/SpaceX"
								   rel="noopener noreferrer"
								   target="_blank">
									<img className="WideImage" src={SpaceXLogo} alt="Logo of SpaceX"/>
								</a>
							</Card>
						</Grid>
					</Grid>
				</Container>
			</div>
			<div className={clsx(classes.impressumBox, "ImpressumBox")}>
				<Container maxWidth="lg">

					<Grid container justify="center" spacing={1}>

						<Grid item>
							<Card elevation={0} className={clsx(classes.simpleBox, "BrightCard", "SimpleBox")}>
								<a href="https://github.com/dostuffthatmatters"
								   rel="noopener noreferrer"
								   target="_blank">
									<Typography>© Moritz Makowski</Typography>
								</a>
							</Card>
						</Grid>

						<Grid item>
							<Card elevation={0} className={clsx(classes.simpleBox, "BrightCard", "SimpleBox")}>
								<a href="https://international14.de/"
								   rel="noopener noreferrer"
								   target="_blank">
									<Typography>© German International 14 Class Association</Typography>
								</a>
							</Card>
						</Grid>

					</Grid>

					<Grid container justify="center" spacing={1}>

						<Grid item>
							<Card elevation={0} className={clsx(classes.simpleBox, "BrightCard", "SimpleBox")}>
								<a href="https://www.nrv.de/"
								   rel="noopener noreferrer"
								   target="_blank">
									<Typography>© Sven Jürgensen (NRV)</Typography>
								</a>
							</Card>
						</Grid>

						<Grid item>
							<Card elevation={0} className={clsx(classes.simpleBox, "BrightCard", "SimpleBox")}>
								<a href="https://www.vrsport.tv/"
								   rel="noopener noreferrer"
								   target="_blank">
									<Typography>© VR Sport TV</Typography>
								</a>
							</Card>
						</Grid>

					</Grid>

					<Grid container justify="center" spacing={1}>

						<Grid item>
							<Card elevation={0} className={clsx(classes.simpleBox, "BrightCard", "SimpleBox")}>
								<a className="Box"
								   href="https://international14.de/datenschutz/"
								   rel="noopener noreferrer"
								   target="_blank">
									<Typography>Datenschutz</Typography>
								</a>
							</Card>
						</Grid>

						<Grid item>
							<Card elevation={0} className={clsx(classes.simpleBox, "BrightCard", "SimpleBox")}>
								<a className="Box"
								   href="https://international14.de/impressum/"
								   rel="noopener noreferrer"
								   target="_blank">
									<Typography>Impressum</Typography>
								</a>
							</Card>
						</Grid>

					</Grid>
				</Container>
			</div>
		</div>
	);
}

