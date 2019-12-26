
/* General Imports --------------------------------------------------------------- */
import React from 'react';


/* Styling Imports --------------------------------------------------------------- */
import './AdminContactUsPage.scss';


/* AJAX Imports ------------------------------------------------------------------ */
import {BackendGET, BackendREST} from "../../../../Wrappers/backendCommunication";
import {BACKEND_URL} from "../../../../constants";


/* Material UI Imports ----------------------------------------------------------- */
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import LinearProgress from '@material-ui/core/LinearProgress';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


/* Component Imports ------------------------------------------------------------- */
import AdminContact from "./AdminContact";


/* Hook Linking Imports ---------------------------------------------------------- */
import PropTypes from "prop-types";
import withStyles from "@material-ui/styles/withStyles/withStyles";


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
	root: {
		flexGrow: 1,
	},
	wrapper: {
		display: "flex",
		position: 'relative',
		alignItems: "center",
		justifyContent: "center"
	},
	button: {
		color: "white"
	},
	buttonProgress: {
		position: 'absolute',
		top: '50%',
		left: '50%',
		marginTop: -12,
		marginLeft: -12,
	},
	divider: {
		marginTop: theme.spacing(2),
		marginBottom: theme.spacing(2)
	}
});


/* Component --------------------------------------------------------------------- */


class AdminContactUsPageManager extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			loading: true,
			contacts: [],
			creatingContact: false
		};

		this.updateState = this.updateState.bind(this);
		this.removeContactFromView = this.removeContactFromView.bind(this);
		this.createContact = this.createContact.bind(this);

		this.getContactList = this.getContactList.bind(this);
	}

	componentDidMount() {

		console.log("Fetching contact data");

		let params = {
			email: this.props.api.email,
			api_key: this.props.api.api_key
		};

		BackendGET(BACKEND_URL + "/backend/database/contact", params).then((resolveMessage) => {
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

	updateState(index, contact) {
		let contacts = this.state.contacts;
		// contacts[index] = contact;
		Object.assign(contacts[index], contact);
		this.setState({contacts: contacts});
	}

	removeContactFromView(index) {
		let newContacts = [];

		for (let i = 0; i < this.state.contacts.length; i++) {
			if (i === index) {
				continue;
			}
			newContacts.push(this.state.contacts[i]);
		}

		this.setState({contacts: newContacts});
	}

	createContact() {
		console.log("Creating new contact");

		this.setState({creatingContact: true});

		let params = {
			email: this.props.api.email,
			api_key: this.props.api.api_key
		};

		BackendREST(BACKEND_URL + "/backend/database/contact", params, "POST").then((resolveMessage) => {
			console.log("Creating new contact: Status = " + resolveMessage);

			let newContact = {
				role: "",
				name: "",
				email: "",
				visible: 0,
				id: JSON.parse(resolveMessage)["new_contact_id"]
			};

			let contacts = this.state.contacts;
			contacts.push(newContact);

			this.setState({
				creatingContact: false,
				contacts: contacts
			});
		}).catch(() => {
			console.log("Creating new contact: failed");
			this.setState({
				creatingContact: false,
			});
		});
	}


	getContactList() {

		let contactList = this.state.contacts.map((contact, index) => {
			return (
				<Grid item xs={12} sm={6} key={index}>
					<AdminContact api={this.props.api}
					              contact={contact}
					              index={index}
					              updateState={this.updateState}
					              removeContactFromView={this.removeContactFromView}/>
				</Grid>
			);
		});

		return (
			<Grid container spacing={2} justify="center">
				{contactList}
			</Grid>
		);
	}

	render() {

		const {classes} = this.props;

		return (
			<div className="AdminContactUsPage">
				<Typography variant="h4" className={classes.headline}>Contact Us</Typography>
				{this.state.loading && <LinearProgress className={classes.linearProgress} color="secondary"/>}
				<div className={classes.root}>
					{!this.state.loading && (
						<React.Fragment>
							<div className={classes.wrapper}>
								<Button variant="contained"
								        color="secondary"
								        disabled={this.state.creatingContact}
								        onClick={this.createContact}
								        className={classes.button}>Add Contact</Button>
								{this.state.creatingContact && (
									<CircularProgress size={24}
									                  className={classes.buttonProgress}
									                  color="secondary"/>
								)
								}
							</div>
							<Divider className={classes.divider}/>
							{this.getContactList()}
						</React.Fragment>
					)}
				</div>
			</div>
		);
	}
}

AdminContactUsPageManager.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdminContactUsPageManager);
