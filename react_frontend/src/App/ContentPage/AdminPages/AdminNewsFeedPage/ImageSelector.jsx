import React from 'react';
import PropTypes from "prop-types";
import withStyles from "@material-ui/styles/withStyles/withStyles";

import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';

import {CustomSelect} from "../../../../Components/Forms/CustomSelect";
import {BACKEND_URL} from "../../../../constants";
import {BackendGET} from "../../../../Wrappers/backendCommunication";
import ImageSelectorImage from "./ImageSelectorImage";


/* Styles ------------------------------------------------------------------------ */


const styles = theme => ({
	headline: {
		display: "block",
		textAlign: "center"
	},
	linearProgress: {
		borderRadius: "2px"
	},
	albumSelect: {
		width: 250,
		textAlign: "center",
		marginBottom: theme.spacing(4)
	},
});


/* Component --------------------------------------------------------------------- */


class ImageSelector extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			albums: undefined,
			albumId: undefined,
			albumIdtoIndex: undefined,
			albumIdtoNameDict: undefined,
		};

		/* This logic is handled in here rather than the Edit Image Page Component */
		this.ToggleFavoriteImage = this.ToggleFavoriteImage.bind(this);
		this.ToggleSelectedImage = this.ToggleSelectedImage.bind(this);
		this.ToggleUnselectedImage = this.ToggleUnselectedImage.bind(this);
	}

	ToggleFavoriteImage(image_id) {
		this.props.updateFavoriteImageId(0);
	}

	ToggleSelectedImage(image_id) {
		let newSelectedImageIds = this.props.selectedImageIds.filter(function(value, index, arr){
		    return value !== image_id;
		});

		newSelectedImageIds.push(this.props.favoriteImageId);

		this.props.updateFavoriteImageId(image_id);
		this.props.updateSelectedImageIds(newSelectedImageIds);
	}

	ToggleUnselectedImage(image_id) {
		let newSelectedImageIds = this.props.selectedImageIds;
		newSelectedImageIds.push(image_id);
		this.props.updateSelectedImageIds(newSelectedImageIds);
	}


	componentDidMount() {

		console.log("Fetching album data");

		let params = {
			email: this.props.api.email,
			api_key: this.props.api.api_key
		};

		BackendGET(BACKEND_URL + "/backend/database/album", params).then((resolveMessage) => {
			console.log("Fetching album data: successful");

			let responseJSON =  JSON.parse(resolveMessage);

			this.setState({
				albums: responseJSON["albums"],
				albumIdtoIndex: responseJSON["album_id_to_index"],
				albumIdtoNameDict: responseJSON["album_id_to_name"],
				albumId: responseJSON["albums"][0]["id"]
			});
		}).catch(() => {
			console.log("Fetching album data: failed");
			this.setState({
				loading: false
			});
		});

	}

	getImageList(album) {
		const {classes} = this.props;

		if (album.images.length === 0) {
			return <Typography variant="h6" className={classes.headline}>No images ...</Typography>;
		}

		let imageList = album.images.map((image, index) => {
			let favorite = this.props.favoriteImageId === image.id;
			let selected = this.props.selectedImageIds.includes(image.id);

			let onClick;

			if (favorite) {
				onClick = () => this.ToggleFavoriteImage(image.id);
			} else if (selected) {
				onClick = () => this.ToggleSelectedImage(image.id);
			} else {
				onClick = () => this.ToggleUnselectedImage(image.id);
			}

			return (
				<Grid item xs={12} sm={6} md={4} lg={4} xl={4} key={index}>
					<ImageSelectorImage
						image={image}
						index={index}
						favorite={favorite}
						selected={selected}
						onClick={onClick}/>
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

		if (this.state.albums === undefined) {
			return (
				<LinearProgress className={classes.linearProgress} color="secondary"/>
			);
		} else {
			if (this.state.albums.length === 0) {
				return (
					<Typography variant="h6">No images found ...</Typography>
				);
			} else {
				return (
					<React.Fragment>
						<Grid container spacing={2} justify="center" alignItems="center">
							<Grid item>
								<CustomSelect
									label="Album"
									value={this.state.albumId}
									selectOptions={this.state.albumIdtoNameDict}
									onChange={newValue => this.setState({albumId: newValue})}
									className={classes.albumSelect}
								/>
							</Grid>
						</Grid>
						{this.getImageList(this.state.albums[this.state.albumIdtoIndex[this.state.albumId]])}
					</React.Fragment>
				);
			}
		}
	}
}

ImageSelector.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImageSelector);




