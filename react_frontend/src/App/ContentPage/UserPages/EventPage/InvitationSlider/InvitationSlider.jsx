import React from 'react';
import PropTypes from "prop-types";
import withStyles from "@material-ui/styles/withStyles/withStyles";
// noinspection ES6CheckImport
import {withRouter} from "react-router-dom";

import {Card, CircularProgress, IconButton, Typography} from '@material-ui/core';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';

import clsx from 'clsx';
import GetAppIcon from "@material-ui/icons/GetApp";


const whitePages = [1, 2, 3, 4, 5, 6, 7, 9, 13, 15, 17, 20, 22, 25];


const styles = theme => ({
	fullscreen_imageSlider: {
		backgroundColor: theme.palette.gunmetalGray.main,
	},

	card: {
		display: "flex",
		alignItem: "center",
		justifyContent: "center",
		position: "relative",
		margin: theme.spacing(2),
		textAlign: "center",
	},
	fullscreen_card: {
		maxWidth: `calc(100vw - ${theme.spacing(4)}px)`,
		maxHeight: `calc(100vh - ${theme.spacing(4)}px)`,
	},

	fullscreen_img: {
		width: "100%",
		heigth: "auto",
		cursor: "pointer",
	},
	card_img: {
		width: "100%",
		height: "auto",
		cursor: "pointer",
	},
	button: {
		cursor: "pointer",
		position: "absolute",
		zIndex: 3000,
		borderRadius: "50%",
		backgroundColor: theme.palette.white.transparent60,
		color: theme.palette.desireMagenta.main,
	},
	sizeButton: {
		right: theme.spacing(1),
		top: theme.spacing(1),
	},
	prevButton: {
		left: theme.spacing(1),
		bottom: theme.spacing(1),
	},
	nextButton: {
		right: theme.spacing(1),
		bottom: theme.spacing(1),
	},
	card_pageNumberBox: {
		position: "absolute",
		top: 0,
		left: 0,
		width: "100%",
	},
	card_pageNumber: {
		paddingRight: theme.spacing(2),
	},
});

class InvitationSlider extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: true,
			fullscreen: false,
			imageSliderIndex: 0,
		};

		let images = [];

		const imageBucket = "https://storage.googleapis.com/i14-worlds-documents/Invitation_Images/";

		for (let i = 1; i <= 25; i++) {
			images.push({
				filepath_large: imageBucket + "Invitation_" + i.toString() + "_large.jpg",
				filepath_full: imageBucket + "Invitation_" + i.toString() + "_full.jpg",
				description: "Invitation Page " + i.toString(),
			});
		}


		this.images = images;

		document.addEventListener("keydown", event => {
			if (event.key === "Escape") {
				if (this.state.fullscreen) {
					this.setState({fullscreen: false});
				}
			} else if (this.images.length > 1) {
				if (event.key === "ArrowLeft") {
					this.handleLeftClick();
				} else if (event.key === "ArrowRight") {
					this.handleRightClick();
				}
			}
		});

		this.handleLeftClick = this.handleLeftClick.bind(this);
		this.handleRightClick = this.handleRightClick.bind(this);
	}

	handleLeftClick() {
		let newIndex = this.state.imageSliderIndex - 1;
		if (newIndex < 0) {
			newIndex += this.images.length;
		}
		this.setState({
			loading: true,
			imageSliderIndex: newIndex
		});
	}

	handleRightClick() {
		let newIndex = (this.state.imageSliderIndex + 1) % this.images.length;
		this.setState({
			loading: true,
			imageSliderIndex: newIndex
		});
	}

	render() {

		const {classes} = this.props;

		const imageSrc = this.state.fullscreen ?
			this.images[this.state.imageSliderIndex].filepath_full :
			this.images[this.state.imageSliderIndex].filepath_large;

		const image = (
			<React.Fragment>
				<img className={classes.fullscreen_img}
				     src={imageSrc}
				     alt={this.images[this.state.imageSliderIndex].description}
				     onLoad={() => this.setState({loading: false})}
				     onClick={() => this.setState({fullscreen: !this.state.fullscreen})}/>
			</React.Fragment>
		);

		const buttons = (
			<React.Fragment>
				<IconButton
					color="inherit"
					aria-label="close image slider"
					className={clsx(classes.button, classes.sizeButton)}
					size="medium"
					onClick={() => this.setState({fullscreen: !this.state.fullscreen})}>
					{this.state.fullscreen ? <FullscreenExitIcon/> : <FullscreenIcon/>}
				</IconButton>
				<IconButton
					color="inherit"
					aria-label="previous image"
					className={clsx(classes.button, classes.prevButton)}
					size="medium"
					onClick={this.handleLeftClick}>
					<ChevronLeftIcon/>
				</IconButton>
				<IconButton
					color="inherit"
					aria-label="next image"
					className={clsx(classes.button, classes.nextButton)}
					size="medium"
					onClick={this.handleRightClick}>
					<ChevronRightIcon/>
				</IconButton>
			</React.Fragment>
		);

		if (this.state.fullscreen) {
			return (
				<div className={clsx(classes.fullscreen_imageSlider, "ImageSlider")}>
					<div className="Image">
						<Card className={clsx(classes.card, classes.fullscreen_card)}
						      elevation={3}
						      style={{display: this.state.loading ? "none" : "block"}}>
							{image}
							{buttons}
						</Card>
					</div>
				</div>
			);
		} else {
			return (
				<Card elevation={3} className={clsx(classes.card, "PDFPaper")}>
					{image}
					{buttons}
					<div className={clsx(classes.card_pageNumberBox, "PageNumberBox", (whitePages.includes(this.state.imageSliderIndex + 1)) ? "DarkColor" : "BrightColor")}>
						<Typography variant="h6"
						            className={classes.card_pageNumber}>
							{this.state.imageSliderIndex + 1} / {this.images.length}
						</Typography>
						<div className={clsx(classes.downloadButton)}>
							<a href="https://storage.googleapis.com/i14-worlds-documents/Invitation_WM2021.pdf"
							   target="_blank"
							   rel="noopener noreferrer">
								<IconButton aria-label="download" size="medium">
									<GetAppIcon/>
								</IconButton>
							</a>
						</div>
					</div>
				</Card>
			);
		}
	}
}

InvitationSlider.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(InvitationSlider));
