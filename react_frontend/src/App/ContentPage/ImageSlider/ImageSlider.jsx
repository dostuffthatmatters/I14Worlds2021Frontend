import React from 'react';
import './ImageSlider.scss';
import PropTypes from "prop-types";
import withStyles from "@material-ui/styles/withStyles/withStyles";
// noinspection ES6CheckImport
import {withRouter} from "react-router-dom";

import Card from '@material-ui/core/Card';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';

import CloseIcon from '@material-ui/icons/Close';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import clsx from 'clsx';

const styles = theme => ({
	imageSlider: {
		backgroundColor: theme.palette.gunmetalGray.main,
	},
	card: {
		margin: theme.spacing(2),
		maxWidth: `calc(100vw - ${theme.spacing(4)}px)`,
		maxHeight: `calc(100vh - ${theme.spacing(4)}px)`,
	},
	img: {
		maxWidth: `calc(100vw - ${theme.spacing(4)}px)`,
		maxHeight: `calc(100vh - ${theme.spacing(4)}px)`,
	},
	icon: {
		backgroundColor: theme.palette.gunmetalGray.main,
		position: "fixed",
		color: "white",
		zIndex: 3000
	},
	closeIcon: {
		right: theme.spacing(2),
		top: theme.spacing(2),
	},
	prevIcon: {
		left: theme.spacing(2),
		bottom: theme.spacing(2),
	},
	nextIcon: {
		right: theme.spacing(2),
		bottom: theme.spacing(2),
	},
});

class ImageSlider extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: true,
			shrinkImage: false,
		};

		this.cardRef = React.createRef();
		this.buttonRef = React.createRef();

		document.addEventListener("keydown", event => {
			if (event.key === "Escape") {
				this.props.closeImageSlider();
			} else if (this.props.images.length > 1) {
				if (event.key === "ArrowLeft") {
					this.handleLeftClick();
				} else if (event.key === "ArrowRight") {
					this.handleRightClick();
				}
			}
		});

		this.handleLeftClick = this.handleLeftClick.bind(this);
		this.handleRightClick = this.handleRightClick.bind(this);

		// this.triggerResize = this.triggerResize.bind(this);
	}

	/*

	componentDidMount() {
		this.triggerResize();
	}

	componentDidUpdate() {
		this.triggerResize();
	}

	triggerResize() {
		if (!this.state.loading) {
			const windowWidth = window.innerWidth;
			const windowHeight = window.innerHeight;

			const imageWidth = this.cardRef.current.clientWidth;
			const imageHeight = this.cardRef.current.clientHeight;

			let minOffset = this.buttonRef.current.offsetTop * 2 + this.buttonRef.current.clientHeight;

			if (this.state.shrinkImage) {
				const widthTooSmall = ((windowWidth - imageWidth) > (4 * minOffset));
				const heightTooSmall = ((windowHeight - imageHeight) > (4 * minOffset));

				if (widthTooSmall && heightTooSmall) {
					this.setState({shrinkImage: false});
				}
			} else {
				const widthTooLarge = ((windowWidth - imageWidth) < (2 * minOffset));
				const heightTooLarge = ((windowHeight - imageHeight) < (2 * minOffset));

				if (widthTooLarge && heightTooLarge) {
					this.setState({shrinkImage: true});
				}
			}
		}
	}

	*/

	handleLeftClick() {
		let newIndex = this.props.imageSliderIndex - 1;
		if (newIndex < 0) {
			newIndex += this.props.images.length;
		}
		this.setState({loading: true});
		this.props.newImageSliderIndex(newIndex);
	}

	handleRightClick() {
		let newIndex = (this.props.imageSliderIndex + 1) % this.props.images.length;
		this.setState({loading: true});
		this.props.newImageSliderIndex(newIndex);
	}

	render() {

		const {classes} = this.props;

		return (
			<div className={clsx(classes.imageSlider, "ImageSlider")}>
				<div className="Image">
					<CircularProgress color="secondary"
					                  style={{display: this.state.loading ? "block" : "none"}}/>
					<Card ref={this.cardRef}
					      className={classes.card}
					      elevation={3}
					      style={{display: this.state.loading ? "none" : "block"}}>
						<img className={classes.img}
						     src={this.props.images[this.props.imageSliderIndex].filepath_full}
						     alt={this.props.images[this.props.imageSliderIndex].description}
						     onLoad={() => this.setState({loading: false})}
						/>
					</Card>
				</div>
				<IconButton ref={this.buttonRef}
				            aria-label="close image slider"
				            className={clsx(classes.icon, classes.closeIcon)}
				            size="medium"
				            onClick={this.props.closeImageSlider}>
					<CloseIcon/>
				</IconButton>
				{(this.props.images.length > 1) && (
					<React.Fragment>
						<IconButton
							aria-label="previous image"
							className={clsx(classes.icon, classes.prevIcon)}
							size="medium"
							onClick={this.handleLeftClick}>
							<ChevronLeftIcon/>
						</IconButton>
						<IconButton
							aria-label="next image"
							className={clsx(classes.icon, classes.nextIcon)}
							size="medium"
							onClick={this.handleRightClick}>
							<ChevronRightIcon/>
						</IconButton>
					</React.Fragment>
				)}
			</div>
		);
	}

}

ImageSlider.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(ImageSlider));
