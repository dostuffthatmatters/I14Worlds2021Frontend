/* General Imports --------------------------------------------------------------- */
import React from "react";
import {animateScroll as scroll} from "react-scroll";


/* Routing Imports --------------------------------------------------------------- */
import {Link} from "react-router-dom";


/* Styling Imports --------------------------------------------------------------- */
import clsx from 'clsx';


/* AJAX Imports ------------------------------------------------------------------ */
import {BackendREST} from "../../../../Wrappers/backendCommunication";
import {BACKEND_URL} from "../../../../constants";


/* Material UI Imports ----------------------------------------------------------- */
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import ArrowBackIosTwoToneIcon from '@material-ui/icons/ArrowBackIosTwoTone';
import CheckBoxTwoToneIcon from '@material-ui/icons/CheckBoxTwoTone';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';


/* Component Imports ------------------------------------------------------------- */
import {CustomDatePicker} from "../../../../Components/Forms/CustomDatePicker";
import {CustomTimePicker} from "../../../../Components/Forms/CustomTimePicker";
import {CustomTextField} from "../../../../Components/Forms/CustomTextField";
import ImageSelector from './ImageSelector';


/* Hook Linking Imports ---------------------------------------------------------- */
import PropTypes from "prop-types";
import withStyles from "@material-ui/styles/withStyles/withStyles";
// noinspection ES6CheckImport
import {withRouter} from "react-router-dom";


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
		marginTop: theme.spacing(2),
		display: "flex",
		alignItems: "center",
		justifyContent: "center"
	}
});


/* Component --------------------------------------------------------------------- */


