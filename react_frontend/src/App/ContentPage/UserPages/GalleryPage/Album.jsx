/* General Imports --------------------------------------------------------------- */
import React from 'react'
import {animateScroll as scroll} from 'react-scroll';


/* Routing Imports --------------------------------------------------------------- */
import {Link} from 'react-router-dom';


/* Material UI Imports ----------------------------------------------------------- */
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import ArrowBackIosTwoToneIcon from '@material-ui/icons/ArrowBackIosTwoTone';


/* Hook Linking Imports --------------------------------------------------------------- */
import PropTypes from "prop-types";
import withStyles from "@material-ui/styles/withStyles/withStyles";
// noinspection ES6CheckImport
import {withRouter} from "react-router-dom";
import ImageSlider from "../../ImageSlider/ImageSlider";

/* ------------------------------------------------------------------------------- */


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
	root: {
		flexGrow: 1,
	},
	card: {
		position: "relative",
		cursor: "pointer"
	},
	cardMedia: {
		height: 0,
		paddingTop: '66.666%', // 3:2
	}
});

class Album extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			imageSliderOpen: false,
			imageSliderIndex: undefined
		};

		this.albumId = this.props.match.params.albumId;
		this.getImageList = this.getImageList.bind(this);

		this.openImageSlider = this.openImageSlider.bind(this);
		this.closeImageSlider = this.closeImageSlider.bind(this);
		this.newImageSliderIndex = this.newImageSliderIndex.bind(this);
	}

	getImageList(album) {
		const {classes} = this.props;

		let imageList = album.images.map((image, index) => {
			if (image.visible === 0) {
				return "";
			}
			return (
				<Grid item xs={12} sm={6} md={4} lg={4} xl={4} key={index}>
					<Card elevation={3} className={classes.card} onClick={() => this.openImageSlider(index)}>
						<CardMedia
							className={classes.cardMedia}
							image={image.filepath_medium}
							title={image.description}
							alt={image.description}
						/>
					</Card>
				</Grid>
			);
		});

		return (
			<Grid container spacing={2}>
				{imageList}
			</Grid>
		);
	}

	openImageSlider(imageIndex) {
		this.props.hideWebsite(true);
		this.setState({
			imageSliderOpen: true,
			imageSliderIndex: imageIndex,
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

	render() {

		const {classes} = this.props;
		const album = this.props.getAlbumFromId(this.albumId);
		let albumContent;

		if (album === undefined) {
			albumContent = <Typography variant="h4" className={classes.headline}>Nothing here ...</Typography>;
		} else {
			let headline = album.name;
			if (headline.length === 0) {
				headline = "No Title"
			}
			albumContent = (
				<React.Fragment>
					<Typography variant="h4" className={classes.headline}>{headline}</Typography>
					{this.getImageList(album)}
				</React.Fragment>
			);
		}

		return (
			<React.Fragment>
				{!this.state.imageSliderOpen && (
					<div className="GalleryPage">
						<Link to="/gallery"
						      onClick={() => scroll.scrollToTop({duration: 300})}>
							<ArrowBackIosTwoToneIcon className={classes.backIcon} color="secondary"/>
						</Link>
						{albumContent}
					</div>
				)}
				{this.state.imageSliderOpen && (
					<ImageSlider images={album["images"]}
					             imageSliderIndex={this.state.imageSliderIndex}
					             closeImageSlider={this.closeImageSlider}
					             newImageSliderIndex={newIndex => this.newImageSliderIndex(newIndex)}/>
				)}

			</React.Fragment>
		);
	}
}


Album.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(Album));
