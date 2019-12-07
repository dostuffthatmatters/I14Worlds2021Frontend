/* General Imports --------------------------------------------------------------- */
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
	CircularProgress,
	Typography,
	Grid} from "@material-ui/core";
import ArrowBackIosTwoToneIcon from '@material-ui/icons/ArrowBackIosTwoTone';


/* Component Imports ------------------------------------------------------------- */
import {CustomSelect} from "../../../../Components/Forms/CustomSelect";
import {CustomDatePicker} from "../../../../Components/Forms/CustomDatePicker";
import {CustomTimePicker} from "../../../../Components/Forms/CustomTimePicker";
import {CustomTextField} from "../../../../Components/Forms/CustomTextField";


/* Hook Linking Imports ---------------------------------------------------------- */
import PropTypes from "prop-types";
import withStyles from "@material-ui/styles/withStyles/withStyles";
import withRouter from "react-router-dom/withRouter";


/* Styles ------------------------------------------------------------------------ */


const styles = theme => ({
	backIcon: {
		position: "absolute",
		top: theme.spacing(1),
		left: theme.spacing(1),
	},
	headline: {
		display: "block",
		textAlign: "center",
		marginBottom: theme.spacing(4)
	},
	divider: {
		marginTop: theme.spacing(2),
		marginBottom: theme.spacing(4)
	},
	card: {
		position: "relative",
		width: "100%"
	},
	cardContent: {
		paddingTop: theme.spacing(2),
		paddingRight: theme.spacing(0),
		paddingBottom: theme.spacing(2),
		paddingLeft: theme.spacing(0),
		margin: 0,
		"&:last-child": {
			paddingTop: theme.spacing(2),
			paddingRight: theme.spacing(0),
			paddingBottom: theme.spacing(2),
			paddingLeft: theme.spacing(0),
		},
		display: "flex",
		position: "relative"
	},
	hiddenInput: {
		display: "none"
	},
	selectButton: {
		color: theme.palette.primary.main,
	},
	gridItem: {
		display: "flex",
		position: 'relative',
		alignItems: "center",
		justifyContent: "center",
		marginLeft: theme.spacing(2),
		marginRight: theme.spacing(2),
	},
	formControl: {
		minWidth: 250,
		marginTop: theme.spacing(1),
	},
	datepicker: {
		minWidth: 250,
	},
	timepicker: {
		minWidth: 250,
	},
	descriptionInput: {
		marginTop: theme.spacing(1),
	},
	buttonSpinnerWrapper: {
		position: 'relative',
		display: "inline-flex",
		marginTop: theme.spacing(3),
		marginLeft: theme.spacing(0.5),
		marginRight: theme.spacing(0.5),
	},
	button: {
		color: "white",
		position: 'relative',
		display: "inline-flex"
	},
	buttonProgress: {
		position: 'absolute',
		top: '50%',
		left: '50%',
		marginTop: -12,
		marginLeft: -12,
	},
	saveButtonWrapper: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center"
	},
	cardMedia: {
		height: 0,
		paddingTop: '66.666%', // 3:2
	}
});


/* Component --------------------------------------------------------------------- */


class EditImagePage extends React.Component {

	constructor(props) {
		super(props);

		this.albumId = this.props.match.params.albumId;
		this.imageId = this.props.match.params.imageId;

		// Description, Timestamp and albumId will only be added
		// to the PUT request when they have been changed - meaning,
		// when they are not undefined anymore
		this.state = {
			description: undefined,
			timestamp: undefined,
			albumId: this.albumId,
			saving: false,
		};

		this.descriptionInputRef = React.createRef();

		this.processSave = this.processSave.bind(this);
		this.getImageForm = this.getImageForm.bind(this);
	}