class EditArticlePage extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			uploading: false,
			deleting: false,
			deleteDialogOpen: false,

			headline: undefined,
			content: undefined,
			timestamp: undefined,
			visible: undefined,
			author: undefined,
			selectedImageIds: undefined,
			favoriteImageId: undefined,
		};

		this.articleId = this.props.match.params.articleId;
		this.getArticleForm = this.getArticleForm.bind(this);

		this.headlineInputRef = React.createRef();
		this.contentInputRef = React.createRef();
		this.authorInputRef = React.createRef();

		this.processUpload = this.processUpload.bind(this);
		this.processDelete = this.processDelete.bind(this);

		this.getArticleForm = this.getArticleForm.bind(this);
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

		if (this.state.selectedImageIds !== undefined) {
			params.article_selected_image_ids = this.state.selectedImageIds;
		}

		if (this.state.favoriteImageId !== undefined) {
			params.article_favorite_image_id = this.state.favoriteImageId;
		}

		BackendREST(BACKEND_URL + "/backend/database/article", params, "PUT").then((resolveMessage) => {
			const resolveJson = JSON.parse(resolveMessage);
			console.log("Saving article: Status = " + resolveJson["Status"]);
			setTimeout(() => {
				this.setState({
					uploading: false
				});
			}, 1000);
		}).catch(() => {
			console.log("Saving article: failed");
			setTimeout(() => {
				this.setState({
					uploading: false
				});
			}, 1000);
		});
	}

	processDelete() {
		console.log("Removing Article");

		this.setState({deleting: true});

		let params = {
			email: this.props.api.email,
			api_key: this.props.api.api_key,

			article_id: this.articleId,
		};

		BackendREST(BACKEND_URL + "/backend/database/article", params, "DELETE").then((resolveMessage) => {
			const resolveJson = JSON.parse(resolveMessage);
			console.log("Removing article: Status = " + resolveJson["Status"]);
			setTimeout(() => {
				scroll.scrollToTop({duration: 300});
				window.open("/admin/news-feed", "_self");
			}, 1000);
		}).catch(() => {
			console.log("Removing article: failed");
			setTimeout(() => {
				this.setState({
					deleting: false,
				});
			}, 1000);
		});
	}

	getArticleForm(article) {

		const {classes} = this.props;

		let formContent = (
			<Grid container spacing={2} justify="center" alignItems="center">

				<Grid item xs={12} className={classes.gridItem}>
					<CustomTextField
						fullWidth={true}
						label="Headline"

						className={classes.headlineInput}
						value={this.state.headline === undefined ? article.headline : this.state.headline}
						ref={this.headlineInputRef}

						onChange={value => this.setState({headline: value})}
						onEnter={() => this.contentInputRef.current.focus()}
						onTab={() => this.contentInputRef.current.focus()}
						onEscape={() => this.headlineInputRef.current.blur()}/>
				</Grid>

				<Grid item xs={12} className={classes.gridItem}>
					<CustomTextField
						fullWidth={true}
						label="Content"
						multiline={true}
						rowsMax="12"

						className={classes.contentInput}
						value={this.state.content === undefined ? article.content_markdown : this.state.content}
						ref={this.contentInputRef}

						onChange={value => this.setState({content: value})}
						onTab={() => null}
						onEscape={() => this.contentInputRef.current.blur()}/>

				</Grid>

				<Grid item className={classes.gridItem}>
					<CustomDatePicker
						timestamp={this.state.timestamp === undefined ? article.timestamp : this.state.timestamp}
						updateTimestamp={timestamp => this.setState({timestamp: timestamp})}
						className={classes.datepicker}/>
				</Grid>

				<Grid item className={classes.gridItem}>
					<CustomTimePicker
						timestamp={this.state.timestamp === undefined ? article.timestamp : this.state.timestamp}
						updateTimestamp={timestamp => this.setState({timestamp: timestamp})}
						className={classes.timepicker}/>
				</Grid>

				<Grid item className={clsx(classes.gridItem, classes.visibilityBox)}>
					<div className={classes.visibilityBox}>
						{(this.state.visible === undefined ? article.visible : this.state.visible) === 1 && (
							<CheckBoxTwoToneIcon onClick={() => this.setState({visible: 0})}
							                     className={classes.visibilityIcon}/>)}
						{(this.state.visible === undefined ? article.visible : this.state.visible) === 0 && (
							<CheckBoxOutlineBlankIcon onClick={() => this.setState({visible: 1})}
							                          className={classes.visibilityIcon}/>)}
						<Typography className={classes.visibilityText}
						            variant="body1">
							{(this.state.visible === undefined ? article.visible : this.state.visible) ? "Currently Visible" : "Currently Invisible"}
						</Typography>
					</div>
				</Grid>

				<Grid item className={classes.gridItem}>
					<CustomTextField
						fullWidth={false}
						label="Author"

						className={classes.authorInput}
						value={this.state.author === undefined ? article.author : this.state.author}
						ref={this.authorInputRef}

						onChange={value => this.setState({author: value})}
						onEnter={() => this.authorInputRef.current.blur()}
						onTab={() => this.authorInputRef.current.blur()}
						onEscape={() => this.authorInputRef.current.blur()}/>
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
						        disabled={this.state.uploading}
						        color="secondary"
						        onClick={this.processUpload}
						        className={classes.button}>Save Post</Button>
						{this.state.uploading && (
							<CircularProgress size={24}
							                  className={classes.buttonProgress}
							                  color="secondary"/>
						)}
					</div>
				</div>
				<div className={classes.uploadButtonWrapper}>
					<Button variant="contained"
					        color="default"
					        disabled={this.state.uploading}
					        onClick={() => this.setState({deleteDialogOpen: true})}
					        className={classes.button}>Remove Post</Button>
				</div>
				{this.state.deleteDialogOpen && (
					<Dialog open={true}
					        aria-labelledby="alert-dialog-title">
						<DialogTitle id="alert-dialog-title">Do you really want to delete this post?</DialogTitle>
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

		let headline = this.state.headline === undefined ? article.headline : this.state.headline;
		if (headline.length === 0) {
			headline = "No Title"
		}

		let selectedImageIds = this.state.selectedImageIds === undefined ? article.selected_image_ids : this.state.selectedImageIds;
		let favoriteImageId = this.state.favoriteImageId === undefined ? article.favorite_image_id : this.state.favoriteImageId;

		return (
			<div className="AdminNewsFeedPage">
				<Link to="/admin/news-feed"
				      onClick={() => {
				      	scroll.scrollToTop({duration: 300});
				      	this.props.triggerReload();
				      }}>
					<ArrowBackIosTwoToneIcon className={classes.backIcon} color="secondary"/>
				</Link>
				<Typography variant="h4" className={classes.headline}>{headline}</Typography>
				<Divider className={classes.divider}/>
				{articleContent}
				<Divider className={classes.divider}/>
				<ImageSelector api={this.props.api}
				               selectedImageIds={selectedImageIds}
				               favoriteImageId={favoriteImageId}
				               updateFavoriteImageId={(newFavoriteImageId) => this.setState({favoriteImageId: newFavoriteImageId})}
				               updateSelectedImageIds={(newSelectedImageIds) => this.setState({selectedImageIds: newSelectedImageIds})}/>
			</div>
		);
	}
}

EditArticlePage.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(EditArticlePage));




