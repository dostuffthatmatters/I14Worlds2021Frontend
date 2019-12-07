
/* General Imports /* ------------------------------------------------------------ */
import React from 'react';


/* Routing Imports --------------------------------------------------------------- */
import Link from "react-router-dom/Link";


/* AJAX Imports ------------------------------------------------------------------ */
import {BackendREST} from "../../../../Wrappers/backendCommunication";
import {BACKEND_URL} from "../../../../constants";


/* Material UI Imports ----------------------------------------------------------- */
import {
	Button,
	Card,
	CardContent,
	CardMedia,
	Dialog,
	DialogTitle,
	DialogActions,
	TextField} from "@material-ui/core";
import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone';


/* Hook Linking Imports ---------------------------------------------------------- */
import PropTypes from "prop-types";
import withStyles from "@material-ui/styles/withStyles/withStyles";


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
});


/* Component --------------------------------------------------------------------- */


class AdminGalleryPageAlbum extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			deleteDialogOpen: false,
		};

		this.nameInputRef = React.createRef();

		this.pushCurrentVersion = this.pushCurrentVersion.bind(this);

		this.handleNameKeyDown = this.handleNameKeyDown.bind(this);
		this.handleNameChange = this.handleNameChange.bind(this);

		this.handleBlur = this.handleBlur.bind(this);

		this.triggerRemove = this.triggerRemove.bind(this);
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
			name: event.target.value,
			id: this.props.album.id,
			image_count: this.props.album.image_count,
			visible_image_count: this.props.album.visible_image_count,
			title_image_paths: this.props.album.title_image_paths,
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

	triggerRemove() {
		let params = {
			email: this.props.api.email,
			api_key: this.props.api.api_key,
			album_id: this.props.album.id
		};

		BackendREST(BACKEND_URL + "/backend/database/album", params, "DELETE").then(() => {
			this.setState({
				deleteDialogOpen: false
			});
			this.props.removeAlbumFromView(this.props.index);
		}).catch(() => {
			this.setState({
				deleteDialogOpen: false
			});
		});
	}

	render() {

		const {classes} = this.props;

		return (
			<Card elevation={3} className={classes.card}>
				<Link to={this.props.path}>
					<CardMedia
						className={classes.cardMedia}
						image={this.props.album.title_image_paths.filepath_medium}
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
							        color="primary">Disagree</Button>
							<Button onClick={this.triggerRemove}
							        color="secondary"
							        autoFocus>Agree</Button>
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
