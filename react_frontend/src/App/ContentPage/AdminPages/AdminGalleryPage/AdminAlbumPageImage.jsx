/* General Imports --------------------------------------------------------------- */
import React from 'react';


/* Routing Imports --------------------------------------------------------------- */
import {Link} from "react-router-dom";


/* Styling Imports --------------------------------------------------------------- */
import clsx from 'clsx';


/* AJAX Imports ------------------------------------------------------------------ */
import {BackendREST} from "../../../../Wrappers/backendCommunication";
import {BACKEND_URL} from "../../../../constants";


/* Material UI Imports ----------------------------------------------------------- */
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import CheckBoxTwoToneIcon from '@material-ui/icons/CheckBoxTwoTone';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

/* Hook Linking Imports ---------------------------------------------------------- */
import PropTypes from "prop-types";
import withStyles from "@material-ui/styles/withStyles/withStyles";
import CircularProgress from "@material-ui/core/CircularProgress";


/* Styles ------------------------------------------------------------------------ */


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
	},
	favoriteIcon: {
		cursor: "pointer",
		position: "absolute",
		right: theme.spacing(2),
		top: theme.spacing(2),
		color: theme.palette.desireMagenta.transparent80,
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


/* Component --------------------------------------------------------------------- */


class AdminAlbumPageImage extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			deleteDialogOpen: false,
			deleting: false,
		};

		this.toggleTitleImage = this.toggleTitleImage.bind(this);
		this.toggleVisibility = this.toggleVisibility.bind(this);
		this.processDelete = this.processDelete.bind(this);
	}

	toggleTitleImage() {

		let newTitleImageId = this.props.titleImage ? 0 : this.props.image.id;

		let params = {
			email: this.props.api.email,
			api_key: this.props.api.api_key,

			album_id: this.props.albumId,
			album_title_image_id: newTitleImageId,
		};

		this.props.updateTitleImageId(newTitleImageId);

		BackendREST(BACKEND_URL + "/backend/database/album", params, "PUT").then().catch();
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

	processDelete() {
		this.setState({
			deleting: true,
		});

		let params = {
			email: this.props.api.email,
			api_key: this.props.api.api_key,
			image_id: this.props.image.id
		};

		BackendREST(BACKEND_URL + "/backend/database/image", params, "DELETE").then(() => {
			setTimeout(() => {
				this.setState({
					deleteDialogOpen: false,
					deleting: false,
				});
				this.props.removeImageFromView(this.props.index);
			}, 1000);
		}).catch(() => {
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
			<Card className={clsx(classes.paper, this.props.image.visible === 1 ? "" : classes.invisiblePaper)}
			      elevation={3}>
				<Link to={"/admin/gallery/" + this.props.albumId + "/" + this.props.image.id}>
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
				{this.props.titleImage && (
					<FavoriteIcon className={classes.favoriteIcon}
					              onClick={this.toggleTitleImage}/>
				)}
				{!this.props.titleImage && (
					<FavoriteBorderIcon className={classes.favoriteIcon}
					              onClick={this.toggleTitleImage}/>
				)}
				{this.state.deleteDialogOpen && (
					<Dialog open={true}
					        aria-labelledby="alert-dialog-title">
						<DialogTitle id="alert-dialog-title">Do you really want to delete this image?</DialogTitle>
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

AdminAlbumPageImage.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdminAlbumPageImage);
