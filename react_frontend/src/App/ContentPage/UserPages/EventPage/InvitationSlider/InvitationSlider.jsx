import React from 'react';
import PropTypes from "prop-types";
import withStyles from "@material-ui/styles/withStyles/withStyles";

import Breakpoint from 'react-socks';
import './InvitationSlider.scss';

import {withRouter} from "react-router-dom";

import Card from '@material-ui/core/Card'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';
import GetAppIcon from '@material-ui/icons/GetApp';

import clsx from 'clsx';


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
		display: "block",
		width: "auto",
		height: "auto",
		maxWidth: `calc(100vw - ${theme.spacing(4)}px)`,
		maxHeight: `calc(100vh - ${theme.spacing(4)}px)`,
	},
	card_media: {
		display: "block",
		width: "100%",
		height: "auto",
		zIndex: "200",
	},
	fullscreen_media: {
		display: "block",
		width: "auto",
		height: "auto",
		maxWidth: `calc(100vw - ${theme.spacing(4)}px)`,
		maxHeight: `calc(100vh - ${theme.spacing(4)}px)`,
		zIndex: "200",
	},
	button: {
		cursor: "pointer",
		position: "absolute",
		borderRadius: "50%",
		color: theme.palette.desireMagenta.main,
		zIndex: "300",
	},
	sizeButton: {
		right: theme.spacing(1),
		top: theme.spacing(1),
	},
	prevButton: {
		left: theme.spacing(1),
		top: theme.spacing(1),
	},
	nextButton: {
		right: theme.spacing(8),
		top: theme.spacing(1),
	},
	card_pageNumberBox: {
		position: "absolute",
		top: "2%",
		left: 0,
		width: "100%",
	},
	downloadButton: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
	},
	brightColor: {
		color: theme.palette.white.main,
	},
	darkColor: {
		color: theme.palette.gunmetalGray.main,
	},
	brightBackgroundColor: {
		backgroundColor: theme.palette.white.transparent60,
		"&:hover": {
			backgroundColor: theme.palette.white.transparent60,
		}
	},
	darkBackgroundColor: {
		backgroundColor: theme.palette.gunmetalGray.transparent60,
		"&:hover": {
			backgroundColor: theme.palette.gunmetalGray.transparent60,
		}
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
				filepath_large: imageBucket + "invitation_1080_" + i.toString() + ".jpg",
				filepath_full: imageBucket + "invitation_1080_" + i.toString() + ".jpg",
				description: "Invitation Page " + i.toString(),
			});
		}


		this.images = images;

		document.addEventListener("keydown", event => {
			if (event.key === "Escape") {
				if (this.state.fullscreen) {
					this.props.hideWebsite(false);
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

		const VIDEO = (this.state.imageSliderIndex === 2);
		const BRIGHT = (whitePages.includes(this.state.imageSliderIndex + 1));


		const {classes} = this.props;
		const imageSrc = this.images[this.state.imageSliderIndex].filepath_large;

		/* const preload = this.images.map((image, index) => (
			<link key={index} rel="preload" href={image.filepath_large} as="image"/>
		));*/

		let image;
		if (VIDEO) {
			image = (
				<video controls className={this.state.fullscreen ? classes.fullscreen_media : classes.card_media}>
					<source
						style={{zIndex: "200"}}
						src="https://storage.googleapis.com/i14-worlds-documents/i14worlds2021_promo_video.mp4"
						type="video/mp4"/>
				</video>
			);
		} else {
			image = (
				<React.Fragment>
					<img className={this.state.fullscreen ? classes.fullscreen_media : classes.card_media}
					     src={imageSrc}
					     alt={this.images[this.state.imageSliderIndex].description}
					     style={{display: this.state.loading ? "none" : "block"}}
					     onLoad={() => this.setState({loading: false})}/>
				</React.Fragment>
			);
		}

		const buttons = (
			<React.Fragment>
				<IconButton
					color="inherit"
					aria-label="close image slider"
					className={clsx(classes.button,
						classes.sizeButton,
						BRIGHT ? classes.brightColor : classes.darkColor,
						BRIGHT ? classes.darkBackgroundColor : classes.brightBackgroundColor)}
					size="medium"
					style={{zIndex: this.state.fullscreen ? 3000 : 300}}
					onClick={() => {
						if (this.state.fullscreen) {
							document.body.style.position = '';
							document.body.style.top = '';
						} else {
							document.body.style.position = 'fixed';
							document.body.style.top = `-${window.scrollY}px`;
						}
						this.setState({fullscreen: !this.state.fullscreen})
					}}>
					{this.state.fullscreen ? <FullscreenExitIcon alt="Exit Fullscreen Icon"/> :
						<FullscreenIcon alt="Enter Fullscreen Icon"/>}
				</IconButton>
				<IconButton
					color="inherit"
					aria-label="previous image"
					className={clsx(classes.button,
						classes.prevButton,
						BRIGHT ? classes.brightColor : classes.darkColor,
						BRIGHT ? classes.darkBackgroundColor : classes.brightBackgroundColor)}
					size="medium"
					style={{zIndex: this.state.fullscreen ? 3000 : 300}}
					onClick={this.handleLeftClick}>
					<ChevronLeftIcon alt="Previous Slide Icon"/>
				</IconButton>
				<IconButton
					color="inherit"
					aria-label="next image"
					className={clsx(classes.button,
						classes.nextButton,
						BRIGHT ? classes.brightColor : classes.darkColor,
						BRIGHT ? classes.darkBackgroundColor : classes.brightBackgroundColor)}
					size="medium"
					style={{zIndex: this.state.fullscreen ? 3000 : 300}}
					onClick={this.handleRightClick}>
					<ChevronRightIcon alt="Next Slide Icon"/>
				</IconButton>
			</React.Fragment>
		);

		const pageNumberBox = (
			<div
				className={clsx(classes.card_pageNumberBox, "PageNumberBox", BRIGHT ? classes.darkColor : classes.brightColor)}>
				<Breakpoint medium up>
					<Typography variant="h6"
					            className={clsx(
						            classes.card_pageNumber,
						            BRIGHT ? classes.darkColor : classes.brightColor
					            )}>
						{this.state.imageSliderIndex + 1} / {this.images.length}
					</Typography>
				</Breakpoint>
				<div className={clsx(classes.downloadButton)}>
					<IconButton
						aria-label="download"
						className={BRIGHT ? classes.darkColor : classes.brightColor}
						size="medium"
						onClick={() => window.open("https://storage.googleapis.com/i14-worlds-documents/I14worlds2021_invitation.pdf", "_blank")}>
						<GetAppIcon/>
					</IconButton>
				</div>
			</div>
		);

		return (
			<div className={this.state.fullscreen ? clsx(classes.fullscreen_imageSlider, "ImageSlider") : ""}>
				<div className={this.state.fullscreen ? "Image" : ""}>
					<Card className={this.state.fullscreen ?
						clsx(classes.card, classes.fullscreen_card) :
						clsx(classes.card, "PDFPaper")}
					      elevation={3}>
						{/*preload*/}
						{image}
						{buttons}
						{!VIDEO && (!this.state.fullscreen && pageNumberBox)}
					</Card>
				</div>
			</div>
		);
	}
}

InvitationSlider.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(InvitationSlider));
