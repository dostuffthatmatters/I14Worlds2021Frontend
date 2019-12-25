
/* General Imports --------------------------------------------------------------- */
import React from 'react';


/* Routing Imports --------------------------------------------------------------- */
// noinspection ES6CheckImport
import {Switch, Route, Link} from 'react-router-dom';

/* Styling Imports --------------------------------------------------------------- */
import './AdminNewsFeedPage.scss';
import {Breakpoint} from 'react-socks';

/* AJAX Imports ------------------------------------------------------------------ */
import {BackendGET} from "../../../../Wrappers/backendCommunication";
import {BACKEND_URL} from "../../../../constants";


/* Material UI Imports ----------------------------------------------------------- */
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


/* Component Imports ------------------------------------------------------------- */
import EditArticlePage from './EditArticlePage';
import NewArticlePage from "./NewArticlePage";


/* Hook Linking Imports ---------------------------------------------------------- */
import PropTypes from "prop-types";
import withStyles from "@material-ui/styles/withStyles/withStyles";


/* Styles ------------------------------------------------------------------------ */


const styles = theme => ({
	headline: {
		display: "block",
		textAlign: "center",
		marginBottom: theme.spacing(4)
	},
	linearProgress: {
		borderRadius: "2px"
	},
	buttonRow: {
		display: "flex",
		position: 'relative',
		alignItems: "center",
		justifyContent: "center"
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
	divider: {
		marginTop: theme.spacing(2),
		marginBottom: theme.spacing(2)
	},
	card: {
		display: 'flex',
		cursor: "pointer"
	},
	cardContentRight: {
		position: "relative",
		height: theme.spacing(16),
		marginBottom: theme.spacing(2),
		textOverflow: "ellipsis",
		overflow: "hidden",
		whiteSpace: "no-wrap",
		maxWidth: `calc(100% - ${theme.spacing(32)}px)`,
	},
	cardContentBottom: {
		position: "relative",
		maxHeight: theme.spacing(18),
		marginBottom: theme.spacing(2),
		textOverflow: "ellipsis",
		overflow: "hidden",
		whiteSpace: "no-wrap",
		maxWidth: `100%`,
	},
	cardContent: {
		paddingTop: theme.spacing(2),
		paddingRight: theme.spacing(2),
		paddingBottom: theme.spacing(1),
		paddingLeft: theme.spacing(2),
		margin: 0,
		"&:last-child": {
			paddingBottom: theme.spacing(2),
		}
	},
	cardContentOverlay: {
		position: "absolute",
		left: 0,
		bottom: "-1px",
		width: "100%",
		height: theme.spacing(4),
		background: "linear-gradient(0deg, rgba(255,255,255,1.0), rgba(255,255,255,0.0))",
	},
	cardImageLeft: {
		height: theme.spacing(18),
		width: theme.spacing(32),
	},
	cardImageTop: {
		height: 0,
		paddingTop: '56.25%', // 16:9
	},
});


/* Component --------------------------------------------------------------------- */


class AdminNewsFeedPageManager extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			loading: true,
			articles: [],
			articleIdtoIndex: {}
		};

		this.triggerReload = this.triggerReload.bind(this);

		this.getArticleList = this.getArticleList.bind(this);
		this.getArticleFromId = this.getArticleFromId.bind(this);
	}

	componentDidMount() {
		this.triggerReload();
	}

	triggerReload() {

		this.setState({loading: true});

		console.log("Fetching article data");

		const params = {
			email: this.props.api.email,
			api_key: this.props.api.api_key,
		};

		BackendGET(BACKEND_URL + "/backend/database/article", params).then((resolveMessage) => {
			console.log("Fetching article data: successful");
			this.setState({
				loading: false,
				articles: JSON.parse(resolveMessage)["articles"],
				articleIdtoIndex: JSON.parse(resolveMessage)["article_id_to_index"]
			});
		}).catch(() => {
			console.log("Fetching article data: failed");
			this.setState({
				loading: false
			});
		});

	}

	getArticleList() {

		const {classes} = this.props;

		let articleList = this.state.articles.map((article, index) => {
			let imageSrc;

			if (article.images.length === 0) {
				imageSrc = "https://wallpaperaccess.com/full/25637.jpg";
			} else {
				imageSrc = article.images[0]["filepath_medium"];
			}

			return (
				<Grid item xs={12} key={index}>
					<Link to={"/admin/news-feed/" + article.id}>
						<Breakpoint small down>
							<Card elevation={3}>
								<CardMedia
									className={classes.cardImageTop}
									image={imageSrc}
								/>
								<div className={classes.cardContentBottom}>
									<div className={classes.cardContentOverlay}/>
									<CardContent className={classes.cardContent}>
										<Typography component="h5" variant="h5">
											{article.headline}
										</Typography>
										<Typography variant="subtitle1" color="textSecondary">
											{article.content_plain}
										</Typography>
									</CardContent>
								</div>
							</Card>
						</Breakpoint>
						<Breakpoint medium up>
							<Card className={classes.card} elevation={3}>
								<CardMedia
									className={classes.cardImageLeft}
									image={imageSrc}
								/>
								<div className={classes.cardContentRight}>
									<div className={classes.cardContentOverlay}/>
									<CardContent className={classes.cardContent}>
										<Typography component="h5" variant="h5">
											{article.headline}
										</Typography>
										<Typography variant="subtitle1" color="textSecondary">
											{article.content_plain}
										</Typography>
									</CardContent>
								</div>
							</Card>
						</Breakpoint>
					</Link>
				</Grid>
			);
		});

		return (
			<Grid container spacing={2}>
				{articleList}
			</Grid>
		);
	}

	getArticleFromId(articleId) {
		return this.state.articles[this.state.articleIdtoIndex[articleId]];
	}

	render() {
		const {classes} = this.props;

		return (
			<Switch>
				<Route exact path="/admin/news-feed">
					<div className="NewsFeedPage">
						<Typography variant="h4" className={classes.headline}>News Feed</Typography>
						{this.state.loading && <LinearProgress className={classes.linearProgress} color="secondary"/>}
						{!this.state.loading && (
							<div className={classes.root}>
								<div className={classes.buttonRow}>
									<div className={classes.buttonSpinnerWrapper}>
										<Link to="/admin/news-feed/new">
											<Button variant="contained"
											        color="secondary"
											        className={classes.button}>Add Post</Button>
										</Link>
									</div>
								</div>
								<Divider className={classes.divider}/>
								{this.getArticleList()}
							</div>
						)}
					</div>
				</Route>
				<Route exact path="/admin/news-feed/new">
					{this.state.loading && (
						<React.Fragment>
							<Typography variant="h4" className={classes.headline}>News Feed</Typography>
							<LinearProgress className={classes.linearProgress} color="secondary"/>
						</React.Fragment>
					)}
					{!this.state.loading && (
						<NewArticlePage api={this.props.api}/>
					)}
				</Route>
				<Route path={"/admin/news-feed/:articleId"}>
					{this.state.loading && (
						<React.Fragment>
							<Typography variant="h4" className={classes.headline}>News Feed</Typography>
							<LinearProgress className={classes.linearProgress} color="secondary"/>
						</React.Fragment>
					)}
					{!this.state.loading && (
						<EditArticlePage api={this.props.api}
						                 getArticleFromId={this.getArticleFromId}
						                 triggerReload={this.triggerReload}/>
					)}
				</Route>
			</Switch>
		);
	}
}

AdminNewsFeedPageManager.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdminNewsFeedPageManager);
