import React, {Component} from 'react';
import './AdminContactUsPage.scss';
import {LinearProgress, Typography} from "@material-ui/core";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/styles";
import {BackendGET} from "../../../../Wrappers/backendCommunication";
import {BACKEND_URL} from "../../../../constants";
import Grid from "@material-ui/core/Grid";

import Contact from "./Contact";


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
	}
});

class AdminContactUsPageManager extends Component {

	constructor(props) {
		super(props);

		this.state = {
			loading: true,
			contacts: []
		};

		this.updateState = this.updateState.bind(this);
		this.removeContact = this.removeContact.bind(this);

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
		}).catch((rejectMessage) => {
			console.log("Fetching contact data: failed");
			this.setState({
				loading: false
			});
		});

	}

	updateState(index, contact) {
		let contacts = this.state.contacts;
		console.log({oldContacts: contacts, index: index, newContact: contact});

		contacts[index] = contact;
		this.setState({contacts: contacts});
	}

	removeContact(index) {
		let contacts = this.state.contacts;
		contacts.splice(index, 1);
		this.setState({contacts: contacts});
	}



	getContactList() {

		let contactList = this.state.contacts.map((contact, index) => {
			return (
				<Grid item xs key={index}>
					<Contact api={this.props.api} contact={contact} index={index} updateState={this.updateState}/>
				</Grid>
			);
		});

		return (
			<Grid container spacing={2}>
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
					{!this.state.loading && this.getContactList()}
				</div>
			</div>
		);
	}
}

AdminContactUsPageManager.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdminContactUsPageManager);
