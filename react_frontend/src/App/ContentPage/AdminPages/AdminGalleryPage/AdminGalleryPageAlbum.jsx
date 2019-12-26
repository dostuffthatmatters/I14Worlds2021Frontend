/* General Imports /* ------------------------------------------------------------ */
import React from 'react';


/* Routing Imports --------------------------------------------------------------- */
import {Link} from "react-router-dom";


/* AJAX Imports ------------------------------------------------------------------ */
import {BackendREST} from "../../../../Wrappers/backendCommunication";
import {BACKEND_URL} from "../../../../constants";


/* Material UI Imports ----------------------------------------------------------- */
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone';


/* Hook Linking Imports ---------------------------------------------------------- */
import PropTypes from "prop-types";
import withStyles from "@material-ui/styles/withStyles/withStyles";
import CircularProgress from "@material-ui/core/CircularProgress";


/* Styles ------------------------------------------------------------------------ */


const styles = theme => ({
	card: {
		position: "relative",
		cursor: "pointer",
		minWidth: 250
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
	textField: {
		alignSelf: "flex-end",
		marginRight: theme.spacing(4),
	},
	deleteIcon: {
		cursor: "pointer",
		position: "absolute",
		right: theme.spacing(1),
		bottom: theme.spacing(1),
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


class AdminGalleryPageAlbum extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			deleteDialogOpen: false,
			deleting: false,
		};

		this.nameInputRef = React.createRef();

		this.pushCurrentVersion = this.pushCurrentVersion.bind(this);

		this.handleNameKeyDown = this.handleNameKeyDown.bind(this);
		this.handleNameChange = this.handleNameChange.bind(this);

		this.handleBlur = this.handleBlur.bind(this);

		this.processDelete = this.processDelete.bind(this);
	}

	pushCurrentVersion() {
		let params = {
			email: this.props.api.email,
			api_key: this.props.api.api_key,

			album_id: this.props.album.id,
			album_name: this.props.album.name,
		};

		BackendREST(BACKEND_URL + "/backend/database/album", params, "PUT").then().catch();
	}

	handleNameChange(event) {
		let newAlbum = {
			id: this.props.album.id,
			name: event.target.value,
			image_count: this.props.album.image_count,
			visible_image_count: this.props.album.visible_image_count,
			title_image_id: this.props.album.title_image_id,
			image_id_to_index: this.props.album.image_id_to_index,
			images: this.props.album.images,
		};
		this.props.updateAlbumState(this.props.index, newAlbum);
	}

	handleNameKeyDown(event) {
		if (event.which === 13 || event.which === 9) {
			// enter
			event.preventDefault();
			this.nameInputRef.current.blur();
			// Changes will be pushed automatically on blur
		}
	}

	handleBlur() {
		this.pushCurrentVersion();
	}

	processDelete() {
		this.setState({
			deleting: true,
		});

		let params = {
			email: this.props.api.email,
			api_key: this.props.api.api_key,
			album_id: this.props.album.id
		};

		BackendREST(BACKEND_URL + "/backend/database/album", params, "DELETE").then(() => {
			setTimeout(() => {
				this.setState({
					deleteDialogOpen: false,
					deleting: false,
				});
				this.props.removeAlbumFromView(this.props.index);
			}, 1000);
		}).catch(() => {
			setTimeout(() => {
				this.setState({
					deleteDialogOpen: false,
					deleting: false,
				});
			}, 1000);
		})
	}

	render() {

		const {classes} = this.props;

		let imageSrc;

		if (this.props.album.title_image_id === 0) {
			imageSrc = "https://storage.googleapis.com/i14-worlds-2021-gallery/default-images/default-image-1-medium.jpg";
		} else {
			imageSrc = this.props.album.images[this.props.album.image_id_to_index[this.props.album.title_image_id]]["filepath_medium"];
		}

		return (
			<Card elevation={3} className={classes.card}>
				<Link to={this.props.path}>
					<CardMedia
						className={classes.cardMedia}
						image={imageSrc}
						alt={"Images inside " + this.props.album.name}
					/>
				</Link>
				<CardContent className={classes.cardContent}>
					<TextField fullWidth
					           label="Name"
					           value={this.props.album.name}
					           onChange={this.handleNameChange}
					           onKeyDown={this.handleNameKeyDown}
					           onBlur={this.handleBlur}
					           inputRef={this.nameInputRef}
					           className={classes.textField}/>
					<DeleteTwoToneIcon className={classes.deleteIcon}
					                   onClick={() => this.setState({deleteDialogOpen: true})}/>
				</CardContent>
				{this.state.deleteDialogOpen && (
					<Dialog open={true}
					        aria-labelledby="alert-dialog-title">
						<DialogTitle id="alert-dialog-title">Do you really want to delete this album?</DialogTitle>
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

AdminGalleryPageAlbum.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdminGalleryPageAlbum);
