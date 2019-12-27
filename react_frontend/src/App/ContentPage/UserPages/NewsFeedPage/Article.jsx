/* General Imports --------------------------------------------------------------- */
import React from "react";
import {animateScroll as scroll} from "react-scroll";


/* Routing Imports --------------------------------------------------------------- */
import {Link} from 'react-router-dom';


/* Material UI Imports ----------------------------------------------------------- */
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';

import ArrowBackIosTwoToneIcon from '@material-ui/icons/ArrowBackIosTwoTone';


/* Hook Linking Imports --------------------------------------------------------------- */
import PropTypes from "prop-types";
import withStyles from "@material-ui/styles/withStyles/withStyles";
// noinspection ES6CheckImport
import {withRouter} from "react-router-dom";
import ImageSlider from "../../ImageSlider/ImageSlider";
import clsx from "clsx";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";


/* Data -------------------------------------------------------------------------- */


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
	"</a>": "</a></strong>",
};


/* Styles ------------------------------------------------------------------------ */


const styles = theme => ({
	relativeContainer: {
		position: "relative",
	},
	backIcon: {
		position: "absolute",
		top: theme.spacing(1),
		left: theme.spacing(1),
	},
	headline: {
		marginLeft: theme.spacing(5),
		marginRight: theme.spacing(5),
		display: "block",
		textAlign: "center",
		marginBottom: theme.spacing(2)
	},
	card: {
		position: "relative",
		cursor: "pointer"
	},
	cardMedia: {
		height: 0,
		paddingTop: '66.666%', // 3:2
	},
	icon: {
		position: "absolute",
		color: "white",
		zIndex: 3000
	},
	prevIcon: {
		left: theme.spacing(1),
		bottom: theme.spacing(1),
		zIndex: "200",
	},
	nextIcon: {
		right: theme.spacing(1),
		bottom: theme.spacing(1),
		zIndex: "200",
	},
	articleContent: {
		marginTop: theme.spacing(4),
		marginBottom: theme.spacing(8),
	},
	articleCredit: {
		textAlign: "center"
	}
});


/* Component --------------------------------------------------------------------- */


class Article extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			imageSliderOpen: false,
			imageSliderIndex: 0
		};

		this.articleId = this.props.match.params.articleId;
		this.getArticleContent = this.getArticleContent.bind(this);

		this.openImageSlider = this.openImageSlider.bind(this);
		this.closeImageSlider = this.closeImageSlider.bind(this);
		this.newImageSliderIndex = this.newImageSliderIndex.bind(this);
	}

	openImageSlider() {
		this.props.hideWebsite(true);
		this.setState({
			imageSliderOpen: true
		});
	}

	closeImageSlider() {
		this.props.hideWebsite(false);
		this.setState({
			imageSliderOpen: false,
		});
	}

	newImageSliderIndex(newIndex) {
		this.setState({
			imageSliderIndex: newIndex,
		});
	}

	getArticleContent(article) {
		const {classes} = this.props;

		for (let stringToReplace in contentReplacements) {
			article.content_html = article.content_html.replace(stringToReplace, contentReplacements[stringToReplace]);
		}

		let headline = article.headline;
		if (headline.length === 0) {
			headline = "No Title"
		}

		return (

			<div className="ArticleView">
				<Container maxWidth="md" className={classes.relativeContainer}>
					<Link to="/news-feed"
					      className={classes.relativeContainer}
					      onClick={() => scroll.scrollToTop({duration: 300})}>
						<ArrowBackIosTwoToneIcon className={classes.backIcon} color="secondary"/>
					</Link>
					<Typography variant="h4" className={classes.headline}>{headline}</Typography>
					<Card elevation={3}
					      className={classes.card}>
						<CardMedia
							className={classes.cardMedia}
							image={article.images[this.state.imageSliderIndex]["filepath_large"]}
							alt={article.images[this.state.imageSliderIndex]["description"]}
							onClick={this.openImageSlider}
						/>
						{article.images.length > 1 && (
							<React.Fragment>
								<IconButton
									aria-label="previous image"
									className={clsx(classes.icon, classes.prevIcon)}
									size="medium"
									onClick={() => {
										let newIndex = this.state.imageSliderIndex - 1;
										if (newIndex < 0) {
											newIndex += article.images.length;
										}
										this.setState({loading: true});
										this.newImageSliderIndex(newIndex);
									}}>
									<ChevronLeftIcon/>
								</IconButton>
								<IconButton
									aria-label="next image"
									className={clsx(classes.icon, classes.nextIcon)}
									size="medium"
									onClick={() => {
										let newIndex = (this.state.imageSliderIndex + 1) % article.images.length;
										this.setState({loading: true});
										this.newImageSliderIndex(newIndex);
									}}>
									<ChevronRightIcon/>
								</IconButton>
							</React.Fragment>
						)}
					</Card>
					<div className={classes.articleContent + " ArticleContent"}
					     dangerouslySetInnerHTML={{__html: article.content_html}}/>
					<div className={classes.articleCredit}>
						<Typography variant="subtitle2"
						            className={classes.articleCredit}>By {article.author}</Typography>
					</div>
				</Container>
			</div>

		);
	}

	render() {

		const {classes} = this.props;
		const article = this.props.getArticleFromId(this.articleId);

		let articleContent;

		if (article === undefined) {
			articleContent = <Typography variant="h4" className={classes.headline}>Nothing here ...</Typography>;
		} else {
			articleContent = this.getArticleContent(article);
		}

		return (
			<React.Fragment>
				{!this.state.imageSliderOpen && (
					<div className="NewsFeedPage">
						{articleContent}
					</div>
				)}
				{this.state.imageSliderOpen && (
					<ImageSlider images={article["images"]}
					             imageSliderIndex={this.state.imageSliderIndex}
					             closeImageSlider={this.closeImageSlider}
					             newImageSliderIndex={newIndex => this.newImageSliderIndex(newIndex)}/>
				)}
			</React.Fragment>
		);
	}
}

Article.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(Article));