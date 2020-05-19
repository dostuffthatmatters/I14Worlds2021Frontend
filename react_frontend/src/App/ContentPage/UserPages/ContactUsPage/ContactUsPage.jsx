
/* General Imports --------------------------------------------------------------- */
import React from 'react';


/* Styling Imports --------------------------------------------------------------- */
import './ContactUsPage.scss';
import clsx from 'clsx';

/* AJAX Imports ------------------------------------------------------------------ */
import {BackendGET} from "../../../../Wrappers/backendCommunication";
import {BACKEND_URL} from "../../../../constants";


/* Material UI Imports ----------------------------------------------------------- */
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';

import AssignmentTwoToneIcon from '@material-ui/icons/AssignmentTwoTone';
import PersonOutlineTwoToneIcon from '@material-ui/icons/PersonOutlineTwoTone';
import MailTwoToneIcon from '@material-ui/icons/MailTwoTone';


/* Asset Imports ------------------------------------------------------------- */
import AUSFlag from './images/AUSFlag.png';
import CANFlag from './images/CANFlag.svg';
import JPNFlag from './images/JPNFlag.svg';
import USAFlag from './images/USAFlag.svg';

import CLASSICSFlag from './images/CLASSICS.png';

import GBRFlag from './images/GBRFlag.png';

import FRAFlag from './images/FRAFlag.svg';
import ITAFlag from './images/ITAFlag.svg';
import DENFlag from './images/DENFlag.svg';
import SWEFlag from './images/SWEFlag.svg';
import AUTFlag from './images/AUTFlag.svg';
import SUIFlag from './images/SUIFlag.svg';
import IRLFlag from './images/IRLFlag.svg';
import POLFlag from './images/POLFlag.svg';

/* Hook Linking Imports --------------------------------------------------------------- */
import PropTypes from "prop-types";
import withStyles from "@material-ui/styles/withStyles/withStyles";


/* Data -------------------------------------------------------------------------- */


const countryHosts = [
	{
		name: "Henning Uck",
		email: "aus@i14worlds2021.com",
		flag: AUSFlag,
		alt: "AUS Flag"
	}, {
		name: "Andrew McConnell",
		email: "can@i14worlds2021.com",
		flag: CANFlag,
		alt: "CAN Flag"
	}, {
		name: "Dennis Gehrlein",
		email: "usa@i14worlds2021.com",
		flag: USAFlag,
		alt: "US Flag"
	}, {
		name: "Mathias Nippel",
		email: "jpn@i14worlds2021.com",
		flag: JPNFlag,
		alt: "JPN Flag"
	}, {
		name: "Oliver Peter",
		email: "classic14@i14worlds2021.com",
		flag: CLASSICSFlag,
		alt: "Classic International 14"
	}, {
		name: "Michel Elle",
		email: "gbr@i14worlds2021.com",
		flag: GBRFlag,
		alt: "GBR Flag"
	}, {
		name: "Lasse Nielandt",
		email: "fra@i14worlds2021.com",
		flag: FRAFlag,
		alt: "FRA Flag"
	}, {
		name: "Lasse Nielandt",
		email: "ita@i14worlds2021.com",
		flag: ITAFlag,
		alt: "ITA Flag"
	}, {
		name: "Lasse Nielandt",
		email: "den@i14worlds2021.com",
		flag: DENFlag,
		alt: "DEN Flag"
	}, {
		name: "Lasse Nielandt",
		email: "swe@i14worlds2021.com",
		flag: SWEFlag,
		alt: "SWE Flag"
	}, {
		name: "Lasse Nielandt",
		email: "aut@i14worlds2021.com",
		flag: AUTFlag,
		alt: "AUT Flag"
	}, {
		name: "Lasse Nielandt",
		email: "sui@i14worlds2021.com",
		flag: SUIFlag,
		alt: "SUI Flag"
	}, {
		name: "Lasse Nielandt",
		email: "irl@i14worlds2021.com",
		flag: IRLFlag,
		alt: "IRL Flag"
	}, {
		name: "Lasse Nielandt",
		email: "pol@i14worlds2021.com",
		flag: POLFlag,
		alt: "POL Flag"
	}
];

/* Styles ------------------------------------------------------------------------ */


const styles = theme => ({
	headline: {
		display: "block",
		textAlign: "center",
		marginBottom: theme.spacing(4)
	},
	linearProgress: {
		borderRadius: "2px"
	},
	headline2: {
		marginTop: theme.spacing(8)
	},
	root: {
		flexGrow: 1,
	},
	paper: {
		padding: theme.spacing(1)
	},
	contact_line: {
		display: "block",
		padding: theme.spacing(1),
	},
	country_line: {
		display: "block",
		padding: 0,
	},
	contact_icon: {
		display: "inline-flex",
		verticalAlign: "top"
	},
	contact_label: {
		display: "inline-flex",
		verticalAlign: "top",
		marginTop: 0,
		marginBottom: 0,
		marginLeft: theme.spacing(1),
		marginRight: 0,
		whiteSpace: "nowrap",
		overflow: "hidden"
	},
	card: {
		position: "relative",
		padding: 0
	},
	cardMedia: {
		height: 0,
		paddingTop: '50%', // 2:1
	},
	cardContent: {
		paddingTop: theme.spacing(2),
		paddingRight: theme.spacing(2),
		paddingBottom: theme.spacing(1),
		paddingLeft: theme.spacing(2),
		margin: 0,
		"&:last-child": {
			paddingBottom: theme.spacing(2),
		}
	},
	countryLinePadding: {
		paddingBottom: theme.spacing(2),
	}
});


