/* General Imports --------------------------------------------------------------- */
import React from 'react';


/* Styling Imports --------------------------------------------------------------- */
import './AdminContactUsPage.scss';
import clsx from 'clsx';


/* AJAX Imports ------------------------------------------------------------------ */
import {BackendREST} from "../../../../Wrappers/backendCommunication";
import {BACKEND_URL} from "../../../../constants";


/* Material UI Imports ----------------------------------------------------------- */
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import AssignmentTwoToneIcon from '@material-ui/icons/AssignmentTwoTone';
import PersonOutlineTwoToneIcon from '@material-ui/icons/PersonOutlineTwoTone';
import MailTwoToneIcon from '@material-ui/icons/MailTwoTone';
import CheckBoxTwoToneIcon from '@material-ui/icons/CheckBoxTwoTone';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone';


/* Component Imports ------------------------------------------------------------- */
import {CustomTextField} from "../../../../Components/Forms/CustomTextField";


/* Hook Linking Imports --------------------------------------------------------------- */
import PropTypes from "prop-types";
import withStyles from "@material-ui/styles/withStyles/withStyles";
import CircularProgress from "@material-ui/core/CircularProgress";

/* ------------------------------------------------------------------------------- */


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
	},
	buttonSpinnerWrapper: {
		position: 'relative',
		display: "inline-flex",
		marginLeft: theme.spacing(0.5),
		marginRight: theme.spacing(0.5),
	},
	buttonProgress: {
		position: 'absolute',
		top: '50%',
		left: '50%',
		marginTop: -12,
		marginLeft: -12,
	},
});

class AdminContact extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			deleteDialogOpen: false,
			deleting: false,
		};

		this.roleInputRef = React.createRef();
		this.nameInputRef = React.createRef();
		this.emailInputRef = React.createRef();

		this.pushCurrentVersion = this.pushCurrentVersion.bind(this);

		this.toggleVisibility = this.toggleVisibility.bind(this);
		this.processDelete = this.processDelete.bind(this);
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

		BackendREST(BACKEND_URL + "/backend/database/contact", params, "PUT").then((resolveMessage) => {
			console.log("Pushing current version: Status = " + resolveMessage);
		}).catch((rejectMessage) => {
			console.log("Pushing current version: Failed");
		});
	}

	toggleVisibility() {
		let newVisibility;

		if (this.props.contact.visible === 1) {
			newVisibility = 0;
		} else {
			newVisibility = 1;
		}

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

	processDelete() {
		this.setState({
			deleting: true,
		});

		let params = {
			email: this.props.api.email,
			api_key: this.props.api.api_key,
			contact_id: this.props.contact.id
		};

		BackendREST(BACKEND_URL + "/backend/database/contact", params, "DELETE").then((resolveMessage) => {
			setTimeout(() => {
				this.setState({
					deleteDialogOpen: false,
					deleting: false,
				});
				this.props.removeContactFromView(this.props.index);
			}, 1000);
		}).catch((rejectmessage) => {
			setTimeout(() => {
				this.setState({
					deleteDialogOpen: false,
					deleting: false,
				});
			}, 1000);
		});
	}

	render() {

		const {classes} = this.props;

		return (
			<Card className={clsx(classes.paper, this.props.contact.visible === 1 ? "" : classes.invisiblePaper)}
			      elevation={3}>
				<div className={clsx(classes.iconInputBox, classes.textFieldMarginBottom)}>
					<AssignmentTwoToneIcon className={classes.lineIcon}/>
					<CustomTextField
						fullWidth={true}
						label="Role"
						className={classes.textField}
						value={this.props.contact.role}
						ref={this.roleInputRef}
						onChange={value => this.props.updateState(this.props.index, {role: value})}
						onEnter={() => this.nameInputRef.current.focus()}
						onTab={() => this.nameInputRef.current.focus()}
						onEscape={() => this.roleInputRef.current.blur()}
						onBlur={() => this.pushCurrentVersion()}
					/>
				</div>
				<div className={clsx(classes.iconInputBox, classes.textFieldMarginTop, classes.textFieldMarginBottom)}>
					<PersonOutlineTwoToneIcon className={classes.lineIcon}/>
					<CustomTextField
						fullWidth={true}
						label="Name"
						className={classes.textField}
						value={this.props.contact.name}
						ref={this.nameInputRef}
						onChange={value => this.props.updateState(this.props.index, {name: value})}
						onEnter={() => this.emailInputRef.current.focus()}
						onTab={() => this.emailInputRef.current.focus()}
						onEscape={() => this.nameInputRef.current.blur()}
						onBlur={() => this.pushCurrentVersion()}
					/>
				</div>
				<div className={clsx(classes.iconInputBox, classes.textFieldMarginTop, classes.textFieldMarginBottom)}>
					<MailTwoToneIcon className={classes.lineIcon}/>
					<CustomTextField
						fullWidth={true}
						label="Email"
						className={classes.textField}
						value={this.props.contact.email}
						ref={this.emailInputRef}
						onChange={value => this.props.updateState(this.props.index, {email: value})}
						onEnter={() => this.emailInputRef.current.blur()}
						onTab={() => this.emailInputRef.current.blur()}
						onEscape={() => this.emailInputRef.current.blur()}
						onBlur={() => this.pushCurrentVersion()}
					/>
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
							        disabled={this.state.deleting}
							        color="primary">Disagree</Button>
							<div className={classes.buttonSpinnerWrapper}>
								<Button onClick={this.processDelete}
								        disabled={this.state.deleting}
								        autoFocus>Agree</Button>
								{this.state.deleting && (
									<CircularProgress size={24}
									                  className={classes.buttonProgress}
									                  color="secondary"/>
								)}
							</div>
						</DialogActions>
					</Dialog>
				)}
			</Card>
		);
	}
}

AdminContact.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdminContact);
