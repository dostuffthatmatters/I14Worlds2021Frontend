/* General Imports --------------------------------------------------------------- */
import React from 'react';
import {animateScroll as scroll} from "react-scroll";


/* Routing Imports --------------------------------------------------------------- */
// noinspection ES6CheckImport
import {Switch, Route, Link} from 'react-router-dom';


/* Material UI Imports ----------------------------------------------------------- */
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import ArrowBackIosTwoToneIcon from '@material-ui/icons/ArrowBackIosTwoTone';


/* Component Imports ------------------------------------------------------------- */
import AdminAlbumPageImage from "./AdminAlbumPageImage";
import EditImagePage from './EditImagePage';


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
	divider: {
		marginTop: theme.spacing(2),
		marginBottom: theme.spacing(2)
	},
	card: {
		position: "relative",
		cursor: "pointer",
		minWidth: 250
	},
	cardMedia: {
		height: 0,
		paddingTop: '66.666%', // 3:2
	},
	cardContent: {
		padding: theme.spacing(1),
		margin: 0,
		"&:last-child": {
			padding: theme.spacing(1),
		},
		display: "flex",
		position: "relative"
	},
	textField: {
		alignSelf: "flex-end",
		marginRight: theme.spacing(4),
	},
	deleteIcon: {
		cursor: "pointer",
		position: "absolute",
		right: theme.spacing(1),
		bottom: theme.spacing(1),
	},
	visibilityBox: {
		display: "flex",
		justifyContent: "left",
		alignItems: "center",
		flexDirection: "row",
		marginTop: theme.spacing(2)
	},
	visibilityIcon: {
		marginRight: theme.spacing(2),
		cursor: "pointer",
		alignSelf: "flex-start"
	},
	visibilityText: {
		alignSelf: "flex-start"
	},
	removeIcon: {
		cursor: "pointer",
		position: "absolute",
		right: theme.spacing(2),
		bottom: theme.spacing(2),
	}
});


/* Component --------------------------------------------------------------------- */


class AdminAlbumPage extends React.Component {

	constructor(props) {
		super(props);

		this.albumId = this.props.match.params.albumId;

		this.getImageList = this.getImageList.bind(this);
		this.updateState = this.updateState.bind(this);
		this.removeImageFromView = this.removeImageFromView.bind(this);
	}

	getImageList(album) {
		const {classes} = this.props;

		if (album.images.length === 0) {
			return <Typography variant="h6" className={classes.headline}>No images ...</Typography>;
		}

		let imageList = album.images.map((image, index) => {
			return (
				<Grid item xs={12} sm={6} md={4} lg={4} xl={4} key={index}>
					<AdminAlbumPageImage albumId={this.albumId}
					                     titleImage={album.title_image_id === image.id}
					                     updateTitleImageId={newId => this.props.updateTitleImageId(album.id, newId)}
					                     image={image}
					                     index={index}
					                     updateState={this.updateState}
					                     api={this.props.api}
					                     removeImageFromView={this.removeImageFromView}/>
				</Grid>
			);
		});

		return (
			<Grid container spacing={2}>
				{imageList}
			</Grid>
		);
	}

	updateState(index, image) {
		this.props.updateImageState(this.albumId, index, image);
	}

	removeImageFromView(index) {
		this.props.removeImageFromView(this.albumId, index);
	}

	render() {

		const {classes} = this.props;

		const album = this.props.getAlbumFromId(this.albumId);
		let albumContent;

		if (album === undefined) {
			albumContent = (
				<React.Fragment>
					<Typography variant="h4" className={classes.headline}>Nothing here ...</Typography>
				</React.Fragment>
			);
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
			<div className="AdminGalleryPage">
				<Switch>
					<Route exact path={"/admin/gallery/" + this.albumId}>
						<Link to="/admin/gallery"
						      onClick={() => scroll.scrollToTop({duration: 300})}>
							<ArrowBackIosTwoToneIcon className={classes.backIcon} color="secondary"/>
						</Link>
						{albumContent}
					</Route>
					<Route path={"/admin/gallery/:albumId/:imageId"}>
						<EditImagePage api={this.props.api}
						               albumIds={this.props.albumIds}
						               albumIdtoNameDict={this.props.albumIdtoNameDict}
						               album={album}
						               triggerReload={this.props.triggerReload}/>
					</Route>
				</Switch>
			</div>
		);
	}
}

AdminAlbumPage.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(AdminAlbumPage));
