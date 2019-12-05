import React, {Component} from "react";
import {
	Button,
	Card,
	CardContent,
	CardMedia,
	CircularProgress,
	Container, Divider,
	TextField,
	Typography
} from "@material-ui/core";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/styles";
import {Link, withRouter} from "react-router-dom";

import Breakpoint from 'react-socks';
import clsx from 'clsx';

import ArrowBackIosTwoToneIcon from '@material-ui/icons/ArrowBackIosTwoTone';
import {BackendREST} from "../../../../Wrappers/backendCommunication";
import {BACKEND_URL} from "../../../../constants";
import Grid from "@material-ui/core/Grid";
import {KeyboardDatePicker, KeyboardTimePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

import CheckBoxTwoToneIcon from '@material-ui/icons/CheckBoxTwoTone';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';

const contentReplacements = {
	"<h6>": "<h6 class='MuiTypography-root MuiTypography-h6'>",
	"<h5>": "<h5 class='MuiTypography-root MuiTypography-h5'>",
	"<h4>": "<h4 class='MuiTypography-root MuiTypography-h4'>",
	"<h3>": "<h3 class='MuiTypography-root MuiTypography-h3'>",
	"<h2>": "<h2 class='MuiTypography-root MuiTypography-h2'>",
	"<h1>": "<h1 class='MuiTypography-root MuiTypography-h1'>",
	"<p>": "<p class='MuiTypography-root MuiTypography-body1'>",
	"<a href=": "<strong><a href=",
	"<a target=": "<strong><a target=",
	"</a>": "</a><strong>",
};


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
		minWidth: 250,
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
	visibilityBox: {
		display: "flex",
		justifyContent: "flex-start",
		alignItems: "center",
		flexDirection: "row",
		marginTop: theme.spacing(2),
	},
	visibilityIcon: {
		marginRight: theme.spacing(1),
		cursor: "pointer",
		alignSelf: "flex-start"
	},
	visibilityText: {
		alignSelf: "flex-start"
	},
	authorInput: {
		width: 250,
		marginLeft: theme.spacing(2),
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


class EditArticlePage extends Component {

	constructor(props) {
		super(props);

		this.state = {
			uploading: false,
			headline: undefined,
			content: undefined,
			timestamp: undefined,
			visible: undefined,
			author: undefined
		};

		this.articleId = this.props.match.params.articleId;
		this.getArticleForm = this.getArticleForm.bind(this);

		this.handleHeadlineKeyDown = this.handleHeadlineKeyDown.bind(this);
		this.headlineInputRef = React.createRef();

		this.handleContentKeyDown = this.handleContentKeyDown.bind(this);
		this.contentInputRef = React.createRef();

		this.handleAuthorKeyDown = this.handleAuthorKeyDown.bind(this);
		this.authorInputRef = React.createRef();

		this.processUpload = this.processUpload.bind(this);
		this.getArticleForm = this.getArticleForm.bind(this);
	}

	handleHeadlineKeyDown(event) {
		if (event.which === 13 || event.which === 27) {
			// enter || escape
			event.preventDefault();
			this.headlineInputRef.current.blur();
		} else if (event.which === 9) {
			// tab
			event.preventDefault();
			this.contentInputRef.current.focus();
		}
	}

	handleContentKeyDown(event) {
		if (event.which === 27) {
			//escape
			event.preventDefault();
			this.contentInputRef.current.blur();
		}
	}

	handleAuthorKeyDown(event) {
		if (event.which === 13 || event.which === 27 || event.which === 9) {
			// enter || escape || tab
			event.preventDefault();
			this.authorInputRef.current.blur();
		}
	}

	processUpload() {
		console.log("Saving Article");

		this.setState({uploading: true});

		let params = {
			email: this.props.api.email,
			api_key: this.props.api.api_key,

			article_id: this.articleId,
		};

		if (this.state.headline !== undefined) {
			params.article_headline = this.state.headline;
		}

		if (this.state.content !== undefined) {
			params.article_content = this.state.content;
		}

		if (this.state.timestamp !== undefined) {
			params.article_timestamp = this.state.timestamp;
		}

		if (this.state.visible !== undefined) {
			params.article_visible = this.state.visible;
		}

		if (this.state.author !== undefined) {
			params.article_author = this.state.author;
		}

		console.log(params);

		BackendREST(BACKEND_URL + "/backend/database/article", params, "PUT").then((resolveMessage) => {
			const resolveJson = JSON.parse(resolveMessage);
			console.log("Saving article: Status = " + resolveJson["Status"]);

			this.setState({
				uploading: false
			});
		}).catch((rejectMessage) => {
			console.log("Saving article: failed");
			this.setState({
				uploading: false,
			});
		});
	}

	getArticleForm(article) {

		const {classes} = this.props;

		let formContent = (
			<Grid container spacing={2} justify="center" alignItems="center">

				<Grid item xs={12} className={classes.gridItem}>
					<TextField fullWidth
					           className={classes.headlineInput}
					           value={this.state.headline === undefined ? article.headline: this.state.headline}
					           inputRef={this.headlineInputRef}
					           onChange={(event) => this.setState({headline: event.target.value})}
					           onKeyDown={this.handleHeadlineKeyDown}
					           label="Headline"/>
				</Grid>

				<Grid item xs={12} className={classes.gridItem}>
					<TextField fullWidth
					           multiline
					           rowsMax="12"
					           className={classes.contentInput}
					           value={this.state.content === undefined ? article.content_markdown: this.state.content}
					           inputRef={this.contentInputRef}
					           onChange={(event) => this.setState({content: event.target.value})}
					           onKeyDown={this.handleContentKeyDown}
					           label="Content"/>
				</Grid>

				<Grid item className={classes.gridItem}>
					<DatePicker classes={classes}
					            timestamp={this.state.timestamp === undefined ? article.timestamp: this.state.timestamp}
					            updateTimestamp={timestamp => this.setState({timestamp: timestamp})}/>
				</Grid>

				<Grid item className={classes.gridItem}>
					<TimePicker classes={classes}
					            timestamp={this.state.timestamp === undefined ? article.timestamp: this.state.timestamp}
					            updateTimestamp={timestamp => this.setState({timestamp: timestamp})}/>
				</Grid>

				<Grid item className={clsx(classes.gridItem, classes.visibilityBox)}>
					<div className={classes.visibilityBox}>
						{(this.state.visible === undefined ? article.visible: this.state.visible) === 1 && (
							<CheckBoxTwoToneIcon onClick={() => this.setState({visible: 0})}
							                     className={classes.visibilityIcon}/>)}
						{(this.state.visible === undefined ? article.visible: this.state.visible) === 0 && (
							<CheckBoxOutlineBlankIcon onClick={() => this.setState({visible: 1})}
							                          className={classes.visibilityIcon}/>)}
						<Typography className={classes.visibilityText}
						            variant="body1">
							{(this.state.visible === undefined ? article.visible: this.state.visible) ? "Currently Visible" : "Currently Invisible"}
						</Typography>
					</div>
				</Grid>

				<Grid item className={classes.gridItem}>
					<TextField className={classes.authorInput}
					           value={this.state.author === undefined ? article.author: this.state.author}
					           inputRef={this.authorInputRef}
					           onChange={(event) => this.setState({author: event.target.value})}
					           onKeyDown={this.handleAuthorKeyDown}
					           label="Author"/>
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
						        className={classes.button}>Save Post</Button>
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
		const article = this.props.getArticleFromId(this.articleId);

		let articleContent;

		if (article === undefined) {
			articleContent = <Typography variant="h4" className={classes.headline}>Nothing here ...</Typography>;
		} else {
			articleContent = this.getArticleForm(article);
		}

		return (
			<div className="AdminGalleryPage">
				<Breakpoint medium up>
					<Link to="/admin/news-feed" onClick={this.props.triggerReload}>
						<ArrowBackIosTwoToneIcon className={classes.backIcon} color="secondary"/>
					</Link>
				</Breakpoint>
				<Typography variant="h4" className={classes.headline}>
					{this.state.headline === undefined ? article.headline: this.state.headline}
				</Typography>
				<Divider className={classes.divider}/>
				{articleContent}
			</div>
		);
	}
}

EditArticlePage.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(EditArticlePage));




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
};


