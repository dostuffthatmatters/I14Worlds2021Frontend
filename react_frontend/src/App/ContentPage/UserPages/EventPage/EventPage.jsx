/* General Imports --------------------------------------------------------------- */
import React from 'react';


/* Styling Imports --------------------------------------------------------------- */
import './EventPage.scss';
import clsx from "clsx";
import Breakpoint from 'react-socks';

/* Material UI Imports ----------------------------------------------------------- */
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

/* Google Maps Imports ----------------------------------------------------------- */
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import {GoogleMapsAPIKey} from '../../../../secrets.js';

/* Hook Linking Imports --------------------------------------------------------------- */
import PropTypes from "prop-types";
import withStyles from "@material-ui/styles/withStyles/withStyles";


/* Component Imports ------------------------------------------------------------- */
import InvitationSlider from './InvitationSlider/InvitationSlider';


/* Assets Imports ---------------------------------------------------------------- */
import Image01Landscape1200 from './images/Image01/9541_Landscape_1200.jpg';
import Image01Landscape2000 from './images/Image01/9541_Landscape_2000.jpg';
import Image01Landscape2800 from './images/Image01/9541_Landscape_2800.jpg';

import Image01Square1200 from './images/Image01/9541_Square_1200.jpg';
import Image01Square2000 from './images/Image01/9541_Square_2000.jpg';
import Image01Square2800 from './images/Image01/9541_Square_2800.jpg';

import Image01Portrait1600 from './images/Image01/9541_Portrait_1600.jpg';
import Image01Portrait2200 from './images/Image01/9541_Portrait_2200.jpg';
import Image01Portrait2800 from './images/Image01/9541_Portrait_2800.jpg';

import Image02Landscape1200 from './images/Image02/9072_Landscape_1200.jpg';
import Image02Landscape2000 from './images/Image02/9072_Landscape_2000.jpg';
import Image02Landscape2800 from './images/Image02/9072_Landscape_2800.jpg';

import Image02Square1200 from './images/Image02/9072_Square_1200.jpg';
import Image02Square2000 from './images/Image02/9072_Square_2000.jpg';
import Image02Square2800 from './images/Image02/9072_Square_2800.jpg';

import Image03Landscape1200 from './images/Image03/9718_Landscape_1200.jpg';
import Image03Landscape2000 from './images/Image03/9718_Landscape_2000.jpg';
import Image03Landscape2800 from './images/Image03/9718_Landscape_2800.jpg';

import Image03Square1200 from './images/Image03/9718_Square_1200.jpg';
import Image03Square2000 from './images/Image03/9718_Square_2000.jpg';
import Image03Square2800 from './images/Image03/9718_Square_2800.jpg';

