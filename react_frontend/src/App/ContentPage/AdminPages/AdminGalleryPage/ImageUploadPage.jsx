import React from 'react';

import 'date-fns';

import PropTypes from "prop-types";
import {withStyles} from "@material-ui/styles";
import {Typography, Divider, Button, TextField, CircularProgress, Card, CardContent} from "@material-ui/core";
import {Link} from "react-router-dom";

import Breakpoint from 'react-socks';

import ArrowBackIosTwoToneIcon from '@material-ui/icons/ArrowBackIosTwoTone';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

import DateFnsUtils from '@date-io/date-fns';

import {
	MuiPickersUtilsProvider,
	KeyboardTimePicker,
	KeyboardDatePicker,
} from '@material-ui/pickers';
import Grid from "@material-ui/core/Grid";


import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import {BackendImagePost} from "../../../../Wrappers/backendCommunication";
import {BACKEND_URL} from "../../../../constants";

import CheckBoxTwoToneIcon from '@material-ui/icons/CheckBoxTwoTone';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';


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
	uploadButtonWrapper: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center"
	}
});

class ImageUploadPage extends React.Component {
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

		this.handleDescriptionKeyDown = this.handleDescriptionKeyDown.bind(this);
		this.descriptionInputRef = React.createRef();

		this.processUpload = this.processUpload.bind(this);

		this.getUploadForm = this.getUploadForm.bind(this);
	}

	handleDescriptionKeyDown(event) {
		if (event.which === 13 || event.which === 9) {
			// enter || tab
			event.preventDefault();
			this.descriptionInputRef.current.blur();
		}
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

		console.log({formData: formData});

		BackendImagePost(BACKEND_URL + "/backend/database/image", formData).then((resolveMessage) => {
			console.log("Uploading image: Status = " + resolveMessage);

			this.setState({
				uploading: false,
				description: "",
				file: undefined,
			});
		}).catch((rejectMessage) => {
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
					       className={classes.hiddenInput}
					       id="select-file-button"
					       type="file"
					       onChange={(event) => this.setState({file: event.target.value})}
					/>
					<label htmlFor="select-file-button">
						<Button variant="contained"
						        color="default"
						        className={classes.selectButton}
						        startIcon={<CloudUploadIcon color="primary"/>}
						        component="span">
							{this.state.file === undefined ? "Select File" : this.state.file.split("\\").pop()}
						</Button>
					</label>
				</Grid>

				<Grid item className={classes.gridItem}>
					<FormControl className={classes.formControl}>
						<InputLabel id="demo-simple-select-label">Album</InputLabel>
						<Select
							labelId="demo-simple-select-label"
							id="demo-simple-select"
							value={this.state.albumId}
							onChange={(event) => this.setState({albumId: event.target.value})}>
							{this.props.albumIds.map((albumId, index) => (
								<MenuItem value={albumId}>{this.props.albumIdtoNameDict[albumId]}</MenuItem>
							))}
						</Select>
					</FormControl>
				</Grid>

				<Grid item className={classes.gridItem}>
					<DatePicker classes={classes}
					            timestamp={this.state.timestamp}
					            updateTimestamp={timestamp => this.setState({timestamp: timestamp})}/>
				</Grid>

				<Grid item className={classes.gridItem}>
					<TimePicker classes={classes}
					            timestamp={this.state.timestamp}
					            updateTimestamp={timestamp => this.setState({timestamp: timestamp})}/>
				</Grid>

				<Grid item xs={12} className={classes.gridItem}>
					<TextField fullWidth
					           className={classes.descriptionInput}
					           value={this.state.description}
					           inputRef={this.descriptionInputRef}
					           onChange={(event) => this.setState({description: event.target.value})}
					           onKeyDown={this.handleDescriptionKeyDown}
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
						        color={this.state.uploading ? "default" : "secondary"}
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
				<Breakpoint medium up>
					<Link to="/admin/gallery" onClick={this.props.triggerReload}>
						<ArrowBackIosTwoToneIcon className={classes.backIcon} color="secondary"/>
					</Link>
				</Breakpoint>
				<Typography variant="h4" className={classes.headline}>Image Upload</Typography>
				<Divider className={classes.divider}/>
				{this.getUploadForm()}
			</div>
		);
	}
}

ImageUploadPage.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImageUploadPage);


const DatePicker = (props) => {
	const [selectedDate, setSelectedDate] = React.useState(new Date(props.timestamp * 1000));

	const handleDateChange = date => {
		setSelectedDate(date);
		props.updateTimestamp(Math.round(date.getTime() / 1000));
	};

	return (
		<MuiPickersUtilsProvider utils={DateFnsUtils}>
			<KeyboardDatePicker
				className={props.classes.datepicker}
				margin="normal"
				id="date-picker"
				label="Date"
				format="dd/MM/yyyy"
				value={selectedDate}
				onChange={handleDateChange}
				KeyboardButtonProps={{
					'aria-label': 'change date',
				}}
			/>
		</MuiPickersUtilsProvider>
	);
};

const TimePicker = (props) => {
	const [selectedDate, setSelectedDate] = React.useState(new Date(props.timestamp * 1000));

	const handleDateChange = date => {
		setSelectedDate(date);
		props.updateTimestamp(Math.round(date.getTime() / 1000));
	};

	return (
		<MuiPickersUtilsProvider utils={DateFnsUtils}>
			<KeyboardTimePicker
				className={props.classes.timepicker}
				margin="normal"
				id="time-picker"
				label="Time"
				value={selectedDate}
				onChange={handleDateChange}
				KeyboardButtonProps={{
					'aria-label': 'change time',
				}}
			/>
		</MuiPickersUtilsProvider>
	);
}