/* Component --------------------------------------------------------------------- */


class ContactUsPageManager extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			loading: true,
			contacts: []
		};

		this.getContactList = this.getContactList.bind(this);
		this.getCountryHostList = this.getCountryHostList.bind(this);
	}

	componentDidMount() {

		console.log("Fetching contact data");

		BackendGET(BACKEND_URL + "/backend/database/contact", {}).then((resolveMessage) => {
			console.log("Fetching contact data: successful");
			this.setState({
				loading: false,
				contacts: JSON.parse(resolveMessage)["contacts"]
			});
		}).catch(() => {
			console.log("Fetching contact data: failed");
			this.setState({
				loading: false
			});
		});
	}

	getContactList() {
		const {classes} = this.props;

		let contactList = this.state.contacts.map((contact, index) => {
			if (contact.visible === 0) {
				return "";
			}
			return (
				<Grid item xs={12} sm={6} md={5} lg={5} xl={5} key={index}>
					<Card className={classes.paper} elevation={3}>

						<div className={classes.contact_line}>
							<AssignmentTwoToneIcon className={classes.contact_icon}/>
							<Typography variant="body1" className={classes.contact_label}>{contact.role}</Typography>
						</div>

						<div className={classes.contact_line}>
							<PersonOutlineTwoToneIcon className={classes.contact_icon}/>
							<Typography variant="body1" className={classes.contact_label}>{contact.name}</Typography>
						</div>

						<div className={classes.contact_line}>
							<MailTwoToneIcon className={classes.contact_icon}/>
							<Typography variant="body1" className={classes.contact_label}>{contact.email}</Typography>
						</div>

					</Card>
				</Grid>
			);
		});


		if (this.state.contacts.length === 0) {
			return (
				<Typography variant="h6" style={{textAlign: "center"}}>No contacts ...</Typography>
			);
		} else {
			return (
				<Grid container spacing={2} justify="center">
					{contactList}
				</Grid>
			);
		}
	}

	getCountryHostList() {
		const {classes} = this.props;

		let countryHostList = countryHosts.map((countryHost, index) => {
			return (
				<Grid item xs={12} sm={6} md={5} lg={5} xl={5} key={index}>
					<Card elevation={3}>
						<CardMedia
							className={classes.cardMedia}
							image={countryHost.flag}
							title={countryHost.alt}
							alt={countryHost.alt}
						/>
						<CardContent className={classes.cardContent}>
							<div className={classes.countryLinePadding}>
								<PersonOutlineTwoToneIcon className={classes.contact_icon}/>
								<Typography variant="body1"
								            className={classes.contact_label}>{countryHost.name}</Typography>
							</div>
							<div>
								<MailTwoToneIcon className={classes.contact_icon}/>
								<Typography variant="body1"
								            className={classes.contact_label}>{countryHost.email}</Typography>
							</div>
						</CardContent>
					</Card>
				</Grid>
			);
		});

		return (
			<Grid container spacing={2} justify="center">
				{countryHostList}
			</Grid>
		);
	}


	/*

	Old version of the country host cards (on medium and large screens).
	The mobile version looks better on all screens though

	<Breakpoint medium up>
		<Card className={classes.card} elevation={3}>
			<div className={classes.cardContent}>
				<div className={classes.countryLinePadding}>
					<PersonOutlineTwoToneIcon className={classes.contact_icon}/>
					<Typography variant="body1"
					            className={classes.contact_label}>{countryHost.name}</Typography>
				</div>
				<div className={classes.countryLinePadding}>
					<MailTwoToneIcon className={classes.contact_icon}/>
					<Typography variant="body1"
					            className={classes.contact_label}>{countryHost.email}</Typography>
				</div>
			</div>
			<div className="CardCountryFlag">
				<img src={countryHost.flag} alt={countryHost.alt}/>
			</div>
		</Card>
	</Breakpoint>

	 */

	render() {
		const {classes} = this.props;

		return (
			<div className="ContactUsPage">
				<Typography variant="h4" className={classes.headline}>
					Country Hosts
				</Typography>
				<div className={classes.root}>
					{this.getCountryHostList()}
				</div>
				<Typography variant="h4" className={clsx(classes.headline, classes.headline2)}>Contact Us</Typography>
				{this.state.loading && <LinearProgress className={classes.linearProgress} color="secondary"/>}
				<div className={classes.root}>
					{!this.state.loading && this.getContactList()}
				</div>
			</div>
		);
	}
}

ContactUsPageManager.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ContactUsPageManager);
