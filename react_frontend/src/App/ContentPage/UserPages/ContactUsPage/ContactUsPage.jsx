import React, {Component} from 'react';
import './ContactUsPage.scss';
import {Typography, LinearProgress} from "@material-ui/core";
import {BackendGET} from "../../../../Wrappers/backendCommunication";
import {BACKEND_URL} from "../../../../constants";

import {Breakpoint} from 'react-socks';


import {Card, CardMedia, CardContent} from "@material-ui/core";
import Grid from '@material-ui/core/Grid';

import PropTypes from "prop-types";
import {withStyles} from "@material-ui/styles";


import AssignmentTwoToneIcon from '@material-ui/icons/AssignmentTwoTone';
import PersonOutlineTwoToneIcon from '@material-ui/icons/PersonOutlineTwoTone';
import MailTwoToneIcon from '@material-ui/icons/MailTwoTone';


import AUSFlag from './images/AUSFlag.png';
import CANFlag from './images/CANFlag.svg';
import GERFlag from './images/GERFlag.svg';
import ITAFlag from './images/ITAFlag.svg';
import JPNFlag from './images/JPNFlag.svg';
import SWIFlag from './images/SWIFlag.svg';
import GBRFlag from './images/GBRFlag.png';
import USAFlag from './images/USAFlag.svg';


const countryHosts = [
	{
		name: "tbd",
		email: "tbd",
		flag: AUSFlag,
		alt: "AUS Flag"
	}, {
		name: "tbd",
		email: "tbd",
		flag: CANFlag,
		alt: "CAN Flag"
	}, {
		name: "tbd",
		email: "tbd",
		flag: GERFlag,
		alt: "GER Flag"
	}, {
		name: "tbd",
		email: "tbd",
		flag: ITAFlag,
		alt: "ITA Flag"
	}, {
		name: "tbd",
		email: "tbd",
		flag: JPNFlag,
		alt: "JPN Flag"
	}, {
		name: "tbd",
		email: "tbd",
		flag: SWIFlag,
		alt: "SWI Flag"
	}, {
		name: "tbd",
		email: "tbd",
		flag: GBRFlag,
		alt: "GBR Flag"
	}, {
		name: "tbd",
		email: "tbd",
		flag: USAFlag,
		alt: "USA Flag"
	},
];


const styles = theme => ({
	headline: {
		display: "block",
		textAlign: "center",
		marginBottom: theme.spacing(4)
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
		padding: theme.spacing(1)
	},
	country_line: {
		display: "block",
		padding: 0
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
		paddingBottom: theme.spacing(1),
	}
});


class ContactUsPageManager extends Component {

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
		}).catch((rejectMessage) => {
			console.log("Fetching contact data: failed");
			this.setState({
				loading: false
			});
		});

	}

	getContactList() {
		const {classes} = this.props;

		let contact_list = this.state.contacts.map((contact, index) => {
			return (
				<Grid item xs key={index}>
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

		return (
			<Grid container spacing={2}>
				{contact_list}
			</Grid>
		);
	}

	getCountryHostList() {
		const {classes} = this.props;

		let countryHostList = countryHosts.map((countryHost, index) => {
			return (
				<Grid item xs={12} key={index}>
					<Breakpoint small down>
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
					</Breakpoint>
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
				</Grid>
			);
		});

		return (
			<Grid container spacing={2}>
				{countryHostList}
			</Grid>
		);
	}

	render() {
		const {classes} = this.props;

		return (
			<div className="ContactUsPage">
				<Typography variant="h4" className={classes.headline}>Contact Us</Typography>
				{this.state.loading && <LinearProgress color="secondary"/>}
				<div className={classes.root}>
					{!this.state.loading && this.getContactList()}
				</div>
				<Typography variant="h4" className={`${classes.headline} ${classes.headline2}`}>
					Country Hosts
				</Typography>
				<div className={classes.root}>
					{this.getCountryHostList()}
				</div>

			</div>
		);
	}
}

ContactUsPageManager.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ContactUsPageManager);
