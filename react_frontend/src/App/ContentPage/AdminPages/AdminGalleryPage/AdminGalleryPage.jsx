/* General Imports --------------------------------------------------------------- */
import React from 'react';


/* Routing Imports --------------------------------------------------------------- */
// noinspection ES6CheckImport
import {Switch, Route, Link} from 'react-router-dom';


/* Styling Imports --------------------------------------------------------------- */
import './AdminGalleryPage.scss';


/* AJAX Imports ------------------------------------------------------------------ */
import {BackendGET, BackendREST} from "../../../../Wrappers/backendCommunication";
import {BACKEND_URL} from "../../../../constants";


/* Material UI Imports ----------------------------------------------------------- */
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import LinearProgress from '@material-ui/core/LinearProgress';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


/* Component Imports ------------------------------------------------------------- */
import AdminGalleryPageAlbum from "./AdminGalleryPageAlbum";
import AdminAlbumPage from "./AdminAlbumPage";
import NewImagePage from "./NewImagePage";


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
	root: {
		flexGrow: 1,
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
	buttonProgress: {
		position: 'absolute',
		top: '50%',
		left: '50%',
		marginTop: -12,
		marginLeft: -12,
	},
	divider: {
		marginTop: theme.spacing(2),
		marginBottom: theme.spacing(2)
	}
});


/* Component --------------------------------------------------------------------- */