	processSave() {
		console.log("Saving image");

		this.setState({saving: true});

		let params = {
			email: this.props.api.email,
			api_key: this.props.api.api_key,

			image_id: this.imageId
		};

		let changesDetected = false;

		if (this.state.description !== undefined) {
			params.image_description = this.state.description;
			changesDetected = true;
		}

		if (this.state.albumId !== undefined) {
			params.image_album_id = this.state.albumId;
			changesDetected = true;
		}

		if (this.state.timestamp !== undefined) {
			params.image_timestamp = this.state.timestamp;
			changesDetected = true;
		}

		if (!changesDetected) {
			this.setState({saving: false});
			return;
		}

		BackendREST(BACKEND_URL + "/backend/database/image", params, "PUT").then((resolveMessage) => {
			console.log("Saving image: Status = " + resolveMessage);

			if (this.state.albumId !== undefined && this.state.albumId !== this.albumId) {
				window.open("/admin/gallery/" + this.state.albumId + "/" + this.imageId, "_self");
			} else {
				if (this.state.description !== undefined) {
					this.props.album.images[this.props.album["image_id_to_index_dict"][this.imageId]]["description"] = this.state.description;
				}
				if (this.state.timestamp !== undefined) {
					this.props.album.images[this.props.album["image_id_to_index_dict"][this.imageId]]["timestamp"] = this.state.timestamp;
				}
				this.setState({
					description: undefined,
					timestamp: undefined,
					saving: false,
				});
			}
		}).catch(() => {
			console.log("Saving image: failed");
			this.setState({
				saving: false,
			});
		});
	}

	getImageForm(image) {

		const {classes} = this.props;

		let formContent = (
			<Grid container spacing={1} justify="center" alignItems="center">

				<Grid item className={classes.gridItem}>
					<CustomSelect
						label="Album"
						value={this.state.albumId}
						selectOptions={this.props.albumIdtoNameDict}
						onChange={newValue => this.setState({albumId: newValue})}
						className={classes.formControl}/>
				</Grid>

				<Grid item className={classes.gridItem}>
					<CustomDatePicker
						timestamp={this.state.timestamp === undefined ? parseInt(image.timestamp) : this.state.timestamp}
						updateTimestamp={timestamp => this.setState({timestamp: timestamp})}
						className={classes.datepicker}/>
				</Grid>

				<Grid item className={classes.gridItem}>
					<CustomTimePicker
						timestamp={this.state.timestamp === undefined ? parseInt(image.timestamp) : this.state.timestamp}
						updateTimestamp={timestamp => this.setState({timestamp: timestamp})}
						className={classes.timepicker}/>
				</Grid>

				<Grid item xs={12} className={classes.gridItem}>
					<CustomTextField
						fullWidth={true}
						className={classes.descriptionInput}
						value={this.state.description === undefined ? image.description : this.state.description}
						ref={this.descriptionInputRef}
						onChange={value => this.setState({description: value})}
						onEnter={() => this.descriptionInputRef.current.blur()}
						onTab={() => this.descriptionInputRef.current.blur()}
						onEscape={() => this.descriptionInputRef.current.blur()}
						label="Description"/>
				</Grid>
			</Grid>
		);

		return (
			<React.Fragment>
				<Card elevation={3} className={classes.card}>
					<CardMedia
						className={classes.cardMedia}
						image={image.filepath_large}
						alt={image.filepath_large}
					/>
					<CardContent className={classes.cardContent}>
						{formContent}
					</CardContent>
				</Card>
				<div className={classes.saveButtonWrapper}>
					<div className={classes.buttonSpinnerWrapper}>
						<Button variant="contained"
						        color={this.state.saving ? "default" : "secondary"}
						        onClick={this.processSave}
						        className={classes.button}>Save Changes</Button>
						{this.state.saving && (
							<CircularProgress size={24}
							                  className={classes.buttonProgress}
							                  color="secondary"/>
						)
						}
					</div>
				</div>
			</React.Fragment>
		);
	}

	render() {

		const {classes} = this.props;

		console.log({album: this.props.album, state: this.state});

		let image;
		let imagePageContent;

		if (this.props.album !== undefined) {
			image = this.props.album.images[this.props.album["image_id_to_index_dict"][this.imageId]];
		}

		if (this.props.album === undefined || image === undefined) {
			imagePageContent = (
				<React.Fragment>
					<Typography variant="h4" className={classes.headline}>Nothing here ...</Typography>
				</React.Fragment>
			);
		} else {
			imagePageContent = (
				<React.Fragment>
					<Typography variant="h4" className={classes.headline}>Edit Image</Typography>
					{this.getImageForm(image)}
				</React.Fragment>
			);
		}

		return (
			<div className="AdminGalleryPage">
				<Link to={"/admin/gallery/" + this.albumId}>
					<ArrowBackIosTwoToneIcon className={classes.backIcon} color="secondary"/>
				</Link>
				{imagePageContent}
			</div>
		);


	}
}

EditImagePage.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(EditImagePage));


