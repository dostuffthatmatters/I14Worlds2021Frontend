import React, {Component} from 'react';
import './AdminContactUsPage.scss';
import {Card, Typography, Divider} from "@material-ui/core";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/styles";
import TextField from "@material-ui/core/TextField";

import clsx from 'clsx';
import {BackendPUT, BackendREST} from "../../../../Wrappers/backendCommunication";
import {BACKEND_URL} from "../../../../constants";

import AssignmentTwoToneIcon from '@material-ui/icons/AssignmentTwoTone';
import PersonOutlineTwoToneIcon from '@material-ui/icons/PersonOutlineTwoTone';
import MailTwoToneIcon from '@material-ui/icons/MailTwoTone';

import CheckBoxTwoToneIcon from '@material-ui/icons/CheckBoxTwoTone';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone';


import {Dialog, DialogTitle, DialogActions, Button} from "@material-ui/core";


const styles = theme => ({
	paper: {
		position: "relative",
		padding: theme.spacing(2),
		minWidth: 300
	},
	invisiblePaper: {
		backgroundColor: "rgb(230, 230, 230)"
	},
	textField: {
		display: "inline-flex"
	},
	textFieldMarginTop: {
		marginTop: theme.spacing(2)
	},
	textFieldMarginBottom: {
		marginBottom: theme.spacing(2)
	},
	lineIcon: {
		position: "relative",
		marginRight: theme.spacing(2),
		marginBottom: theme.spacing(0.5),
		alignSelf: "flex-end"
	},
	iconInputBox: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "row",
	},
	visibilityBox: {
		display: "flex",
		justifyContent: "left",
		alignItems: "center",
		flexDirection: "row",
		marginTop: theme.spacing(2)
	},
	visibilityIcon: {
		marginRight: theme.spacing(2),
		cursor: "pointer",
		alignSelf: "flex-start"
	},
	visibilityText: {
		alignSelf: "flex-start"
	},
	removeIcon: {
		cursor: "pointer",
		position: "absolute",
		right: theme.spacing(2),
		bottom: theme.spacing(2),
	}
});

class Contact extends Component {

	constructor(props) {
		super(props);

		this.state = {
			deleteDialogOpen: false,
		};

		this.roleInputRef = React.createRef();
		this.nameInputRef = React.createRef();
		this.emailInputRef = React.createRef();

		this.pushCurrentVersion = this.pushCurrentVersion.bind(this);

		this.handleRoleKeyDown = this.handleRoleKeyDown.bind(this);
		this.handleNameKeyDown = this.handleNameKeyDown.bind(this);
		this.handleEmailKeyDown = this.handleEmailKeyDown.bind(this);

		this.handleRoleChange = this.handleRoleChange.bind(this);
		this.handleNameChange = this.handleNameChange.bind(this);
		this.handleEmailChange = this.handleEmailChange.bind(this);

		this.handleBlur = this.handleBlur.bind(this);

		this.toggleVisibility = this.toggleVisibility.bind(this);
		this.triggerRemove = this.triggerRemove.bind(this);
	}

	pushCurrentVersion() {
		let params = {
			email: this.props.api.email,
			api_key: this.props.api.api_key,

			contact_id: this.props.contact.id,
			contact_role: this.props.contact.role,
			contact_name: this.props.contact.name,
			contact_email: this.props.contact.email,
			contact_visible: this.props.contact.visible
		};

		console.log({contact_params: params});

		BackendPUT(BACKEND_URL + "/backend/database/contact", params).then().catch();
	}

	handleRoleChange(event) {
		let newContact = {
			role: event.target.value,
			name: this.props.contact.name,
			email: this.props.contact.email,
			visible: this.props.contact.visible,
			id: this.props.contact.id
		};
		this.props.updateState(this.props.index, newContact);
	}

	handleRoleKeyDown(event) {
		if (event.which === 13) {
			// enter
			event.preventDefault();
			this.roleInputRef.current.blur();
			// Changes will be pushed automatically on blur
		} else if (event.which === 9) {
			// tab
			event.preventDefault();
			this.roleInputRef.current.blur();
			this.nameInputRef.current.focus();
			// Changes will be pushed automatically on blur
		}
	}

	handleNameChange(event) {
		let newContact = {
			role: this.props.contact.role,
			name: event.target.value,
			email: this.props.contact.email,
			visible: this.props.contact.visible,
			id: this.props.contact.id
		};
		this.props.updateState(this.props.index, newContact);
	}

	handleNameKeyDown(event) {
		if (event.which === 13) {
			// enter
			event.preventDefault();
			this.nameInputRef.current.blur();
			// Changes will be pushed automatically on blur
		} else if (event.which === 9) {
			// tab
			event.preventDefault();
			this.nameInputRef.current.blur();
			this.emailInputRef.current.focus();
			// Changes will be pushed automatically on blur
		}
	}

