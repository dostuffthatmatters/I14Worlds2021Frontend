
/* General Imports --------------------------------------------------------------- */
import React from 'react';


/* Routing Imports --------------------------------------------------------------- */
import Switch from 'react-router-dom/Switch';
import Route from 'react-router-dom/Route';
import Link from 'react-router-dom/Link';


/* Styling Imports --------------------------------------------------------------- */
import './NewsFeedPage.scss';
import {Breakpoint} from 'react-socks';


/* AJAX Imports ------------------------------------------------------------------ */
import {BackendGET} from "../../../../Wrappers/backendCommunication";
import {BACKEND_URL} from "../../../../constants";


/* Material UI Imports ----------------------------------------------------------- */
import {
	LinearProgress,
	Typography,
	Card,
	CardContent,
	CardMedia,
	Grid} from "@material-ui/core";


/* Component Imports ------------------------------------------------------------- */
import Article from './Article';


/* Hook Linking Imports --------------------------------------------------------------- */
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
		bottom: theme.spacing(2),
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


class NewsFeedPageManager extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			loading: true,
			articles: [],
			articleIdtoIndex: {}
		};

		this.getArticleList = this.getArticleList.bind(this);
		this.getArticleFromId = this.getArticleFromId.bind(this);
	}

	componentDidMount() {

		console.log("Fetching article data");

		BackendGET(BACKEND_URL + "/backend/database/article", {}).then((resolveMessage) => {
			console.log("Fetching contact data: successful");
			this.setState({
				loading: false,
				articles: JSON.parse(resolveMessage)["articles"],
				articleIdtoIndex: JSON.parse(resolveMessage)["article_id_to_index"]
			});
		}).catch((rejectMessage) => {
			console.log("Fetching contact data: failed");
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
					<Link to={"/news-feed/" + article.id}>
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
				<Route exact strict path="/news-feed">
					<div className="NewsFeedPage">
						<Typography variant="h4" className={classes.headline}>News Feed</Typography>
						{this.state.loading && <LinearProgress className={classes.linearProgress} color="secondary"/>}
						<div className={classes.root}>
							{!this.state.loading && this.getArticleList()}
						</div>
					</div>
				</Route>
				<Route path={"/news-feed/:articleId"}>
					{this.state.loading && (
						<React.Fragment>
							<Typography variant="h4" className={classes.headline}>Gallery</Typography>
							<LinearProgress className={classes.linearProgress} color="secondary"/>
						</React.Fragment>
					)}
					{!this.state.loading && (
						<Article getArticleFromId={this.getArticleFromId}/>
					)}
				</Route>
			</Switch>
		);
	}
}

NewsFeedPageManager.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NewsFeedPageManager);
