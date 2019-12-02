import React, {Component} from 'react';
import {Card, Typography, CardMedia, CardContent} from "@material-ui/core";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/styles";

import clsx from 'clsx';
import {BackendREST} from "../../../../Wrappers/backendCommunication";
import {BACKEND_URL} from "../../../../constants";

import CheckBoxTwoToneIcon from '@material-ui/icons/CheckBoxTwoTone';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone';

import {Link} from 'react-router-dom';


import {Dialog, DialogTitle, DialogActions, Button} from "@material-ui/core";


const styles = theme => ({
	paper: {
		position: "relative"
	},
	invisiblePaper: {
		backgroundColor: "rgb(230, 230, 230)"
	},
	cardMedia: {
		height: 0,
		paddingTop: '66.666%', // 3:2
	},
	cardContent: {
		padding: theme.spacing(1),
		margin: 0,
		"&:last-child": {
			padding: theme.spacing(1),
		},
		display: "flex",
		position: "relative"
	},
	visibilityBox: {
		display: "flex",
		justifyContent: "left",
		alignItems: "center",
		flexDirection: "row",
		margin: theme.spacing(1),
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

class AdminContact extends Component {

	constructor(props) {
		super(props);

		this.state = {
			deleteDialogOpen: false,
		};

		this.toggleVisibility = this.toggleVisibility.bind(this);
		this.triggerRemove = this.triggerRemove.bind(this);
	}

	toggleVisibility() {
		let newVisibility;

		if (this.props.image.visible === 1) {
			newVisibility = 0;
		} else {
			newVisibility = 1;
		}

		let newImage = {
			description: this.props.image.description,
			timestamp: this.props.image.description,
			filepath_small: this.props.image.filepath_small,
			filepath_medium: this.props.image.filepath_medium,
			filepath_large: this.props.image.filepath_large,
			filepath_full: this.props.image.filepath_full,
			visible: newVisibility,
			id: this.props.image.id
		};
		this.props.updateState(this.props.index, newImage);

		let params = {
			email: this.props.api.email,
			api_key: this.props.api.api_key,

			image_id: this.props.image.id,
			image_visible: newVisibility
		};

		BackendREST(BACKEND_URL + "/backend/database/image", params, "PUT").then().catch();

	}

	triggerRemove() {

		console.log({props: this.props});
		let params = {
			email: this.props.api.email,
			api_key: this.props.api.api_key,
			image_id: this.props.image.id
		};

		BackendREST(BACKEND_URL + "/backend/database/image", params, "DELETE").then((resolveMessage) => {
			this.setState({
				deleteDialogOpen: false
			});
			this.props.removeImageFromView(this.props.index);
		}).catch((rejectmessage) => {
			this.setState({
				deleteDialogOpen: false
			});
		});
	}

	render() {

		const {classes} = this.props;

		return (
			<Card className={clsx(classes.paper, this.props.image.visible === 1 ? "" : classes.invisiblePaper)}
			      elevation={3}>
				<Link to={this.props.path}>
					<CardMedia
						className={classes.cardMedia}
						image={this.props.image.filepath_medium}
						alt={this.props.image.description}/>
				</Link>
				<CardContent className={classes.cardContent}>
					<div className={classes.visibilityBox}>
						{this.props.image.visible === 1 && (
							<CheckBoxTwoToneIcon onClick={this.toggleVisibility} className={classes.visibilityIcon}/>)}
						{this.props.image.visible === 0 && (
							<CheckBoxOutlineBlankIcon onClick={this.toggleVisibility}
							                          className={classes.visibilityIcon}/>)}
						<Typography className={classes.visibilityText}
						            variant="body1">{this.props.image.visible ? "Currently Visible" : "Currently Invisible"}</Typography>
					</div>
				</CardContent>
				<DeleteTwoToneIcon className={classes.removeIcon}
				                   onClick={() => this.setState({deleteDialogOpen: true})}/>
				{this.state.deleteDialogOpen && (
					<Dialog open={true}
					        aria-labelledby="alert-dialog-title">
						<DialogTitle id="alert-dialog-title">Do you really want to delete this image?</DialogTitle>
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

AdminContact.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdminContact);