	handleEmailChange(event) {
		let newContact = {
			role: this.props.contact.role,
			name: this.props.contact.name,
			email: event.target.value,
			visible: this.props.contact.visible,
			id: this.props.contact.id
		};
		this.props.updateState(this.props.index, newContact);
	}

	handleEmailKeyDown(event) {
		if (event.which === 13) {
			// enter
			event.preventDefault();
			this.emailInputRef.current.blur();
			// Changes will be pushed automatically on blur
		} else if (event.which === 9) {
			// tab
			event.preventDefault();
			this.emailInputRef.current.blur();
			this.roleInputRef.current.focus();
			// Changes will be pushed automatically on blur
		}
	}

	handleBlur() {
		this.pushCurrentVersion();
	}

	toggleVisibility() {
		let newVisibility;

		if (this.props.contact.visible === 1) {
			newVisibility = 0;
		} else {
			newVisibility = 1;
		}

		console.log({oldVisibility: this.props.contact.visible, newVisibility: newVisibility});

		let newContact = {
			role: this.props.contact.role,
			name: this.props.contact.name,
			email: this.props.contact.email,
			visible: newVisibility,
			id: this.props.contact.id
		};
		this.props.updateState(this.props.index, newContact);
		setTimeout(() => {
			this.pushCurrentVersion();
		}, 0.05);
	}

	triggerRemove() {
		let params = {
			email: this.props.api.email,
			api_key: this.props.api.api_key,
			contact_id: this.props.contact.id
		};

		BackendREST(BACKEND_URL + "/backend/database/contact", params, "DELETE").then(
			() => {
				this.props.removeContact(this.props.index);
			}
		).catch(
			() => {
				this.setState({
					deleteDialogOpen: false
				});
			}
		);
	}

	render() {

		const {classes} = this.props;

		return (
			<Card className={clsx(classes.paper, this.props.contact.visible === 1 ? "" : classes.invisiblePaper)}
			      elevation={3}>
				<div className={clsx(classes.iconInputBox, classes.textFieldMarginBottom)}>
					<AssignmentTwoToneIcon className={classes.lineIcon}/>
					<TextField fullWidth
					           label="Role"
					           value={this.props.contact.role}
					           onChange={this.handleRoleChange}
					           onKeyDown={this.handleRoleKeyDown}
					           onBlur={this.handleBlur}
					           inputRef={this.roleInputRef}
					           className={classes.textField}/>
				</div>
				<div className={clsx(classes.iconInputBox, classes.textFieldMarginTop, classes.textFieldMarginBottom)}>
					<PersonOutlineTwoToneIcon className={classes.lineIcon}/>
					<TextField fullWidth
					           label="Name"
					           value={this.props.contact.name}
					           onChange={this.handleNameChange}
					           onKeyDown={this.handleNameKeyDown}
					           onBlur={this.handleBlur}
					           inputRef={this.nameInputRef}
					           className={clsx(classes.textField)}/>
				</div>
				<div className={clsx(classes.iconInputBox, classes.textFieldMarginTop, classes.textFieldMarginBottom)}>
					<MailTwoToneIcon className={classes.lineIcon}/>
					<TextField fullWidth
					           label="Email"
					           value={this.props.contact.email}
					           onChange={this.handleEmailChange}
					           onKeyDown={this.handleEmailKeyDown}
					           onBlur={this.handleBlur}
					           inputRef={this.emailInputRef}
					           className={clsx(classes.textField)}/>
				</div>
				<Divider/>
				<div className={classes.visibilityBox}>
					{this.props.contact.visible === 1 && (
						<CheckBoxTwoToneIcon onClick={this.toggleVisibility} className={classes.visibilityIcon}/>)}
					{this.props.contact.visible === 0 && (
						<CheckBoxOutlineBlankIcon onClick={this.toggleVisibility} className={classes.visibilityIcon}/>)}
					<Typography className={classes.visibilityText}
					            variant="body1">{this.props.contact.visible ? "Currently Visible" : "Currently Invisible"}</Typography>
				</div>
				<DeleteTwoToneIcon className={classes.removeIcon}
				                   onClick={() => this.setState({deleteDialogOpen: true})}/>
				{this.state.deleteDialogOpen && (
					<Dialog open={true}
					        aria-labelledby="alert-dialog-title">
						<DialogTitle id="alert-dialog-title">Do you really want to delete this contact?</DialogTitle>
						<DialogActions>
							<Button onClick={() => this.setState({deleteDialogOpen: false})}
							        color="primary">Disagree</Button>
							<Button onClick={this.triggerRemove} color="secondary" autoFocus>Agree</Button>
						</DialogActions>
					</Dialog>
				)}
			</Card>
		);
	}
}

Contact.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Contact);
