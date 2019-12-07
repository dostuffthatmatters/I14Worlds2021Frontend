
/* General Imports --------------------------------------------------------------- */
import React from 'react';


/* Routing Imports --------------------------------------------------------------- */
import Switch from 'react-router-dom/Switch';
import Route from 'react-router-dom/Route';
import Link from 'react-router-dom/Link';


/* Styling Imports --------------------------------------------------------------- */
import './GalleryPage.scss';


/* AJAX Imports ------------------------------------------------------------------ */
import {BackendREST} from "../../../../Wrappers/backendCommunication";
import {BACKEND_URL} from "../../../../constants";


/* Material UI Imports ----------------------------------------------------------- */
import {Card, CardContent, CardMedia, LinearProgress, Typography, Grid} from "@material-ui/core";


/* Component Imports ------------------------------------------------------------- */
import Album from "./Album";


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
	root: {
		flexGrow: 1,
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
		position: "absolute",
		display: "block",
		width: "100%",
		left: 0,
		bottom: 0,

		paddingTop: theme.spacing(1),
		paddingRight: 0,
		paddingBottom: theme.spacing(1),
		paddingLeft: 0,
		margin: 0,
		"&:last-child": {
			paddingBottom: theme.spacing(1),
		},

		backgroundColor: "hsla(0, 0%, 0%, 0.75)",
		color: "white",

		textAlign: "center",
		fontSize: "1.2rem",

	}
});


/* Component --------------------------------------------------------------------- */



class GalleryPageManager extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			loading: false,
			albums: [],
			albumIdtoIndex: {}
		};

		this.getAlbumList = this.getAlbumList.bind(this);
		this.getAlbumFromId = this.getAlbumFromId.bind(this);
	}

	componentDidMount() {

		console.log("Fetching album data");

		BackendREST(BACKEND_URL + "/backend/database/album", {}, "GET").then((resolveMessage) => {
			console.log("Fetching album data: successful");
			this.setState({
				loading: false,
				albums: JSON.parse(resolveMessage)["albums"],
				albumIdtoIndex: JSON.parse(resolveMessage)["album_id_to_index"]
			});
		}).catch(() => {
			console.log("Fetching album data: failed");
			this.setState({
				loading: false
			});
		});

	}

	getAlbumList() {
		const {classes} = this.props;

		if (this.state.albums.length === 0) {
			return <Typography variant="h6" className={classes.headline}>No images ...</Typography>;
		}

		let albumList = this.state.albums.map((album, index) => {
			if (album.visible_image_count === 0) {
				return "";
			}
			return (
				<Grid item xs={12} sm={6} md={4} lg={4} xl={4} key={index}>
					<Link to={"gallery/" + album.id}>
						<Card elevation={3} className={classes.card}>
							<CardMedia
								className={classes.cardMedia}
								image={album.title_image_paths.filepath_medium}
								alt={"Images inside " + album.name}
							/>
							<CardContent className={classes.cardContent}>{album.name}</CardContent>
						</Card>
					</Link>
				</Grid>
			);
		});

		return (
			<Grid container spacing={2}>
				{albumList}
			</Grid>
		);
	}

	getAlbumFromId(albumId) {
		let album = this.state.albums[this.state.albumIdtoIndex[albumId]];
		console.log({gettingAlbumFromID: albumId, albums: this.state.albums, album: album});
		return album;
	}

	render() {
		const {classes} = this.props;

		console.log({dict_outside: this.state.albumIdtoIndex});

		return (
			<Switch>
				<Route exact strict path="/gallery">
					<div className="GalleryPage">
						<Typography variant="h4" className={classes.headline}>Gallery</Typography>
						{this.state.loading && <LinearProgress className={classes.linearProgress} color="secondary"/>}
						{!this.state.loading && (
							<div className={classes.root}>
								{this.getAlbumList()}
							</div>
						)}
					</div>
				</Route>
				<Route path={"/gallery/:albumId"}>
					{this.state.loading && (
						<React.Fragment>
							<Typography variant="h4" className={classes.headline}>Gallery</Typography>
							<LinearProgress className={classes.linearProgress} color="secondary"/>
						</React.Fragment>
					)}
					{!this.state.loading && (
						<Album getAlbumFromId={this.getAlbumFromId}/>
					)}
				</Route>
			</Switch>
		);
	}
}

GalleryPageManager.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GalleryPageManager);
