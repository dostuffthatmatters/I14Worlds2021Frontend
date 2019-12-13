/* General Imports --------------------------------------------------------------- */
import React from 'react';


/* Styling Imports --------------------------------------------------------------- */
import './EventPage.scss';
import clsx from "clsx";
import Breakpoint from 'react-socks';

/* Material UI Imports ----------------------------------------------------------- */
import {Typography, Paper, Grid} from "@material-ui/core";

/* Google Maps Imports ----------------------------------------------------------- */
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import {GoogleMapsAPIKey} from '../../../../secrets.js';

/* Hook Linking Imports --------------------------------------------------------------- */
import PropTypes from "prop-types";
import withStyles from "@material-ui/styles/withStyles/withStyles";


/* Component Imports ------------------------------------------------------------- */
import PDFViewer from './PDFViewer/PDFViewer';

/* Assets Imports ---------------------------------------------------------------- */
import EventImageLandScape from './images/_DSC9541_Landscape.jpg'
import EventImageSquare from './images/_DSC9541_Square.jpg'
import EventImagePortrait from './images/_DSC9541_Portrait.jpg'

import EventLogo from './images/EventLogo.svg'
import FSCLogo from './images/FSCLogo.svg'
import VRSportTVLogo from './images/VRSportTVLogo.svg'

import EventImage2 from './images/_DSC9072_2800px_cut.jpg'
import EventImage3 from './images/_DSC9718_3200px_cut.jpg'


/* Style ------------------------------------------------------------------------- */


const styles = theme => ({
	page: {
		backgroundColor: '#F0F0F0',
		textAlign: "center",
	},
	paper: {
		padding: theme.spacing(2),
		margin: theme.spacing(2),
	},
	logo: {
		width: "auto"
	},
	paperContainer: {
		overflow: "hidden",
	},
	infoContainer: {
		overflow: "hidden",
	},
	addressPaper: {
		margin: theme.spacing(2),
		paddingTop: theme.spacing(2),
		paddingBottom: theme.spacing(2),
	},
	mapPaper: {
		margin: theme.spacing(2),
	},
	cardLabel: {
		paddingBottom: theme.spacing(1),
	},
});



/* Component --------------------------------------------------------------------- */


