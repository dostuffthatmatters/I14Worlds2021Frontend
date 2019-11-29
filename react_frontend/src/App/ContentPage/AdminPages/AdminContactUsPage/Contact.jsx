import React, {Component} from 'react';
import './AdminContactUsPage.scss';
import {Card} from "@material-ui/core";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/styles";
import TextField from "@material-ui/core/TextField";

import clsx from 'clsx';


const styles = theme => ({
	paper: {
		padding: theme.spacing(2),
		minWidth: 300,
	},
	textField: {
		display: "block"
	},
	textFieldMarginTop: {
		marginTop: theme.spacing(2)
	},
	textFieldMarginBottom: {
		marginBottom: theme.spacing(2)
	}
});

class Contact extends Component {

	constructor(props) {
		super(props);

		this.handleRoleChange = this.handleRoleChange.bind(this);
		this.handleNameChange = this.handleNameChange.bind(this);
		this.handleEmailChange = this.handleEmailChange.bind(this);
	}

	handleRoleChange(event) {
		let newContact = {
			role: event.target.value,
			name: this.props.contact.name,
			email: this.props.contact.email,
			visible: this.props.contact.visible
		};
		this.props.updateState(this.props.index, newContact);
	}

	handleNameChange(event) {
		let newContact = {
			role: this.props.contact.role,
			name: event.target.value,
			email: this.props.contact.email,
			visible: this.props.contact.visible
		};
		this.props.updateState(this.props.index, newContact);
	}

	handleEmailChange(event) {
		let newContact = {
			role: this.props.contact.role,
			name: this.props.contact.name,
			email: event.target.value,
			visible: this.props.contact.visible
		};
		this.props.updateState(this.props.index, newContact);
	}

	render() {

		const {classes} = this.props;

		return (
			<Card className={classes.paper} elevation={3}>
				<TextField fullWidth
				           label="Role"
				           value={this.props.contact.role}
				           onChange={this.handleRoleChange}
				           className={clsx(classes.textField, classes.textFieldMarginBottom)}/>
				<TextField fullWidth
				           label="Name"
				           value={this.props.contact.name}
				           onChange={this.handleNameChange}
				           className={clsx(classes.textField, classes.textFieldMarginTop, classes.textFieldMarginBottom)}/>
				<TextField fullWidth
				           label="Email"
				           value={this.props.contact.email}
				           onChange={this.handleEmailChange}
				           className={clsx(classes.textField, classes.textFieldMarginTop)}/>
			</Card>
		);
	}
}

Contact.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Contact);