class AdminGalleryPageManager extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			loading: true,
			albums: [],
			creatingAlbum: false
		};

		this.updateTitleImageId = this.updateTitleImageId.bind(this);
		this.triggerReload = this.triggerReload.bind(this);

		this.getAlbumFromId = this.getAlbumFromId.bind(this);
		this.getAlbumList = this.getAlbumList.bind(this);
		this.createAlbum = this.createAlbum.bind(this);
		this.updateAlbumState = this.updateAlbumState.bind(this);
		this.updateImageState = this.updateImageState.bind(this);
		this.removeAlbumFromView = this.removeAlbumFromView.bind(this);
		this.removeImageFromView = this.removeImageFromView.bind(this);

		this.getAlbumIds = this.getAlbumIds.bind(this);
		this.getAlbumIdtoNameDict = this.getAlbumIdtoNameDict.bind(this);
	}

	componentDidMount() {
		this.triggerReload();
	}

	updateTitleImageId(albumId, imageId) {
		let albums = this.state.albums;
		albums[this.state.albumIdtoIndex[albumId]]["title_image_id"] = imageId;
		this.setState({albums: albums});
	}

	triggerReload() {

		console.log("Fetching album data");

		let params = {
			email: this.props.api.email,
			api_key: this.props.api.api_key
		};

		BackendGET(BACKEND_URL + "/backend/database/album", params).then((resolveMessage) => {
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

	getAlbumFromId(albumId) {
		let album = this.state.albums[this.state.albumIdtoIndex[albumId]];
		return album;
	}

	getAlbumList() {
		const {classes} = this.props;

		if (this.state.albums.length === 0) {
			return <Typography variant="h6" className={classes.headline}>No albums ...</Typography>;
		}

		let albumList = this.state.albums.map((album, index) => {
			return (
				<Grid item xs={12} sm={6} md={4} lg={4} xl={4} key={index}>
					<AdminGalleryPageAlbum path={"/admin/gallery/" + album.id}
					                       album={album}
					                       api={this.props.api}
					                       index={index}
					                       updateAlbumState={this.updateAlbumState}
					                       removeAlbumFromView={this.removeAlbumFromView}/>
				</Grid>
			);
		});

		return (
			<Grid container spacing={2}>
				{albumList}
			</Grid>
		);
	}

	createAlbum() {
		console.log("Creating new album");

		this.setState({creatingAlbum: true});

		let params = {
			email: this.props.api.email,
			api_key: this.props.api.api_key
		};

		BackendREST(BACKEND_URL + "/backend/database/album", params, "POST").then((resolveMessage) => {
			console.log("Creating new album: successful");

			let newAlbum = {
				"id": JSON.parse(resolveMessage)["new_album_id"],
				"name": "",
				"image_count": 0,
				"visible_image_count": 0,
				"title_image_id": 0,
				"image_id_to_index": {},
				"images": []
			};

			let albums = this.state.albums;
			albums.push(newAlbum);
			let albumIdtoIndex = this.state.albumIdtoIndex;
			albumIdtoIndex[JSON.parse(resolveMessage)["new_album_id"]] = this.state.albums.length;

			this.setState({
				creatingAlbum: false,
				albums: albums,
				albumIdtoIndex: albumIdtoIndex,
			});
		}).catch(() => {
			console.log("Creating new album: failed");
			this.setState({
				creatingAlbum: false,
			});
		});
	}

	updateAlbumState(index, album) {
		let albums = this.state.albums;
		albums[index] = album;
		this.setState({albums: albums});
	}

	updateImageState(albumId, imageIndex, image) {
		let albums = this.state.albums;
		albums[this.state.albumIdtoIndex[albumId]]["images"][imageIndex] = image;
		this.setState({albums: albums});
	}

	removeAlbumFromView(index) {
		let newAlbums = [];

		for (let i = 0; i < this.state.albums.length; i++) {
			if (i === index) {
				continue;
			}
			newAlbums.push(this.state.albums[i]);
		}

		this.setState({albums: newAlbums});
	}

	removeImageFromView(albumId, imageIndex) {
		let newAlbums = [];

		for (let albumIterator = 0; albumIterator < this.state.albums.length; albumIterator++) {
			if (albumIterator === this.state.albumIdtoIndex[albumId]) {
				let newImages = [];
				for (let imageIterator = 0; imageIterator < this.state.albums[albumIterator]["images"].length; imageIterator++) {
					if (imageIterator === imageIndex) {
						continue;
					}
					newImages.push(this.state.albums[albumIterator]["images"][imageIterator]);
				}
				let newAlbum = this.state.albums[albumIterator];
				newAlbum["images"] = newImages;
				newAlbums.push(newAlbum);
			} else {
				newAlbums.push(this.state.albums[albumIterator]);
			}
		}

		this.setState({albums: newAlbums});
	}

	getAlbumIds() {
		let albumIds = [];

		for (let i = 0; i < this.state.albums.length; i++) {
			albumIds.push(this.state.albums[i].id);
		}

		return albumIds;
	}

	getAlbumIdtoNameDict() {
		let albumIdtoName = {};

		for (let i = 0; i < this.state.albums.length; i++) {
			albumIdtoName[this.state.albums[i].id] = this.state.albums[i].name;
		}

		return albumIdtoName;
	}

	render() {

		const {classes} = this.props;

		return (
			<div className="AdminGalleryPage">
				<Switch>
					<Route exact path="/admin/gallery/new">
						{this.state.loading && (
							<LinearProgress className={classes.linearProgress} color="secondary"/>
						)}
						{!this.state.loading && (
							<NewImagePage api={this.props.api}
							              albumIds={this.getAlbumIds()}
							              albumIdtoNameDict={this.getAlbumIdtoNameDict()}
							              triggerReload={this.triggerReload}/>
						)}
					</Route>
					<Route exact path="/admin/gallery">
						<Typography variant="h4" className={classes.headline}>Admin - Gallery</Typography>
						{this.state.loading && (
							<LinearProgress className={classes.linearProgress} color="secondary"/>
						)}
						{!this.state.loading && (
							<div className={classes.root}>
								<div className={classes.buttonRow}>
									<div className={classes.buttonSpinnerWrapper}>
										<Button variant="contained"
										        color="secondary"
										        disabled={this.state.creatingAlbum}
										        onClick={this.createAlbum}
										        className={classes.button}>Add Album</Button>
										{this.state.creatingAlbum && (
											<CircularProgress size={24}
											                  className={classes.buttonProgress}
											                  color="secondary"/>
										)
										}
									</div>
									<div className={classes.buttonSpinnerWrapper}>
										<Link to="/admin/gallery/new">
											<Button variant="contained"
											        color="secondary"
											        disabled={this.state.creatingAlbum}
											        className={classes.button}>Add Image</Button>
										</Link>
									</div>
								</div>
								<Divider className={classes.divider}/>
								{this.getAlbumList()}
							</div>
						)}
					</Route>
					<Route path={"/admin/gallery/:albumId"}>
						{this.state.loading && (
							<div className="AdminGalleryPage">
								<Typography variant="h4" className={classes.headline}>Gallery</Typography>
								<LinearProgress className={classes.linearProgress} color="secondary"/>
							</div>
						)}
						{!this.state.loading && (
							<AdminAlbumPage getAlbumFromId={this.getAlbumFromId}
							                api={this.props.api}
							                updateTitleImageId={this.updateTitleImageId}
							                updateImageState={this.updateImageState}
							                removeImageFromView={this.removeImageFromView}
							                albumIds={this.getAlbumIds()}
							                albumIdtoNameDict={this.getAlbumIdtoNameDict()}
							                triggerReload={this.triggerReload}/>
						)}
					</Route>
				</Switch>
			</div>
		);
	}
}


AdminGalleryPageManager.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdminGalleryPageManager);