import EventLogo from './images/EventLogo.svg'
import FSCLogo from './images/FSCLogo.svg'
import VRSportTVLogo from './images/VRSportTVLogo.svg'


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
	link: {
		cursor: "pointer",
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

		let imageElement01, imageElement02, imageElement03;

		if ((3342 / 5015) > (window.innerHeight / window.innerWidth)) {
			imageElement01 = (
				<React.Fragment>
					<Breakpoint small down>
						<img className="EventImage EventImageLandscape"
						     src={Image01Landscape1200}
						     alt="Screaming Downwind"/>
					</Breakpoint>
					<Breakpoint medium only>
						<img className="EventImage EventImageLandscape"
						     src={Image01Landscape2000}
						     alt="Screaming Downwind"/>
					</Breakpoint>
					<Breakpoint large up>
						<img className="EventImage EventImageLandscape"
						     src={Image01Landscape2800}
						     alt="Screaming Downwind"/>
					</Breakpoint>
				</React.Fragment>
			);
			imageElement02 = (
				<React.Fragment>
					<Breakpoint small down>
						<img className="EventImage2"
						     src={Image02Landscape1200}
						     alt="German Engineering"/>
					</Breakpoint>
					<Breakpoint medium only>
						<img className="EventImage2"
						     src={Image02Landscape2000}
						     alt="German Engineering"/>
					</Breakpoint>
					<Breakpoint large up>
						<img className="EventImage2"
						     src={Image02Landscape2800}
						     alt="German Engineering"/>
					</Breakpoint>
				</React.Fragment>
			);
			imageElement03 = (
				<React.Fragment>
					<Breakpoint small down>
						<img className="EventImage3"
						     src={Image03Landscape1200}
						     alt="I14 Culture"/>
					</Breakpoint>
					<Breakpoint medium only>
						<img className="EventImage3"
						     src={Image03Landscape2000}
						     alt="I14 Culture"/>
					</Breakpoint>
					<Breakpoint large up>
						<img className="EventImage3"
						     src={Image03Landscape2800}
						     alt="I14 Culture"/>
					</Breakpoint>
				</React.Fragment>
			);
		} else if ((3367 / 3647) > (window.innerHeight / window.innerWidth)) {
			imageElement01 = (
				<React.Fragment>
					<Breakpoint small down>
						<img className="EventImage EventImageSquare"
						     src={Image01Square1200}
						     alt="Screaming Downwind"/>
					</Breakpoint>
					<Breakpoint medium only>
						<img className="EventImage EventImageSquare"
						     src={Image01Square2000}
						     alt="Screaming Downwind"/>
					</Breakpoint>
					<Breakpoint large up>
						<img className="EventImage EventImageSquare"
						     src={Image01Square2800}
						     alt="Screaming Downwind"/>
					</Breakpoint>
				</React.Fragment>
			);
			imageElement02 = (
				<React.Fragment>
					<Breakpoint small down>
						<img className="EventImage2"
						     src={Image02Landscape1200}
						     alt="German Engineering"/>
					</Breakpoint>
					<Breakpoint medium only>
						<img className="EventImage2"
						     src={Image02Landscape2000}
						     alt="German Engineering"/>
					</Breakpoint>
					<Breakpoint large up>
						<img className="EventImage2"
						     src={Image02Landscape2800}
						     alt="German Engineering"/>
					</Breakpoint>
				</React.Fragment>
			);
			imageElement03 = (
				<React.Fragment>
					<Breakpoint small down>
						<img className="EventImage3"
						     src={Image03Landscape1200}
						     alt="I14 Culture"/>
					</Breakpoint>
					<Breakpoint medium only>
						<img className="EventImage3"
						     src={Image03Landscape2000}
						     alt="I14 Culture"/>
					</Breakpoint>
					<Breakpoint large up>
						<img className="EventImage3"
						     src={Image03Landscape2800}
						     alt="I14 Culture"/>
					</Breakpoint>
				</React.Fragment>
			);
		} else {
			imageElement01 = (
				<React.Fragment>
					<Breakpoint small down>
						<img className="EventImage EventImagePortrait"
						     src={Image01Portrait1600}
						     alt="Screaming Downwind"/>
					</Breakpoint>
					<Breakpoint medium only>
						<img className="EventImage EventImagePortrait"
						     src={Image01Portrait2200}
						     alt="Screaming Downwind"/>
					</Breakpoint>
					<Breakpoint large up>
						<img className="EventImage EventImagePortrait"
						     src={Image01Portrait2800}
						     alt="Screaming Downwind"/>
					</Breakpoint>
				</React.Fragment>
			);
			imageElement02 = (
				<React.Fragment>
					<Breakpoint small down>
						<img className="EventImage2"
						     src={Image02Square1200}
						     alt="German Engineering"/>
					</Breakpoint>
					<Breakpoint medium only>
						<img className="EventImage2"
						     src={Image02Square2000}
						     alt="German Engineering"/>
					</Breakpoint>
					<Breakpoint large up>
						<img className="EventImage2"
						     src={Image02Square2800}
						     alt="German Engineering"/>
					</Breakpoint>
				</React.Fragment>
			);
			imageElement03 = (
				<React.Fragment>
					<Breakpoint small down>
						<img className="EventImage3"
						     src={Image03Square1200}
						     alt="I14 Culture"/>
					</Breakpoint>
					<Breakpoint medium only>
						<img className="EventImage3"
						     src={Image03Square2000}
						     alt="I14 Culture"/>
					</Breakpoint>
					<Breakpoint large up>
						<img className="EventImage3"
						     src={Image03Square2800}
						     alt="I14 Culture"/>
					</Breakpoint>
				</React.Fragment>
			);
		}

		return (
			<div className={clsx("EventPage", classes.page)}>
				{imageElement01}
				<div className="EventImage1Overlay">
					<div className="ContainerSmall">
						<Paper elevation={3} className={classes.paper}>
							<img className={clsx(classes.logo, "Logo")} src={EventLogo}
							     alt="I14 Worlds Logo"/>
						</Paper>

						<Paper elevation={3} className={clsx(classes.link, classes.paper)}>
							<a href="https://www.fsc.de/"
							   target="_blank"
							   rel="noopener noreferrer">
								<img className={clsx(classes.logo, "Logo")} src={FSCLogo}
								     alt="FSC Logo"/>
							</a>
						</Paper>
					</div>
				</div>

				<div className={clsx(classes.infoContainer, "InfoContainer")}>

					<Paper elevation={3} className={clsx(classes.link, classes.paper)}>
						<a href="https://www.vrsport.tv/"
						   target="_blank"
						   rel="noopener noreferrer">
							<img className={clsx(classes.logo, "Logo")} src={VRSportTVLogo}
							     alt="VR Sport TV Logo"/>
						</a>
					</Paper>

					<Paper elevation={3} className={clsx(classes.paper, classes.countdownContainer)}>
						<Grid container spacing={0}>
							<Grid item xs={12}>
								<Typography variant="h5" className={classes.cardLabel}>
									August 8th - August 21st
								</Typography>
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

				{imageElement02}

				<div className={clsx(classes.paperContainer)}>

					<Paper elevation={3} className={clsx(classes.addressPaper, "AddressContainer")}>
						<Grid container spacing={0}>
							<Grid item xs={12}>
								<Typography variant="h5" className={classes.cardLabel}>
									Flensburger Segel-Club
								</Typography>
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

				{imageElement03}

				<div className={clsx(classes.paperContainer)}>
					<InvitationSlider/>
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
