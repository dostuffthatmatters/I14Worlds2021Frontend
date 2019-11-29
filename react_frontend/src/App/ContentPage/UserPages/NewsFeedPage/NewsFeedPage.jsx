import React, {Component} from 'react';
import './NewsFeedPage.scss';
import {LinearProgress, Typography} from "@material-ui/core";

import {Card, CardContent, CardMedia} from "@material-ui/core";

import {Breakpoint} from 'react-socks';

import PropTypes from "prop-types";
import {withStyles} from "@material-ui/styles";
import {BackendGET} from "../../../../Wrappers/backendCommunication";
import {BACKEND_URL} from "../../../../constants";
import Grid from "@material-ui/core/Grid";


const styles = theme => ({
	headline: {
		display: "block",
		textAlign: "center",
		marginBottom: theme.spacing(4)
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


class NewsFeedPageManager extends Component {

	constructor(props) {
		super(props);

		this.state = {
			loading: true,
			articles: []
		};

		this.getArticleList = this.getArticleList.bind(this);
	}

	componentDidMount() {

		console.log("Fetching article data");

		BackendGET(BACKEND_URL + "/backend/database/article", {}).then((resolveMessage) => {
			console.log("Fetching contact data: successful");
			this.setState({
				loading: false,
				articles: JSON.parse(resolveMessage)["articles"]
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
				imageSrc = article.images[0];
			}

			return (
				<Grid item xs={12} key={index}>
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
				</Grid>
			);
		});

		return (
			<Grid container spacing={2}>
				{articleList}
			</Grid>
		);
	}

	render() {
		const {classes} = this.props;

		return (
			<div className="NewsFeedPage">
				<Typography variant="h3" className={classes.headline}>News Feed</Typography>
				{this.state.loading && <LinearProgress color="secondary"/>}
				<div className={classes.root}>
					{!this.state.loading && this.getArticleList()}
				</div>
			</div>
		);
	}
}

NewsFeedPageManager.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NewsFeedPageManager);