class EventPage extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			countdown: {
				days: 0,
				hours: 0,
				minutes: 0,
				seconds: 0
			}
		};
	}

	componentDidMount() {
		// Set the date we're counting down to
		let endDate = new Date("Aug 8, 2021 08:00:00").getTime();

		// Get todays date and time
		let startDate = new Date().getTime();

		// Find the distance between now and the count down date
		let difference = endDate - startDate;

		// Time calculations for days, hours, minutes and seconds
		let days = Math.floor(difference / (1000 * 60 * 60 * 24));
		let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
		let seconds = Math.floor((difference % (1000 * 60)) / 1000);

		this.setState({
			countdown: {
				days: days,
				hours: hours,
				minutes: minutes,
				seconds: seconds
			}
		});

		// Update the count down every 1 second
		let x = setInterval(() => {

			// Get todays date and time
			let startDate = new Date().getTime();

			// Find the distance between now and the count down date
			let difference = endDate - startDate;

			// Time calculations for days, hours, minutes and seconds
			let days = Math.floor(difference / (1000 * 60 * 60 * 24));
			let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
			let seconds = Math.floor((difference % (1000 * 60)) / 1000);

			this.setState({
				countdown: {
					days: days,
					hours: hours,
					minutes: minutes,
					seconds: seconds
				}
			});

			// If the count down is finished, write some text
			if (difference < 0) {
				clearInterval(x);
				this.setState({
					countdown: {
						days: 0,
						hours: 0,
						minutes: 0,
						seconds: 0
					}
				});
			}

		}, 1000);

	}

	render() {

		const {classes} = this.props;

		let eventImageElement;

		if ((1866/2800) > (window.innerHeight/window.innerWidth)) {
			console.log("LANDSCAPE");
			eventImageElement = (
				<img className="EventImage EventImageLandscape"
				     src={EventImageLandScape} alt="Screaming Downwind"/>
				);
		} else if ((2666/2800) > (window.innerHeight/window.innerWidth)) {
			console.log("SQUARE");
			eventImageElement = (
				<img className="EventImage EventImageSquare"
				     src={EventImageSquare} alt="Screaming Downwind"/>
				);
		} else  {
			console.log("PORTRAIT");
			eventImageElement = (
				<img className="EventImage EventImagePortrait"
				     src={EventImagePortrait} alt="Screaming Downwind"/>
				);
		}

		return (
			<div className={clsx("EventPage", classes.page)}>
				{eventImageElement}
				<div className="EventImage1Overlay">
					<div className="ContainerSmall">
						<Paper elevation={3} className={classes.paper}>
							<img className={clsx(classes.logo, "Logo")} src={EventLogo}
							     alt="I14 Worlds Logo"/>
						</Paper>

						<Paper elevation={3} className={classes.paper}>
							<img className={clsx(classes.logo, "Logo")} src={FSCLogo}
							     alt="FSC Logo"/>
						</Paper>
					</div>
				</div>

				<div className={clsx(classes.infoContainer, "InfoContainer")}>

					<Paper elevation={3} className={classes.paper}>
						<img className={clsx(classes.logo, "Logo")} src={VRSportTVLogo}
						     alt="VR Sport TV Logo"/>
					</Paper>

					<Paper elevation={3} className={clsx(classes.paper, classes.countdownContainer)}>
						<Grid container spacing={0}>
							<Grid item xs={12}>
								<Typography variant="h5" className={classes.cardLabel}>August 6th - August
									21st</Typography>
							</Grid>
							<Grid item xs={3}>
								<Typography variant="h5">{this.state.countdown.days}</Typography>
							</Grid>
							<Grid item xs={3}>
								<Typography variant="h5">{this.state.countdown.hours}</Typography>
							</Grid>
							<Grid item xs={3}>
								<Typography variant="h5">{this.state.countdown.minutes}</Typography>
							</Grid>
							<Grid item xs={3}>
								<Typography variant="h5">{this.state.countdown.seconds}</Typography>
							</Grid>
							<Grid item xs={12}>
								<Breakpoint small down>
									<Grid container spacing={0}>
										<Grid item xs={3}>
											<Typography variant="h6">d</Typography>
										</Grid>
										<Grid item xs={3}>
											<Typography variant="h6">h</Typography>
										</Grid>
										<Grid item xs={3}>
											<Typography variant="h6">m</Typography>
										</Grid>
										<Grid item xs={3}>
											<Typography variant="h6">s</Typography>
										</Grid>
									</Grid>
								</Breakpoint>
								<Breakpoint medium up>
									<Grid container spacing={0}>
										<Grid item xs={3}>
											<Typography variant="h6">days</Typography>
										</Grid>
										<Grid item xs={3}>
											<Typography variant="h6">hours</Typography>
										</Grid>
										<Grid item xs={3}>
											<Typography variant="h6">minutes</Typography>
										</Grid>
										<Grid item xs={3}>
											<Typography variant="h6">seconds</Typography>
										</Grid>
									</Grid>
								</Breakpoint>
							</Grid>
						</Grid>
					</Paper>

				</div>

				<img className="EventImage2" src={EventImage2} alt="German Engineering"/>

				<div className={clsx(classes.paperContainer)}>

					<Paper elevation={3} className={clsx(classes.addressPaper, "AddressContainer")}>
						<Grid container spacing={0}>
							<Grid item xs={12}>
								<Typography variant="h5" className={classes.cardLabel}>Flensburg Sailing
									Club</Typography>
							</Grid>
							<Grid item xs={12}>
								<Typography variant="h6">Quellental</Typography>
							</Grid>
							<Grid item xs={12}>
								<Typography variant="h6">24960 Glücksburg</Typography>
							</Grid>
							<Grid item xs={12}>
								<Typography variant="h6">
									<a className="AddressRow"
									   href="https://www.fsc.de/"
									   target="_blank"
									   rel="noopener noreferrer">www.fsc.de</a>
								</Typography>
							</Grid>
						</Grid>
					</Paper>

					<Paper elevation={3} className={clsx(classes.mapPaper, "MapPaper")}>
						<Breakpoint small down>
							<Map google={this.props.google}
							     zoom={5}
							     initialCenter={{lat: 54.836947, lng: 9.525610}}
							     style={{width: '90vw', height: '75vh', borderRadius: 'inherit'}}>
								<Marker/>
							</Map>
						</Breakpoint>
						<Breakpoint medium up>
							<Map google={this.props.google}
							     zoom={5}
							     initialCenter={{lat: 54.836947, lng: 9.525610}}
							     style={{width: '60vw', height: '30vw', borderRadius: 'inherit'}}>
								<Marker/>
							</Map>
						</Breakpoint>
					</Paper>
				</div>

				<img className="EventImage3" src={EventImage3} alt="I14 Culture"/>

				<div className={clsx(classes.paperContainer)}>
					<PDFViewer/>
				</div>

			</div>
		);
	}

}


/*
Followed the Example from:
https://medium.com/@aliglenesk/how-to-embed-a-google-map-in-your-react-app-23866d759e92
*/

EventPage.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default GoogleApiWrapper({
	apiKey: (GoogleMapsAPIKey)
})(withStyles(styles)(EventPage));
