import React, {Component} from 'react';
import './AdminGalleryPage.scss';
import {Card, CardContent, CardMedia, CircularProgress, Divider, LinearProgress, Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/styles";
import {BackendGET, BackendREST} from "../../../../Wrappers/backendCommunication";
import {BACKEND_URL} from "../../../../constants";
import Grid from "@material-ui/core/Grid";
import {Switch, Link, Route} from "react-router-dom";
import AdminAlbum from "./AdminAlbum";
import Album from "../../UserPages/GalleryPage/Album";
import AdminAlbumPage from "./AdminAlbumPage";


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


class AdminGalleryPageManager extends Component {

	constructor(props) {
		super(props);

		this.state = {
			loading: true,
			albums: [],
			creatingAlbum: false
		};

		this.getAlbumFromId = this.getAlbumFromId.bind(this);
		this.getAlbumList = this.getAlbumList.bind(this);
		this.createAlbum = this.createAlbum.bind(this);
		this.updateAlbumState = this.updateAlbumState.bind(this);
		this.updateImageState = this.updateImageState.bind(this);
		this.removeAlbumFromView = this.removeAlbumFromView.bind(this);
		this.removeImageFromView = this.removeImageFromView.bind(this);
	}

	componentDidMount() {

		console.log("Fetching album data");

		let params = {
			email: this.props.api.email,
			api_key: this.props.api.api_key
		};

		console.log({params: params});
		console.log({url: BACKEND_URL + "/backend/database/album"});

		BackendGET(BACKEND_URL + "/backend/database/album", params).then((resolveMessage) => {
			console.log("Fetching album data: successful");

			console.log({response: JSON.parse(resolveMessage)});
			this.setState({
				loading: false,
				albums: JSON.parse(resolveMessage)["albums"],
				albumIdtoIndex: JSON.parse(resolveMessage)["album_id_to_index"]
			});
		}).catch((rejectMessage) => {
			console.log("Fetching album data: failed");
			this.setState({
				loading: false
			});
		});

	}

	getAlbumFromId(albumId) {
		let album = this.state.albums[this.state.albumIdtoIndex[albumId]];
		console.log({gettingAlbumFromID: albumId, albums: this.state.albums, album: album});
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
					<AdminAlbum path={"/admin/gallery/" + album.id}
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
				"title_image_paths": {
					"filepath_small": "https://storage.googleapis.com/i14-worlds-2021-gallery/default-images/default-image-1-small.jpg",
					"filepath_medium": "https://storage.googleapis.com/i14-worlds-2021-gallery/default-images/default-image-1-medium.jpg",
					"filepath_large": "https://storage.googleapis.com/i14-worlds-2021-gallery/default-images/default-image-1-large.jpg",
					"filepath_full": "https://storage.googleapis.com/i14-worlds-2021-gallery/default-images/default-image-1.jpg",
				},
				"images": []
			};

			let albums = this.state.albums;
			albums.push(newAlbum);

			this.setState({
				creatingAlbum: false,
				albums: albums
			});
		}).catch((rejectMessage) => {
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

	render() {

		const {classes} = this.props;

		return (
			<Switch>
				<Route exact path="/admin/gallery">
					<div className="AdminGalleryPage">
						<Typography variant="h4" className={classes.headline}>Admin - Gallery</Typography>
						{this.state.loading && (
							<LinearProgress className={classes.linearProgress} color="secondary"/>
						)}
						{!this.state.loading && (
							<div className={classes.root}>
								<div className={classes.buttonRow}>
									<div className={classes.buttonSpinnerWrapper}>
										<Button variant="contained"
										        color={this.state.creatingAlbum ? "default" : "secondary"}
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
										<Button variant="contained"
										        color="secondary"
										        className={classes.button}>Add Image</Button>
									</div>
								</div>
								<Divider className={classes.divider}/>
								{this.getAlbumList()}
							</div>
						)}
					</div>
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
						                updateImageState={this.updateImageState}
						                removeImageFromView={this.removeImageFromView}/>
					)}
				</Route>
			</Switch>
		);
	}
}


AdminGalleryPageManager.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdminGalleryPageManager);

