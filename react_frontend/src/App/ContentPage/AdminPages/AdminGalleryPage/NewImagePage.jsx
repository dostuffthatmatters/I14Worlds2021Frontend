/* General Imports --------------------------------------------------------------- */
import React from 'react';
import 'date-fns';
import {animateScroll as scroll} from "react-scroll";


/* Routing Imports --------------------------------------------------------------- */
import {Link} from "react-router-dom";


/* AJAX Imports ------------------------------------------------------------------ */
import {BackendImagePost} from "../../../../Wrappers/backendCommunication";
import {BACKEND_URL} from "../../../../constants";


/* Material UI Imports ----------------------------------------------------------- */
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import ArrowBackIosTwoToneIcon from '@material-ui/icons/ArrowBackIosTwoTone';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';


/* Component Imports ------------------------------------------------------------- */
import {CustomSelect} from '../../../../Components/Forms/CustomSelect';
import {CustomDatePicker} from '../../../../Components/Forms/CustomDatePicker';
import {CustomTimePicker} from '../../../../Components/Forms/CustomTimePicker';
import {CustomTextField} from "../../../../Components/Forms/CustomTextField";


/* Hook Linking Imports ---------------------------------------------------------- */
import PropTypes from "prop-types";
import withStyles from "@material-ui/styles/withStyles/withStyles";


/* Styles ------------------------------------------------------------------------ */


const styles = theme => ({
	backIcon: {
		position: "absolute",
		top: theme.spacing(1),
		left: theme.spacing(1),
	},
	headline: {
		paddingLeft: theme.spacing(5),
		paddingRight: theme.spacing(5),
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
	uploadButtonWrapper: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center"
	}
});


/* Component --------------------------------------------------------------------- */


class NewImagePage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			uploading: false,
			description: "",
			timestamp: Math.round(Date.now() / 1000),
			albumId: this.props.albumIds[0],
			file: undefined,
			visible: 1
		};

		this.descriptionInputRef = React.createRef();

		this.processUpload = this.processUpload.bind(this);
		this.getUploadForm = this.getUploadForm.bind(this);
	}

	processUpload() {
		console.log("Uploading image");

		this.setState({uploading: true});

		// Ein FormData Objekt erzeugen.
		let formData = new FormData();

		// Die ausgeählten Dateien aus dem input-Element laden
		let fileSelect = document.getElementById("select-file-button");
		let files = fileSelect.files;

		// Only exactly 1 file is allowed
		if (files.length !== 1) {
			this.setState({uploading: false});
			return;
		}

		formData.append("email", this.props.api.email);
		formData.append("api_key", this.props.api.api_key);

		formData.append('image_file', files[0], files[0].name);
		formData.append("image_timestamp", this.state.timestamp);
		formData.append("image_description", this.state.description);
		formData.append("image_album_id", this.state.albumId);
		formData.append("image_visible", this.state.visible);

		BackendImagePost(BACKEND_URL + "/backend/database/image", formData).then(resolveMessage => {
			console.log("Uploading image: Status = " + resolveMessage);

			this.setState({
				uploading: false,
				description: "",
				file: undefined,
			});
		}).catch(() => {
			console.log("Uploading image: failed");
			this.setState({
				uploading: false,
			});
		});
	}

	getUploadForm() {

		const {classes} = this.props;

		let formContent = (
			<Grid container spacing={1} justify="center" alignItems="center">

				<Grid item xs={12} className={classes.gridItem}>
					<input accept="image/*"
					       disabled={this.state.uploading}
					       className={classes.hiddenInput}
					       id="select-file-button"
					       type="file"
					       onChange={(event) => this.setState({file: event.target.value})}
					/>
					<label htmlFor="select-file-button">
						<Button variant="contained"
						        color="default"
						        disabled={this.state.uploading}
						        className={classes.selectButton}
						        startIcon={<CloudUploadIcon color="primary"/>}
						        component="span">
							{this.state.file === undefined ? "Select File" : this.state.file.split("\\").pop()}
						</Button>
					</label>
				</Grid>

				<Grid item className={classes.gridItem}>
					<CustomSelect label="Album"
					              disabled={this.state.uploading}
					              value={this.state.albumId}
					              selectOptions={this.props.albumIdtoNameDict}
					              onChange={newValue => this.setState({albumId: newValue})}
					              className={classes.formControl}/>
				</Grid>

				<Grid item className={classes.gridItem}>
					<CustomDatePicker disabled={this.state.uploading}
					                  timestamp={this.state.timestamp}
					                  updateTimestamp={timestamp => this.setState({timestamp: timestamp})}
					                  className={classes.datepicker}/>
				</Grid>

				<Grid item className={classes.gridItem}>
					<CustomTimePicker disabled={this.state.uploading}
					                  timestamp={this.state.timestamp}
					                  updateTimestamp={timestamp => this.setState({timestamp: timestamp})}
					                  className={classes.timepicker}/>
				</Grid>

				<Grid item xs={12} className={classes.gridItem}>
					<CustomTextField
						fullWidth={true}
						className={classes.descriptionInput}
						disabled={this.state.uploading}
						value={this.state.description}
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
					<CardContent className={classes.cardContent}>
						{formContent}
					</CardContent>
				</Card>
				<div className={classes.uploadButtonWrapper}>
					<div className={classes.buttonSpinnerWrapper}>
						<Button variant="contained"
						        color="secondary"
						        disabled={this.state.uploading}
						        onClick={this.processUpload}
						        className={classes.button}>Upload Image</Button>
						{this.state.uploading && (
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

		return (
			<div className="AdminGalleryPage">
				<Link to="/admin/gallery"
				      onClick={() => {
					      this.props.triggerReload();
					      scroll.scrollToTop({duration: 300});
				      }}>
					<ArrowBackIosTwoToneIcon className={classes.backIcon} color="secondary"/>
				</Link>
				<Typography variant="h4" className={classes.headline}>Image Upload</Typography>
				<Divider className={classes.divider}/>
				{this.getUploadForm()}
			</div>
		);
	}
}

NewImagePage.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NewImagePage);
