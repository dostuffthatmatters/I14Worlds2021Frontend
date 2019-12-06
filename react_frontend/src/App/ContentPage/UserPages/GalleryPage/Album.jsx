
/* General Imports --------------------------------------------------------------- */
import React from 'react'


/* Routing Imports --------------------------------------------------------------- */
import Link from 'react-router-dom/Link';


/* Material UI Imports ----------------------------------------------------------- */
import {
	Card,
	CardMedia,
	Typography,
	Grid} from "@material-ui/core";
import ArrowBackIosTwoToneIcon from '@material-ui/icons/ArrowBackIosTwoTone';


/* Hook Linking Imports --------------------------------------------------------------- */
import PropTypes from "prop-types";
import withStyles from "@material-ui/styles/withStyles/withStyles";
import withRouter from "react-router-dom/withRouter";


/* ------------------------------------------------------------------------------- */


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

		this.albumId = this.props.match.params.albumId;
		this.getImageList = this.getImageList.bind(this);
	}

	getImageList(album) {
		const {classes} = this.props;

		let imageList = album.images.map((image, index) => {
			if (image.visible === 0) {
				return "";
			}
			return (
				<Grid item xs={12} sm={6} md={4} lg={4} xl={4} key={index}>
					<Card elevation={3} className={classes.card}>
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

	render() {

		const {classes} = this.props;
		const album = this.props.getAlbumFromId(this.albumId);
		let albumContent;

		if (album === undefined) {
			albumContent = <Typography variant="h4" className={classes.headline}>Nothing here ...</Typography>;
		} else {
			albumContent = (
				<React.Fragment>
					<Typography variant="h4" className={classes.headline}>{album.name}</Typography>
					{this.getImageList(album)}
				</React.Fragment>
			);
		}

		return (
			<div className="GalleryPage">
				<Link to="/gallery">
					<ArrowBackIosTwoToneIcon className={classes.backIcon} color="secondary"/>
				</Link>
				{albumContent}
			</div>
		);
	}
}


Album.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(Album));
