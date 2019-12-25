import React from 'react';

import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";

import PropTypes from "prop-types";
import withStyles from "@material-ui/styles/withStyles/withStyles";

import FavoriteIcon from '@material-ui/icons/Favorite';

import clsx from 'clsx';


const styles = theme => ({
	paper: {
		position: "relative",
		cursor: "pointer",
	},
	favoritePaper: {
		margin: "-3px",
		border: "3px solid",
		borderColor: theme.palette.desireMagenta.transparent80,
	},
	selectedPaper: {
		margin: "-3px",
		border: "3px solid",
		borderColor: theme.palette.pinctonBlue.transparent80,
	},
	cardMedia: {
		height: "auto",
		paddingTop: '66.666%', // 3:2
		overflow: "visible",
	},
	cardIcon: {
		position: "absolute",
		bottom: theme.spacing(1),
		left: theme.spacing(1),
	},
	favoriteIcon: {
		color: theme.palette.desireMagenta.transparent80,
	},
});


class ImageSelectorImage extends React.Component {
	render() {

		const {classes} = this.props;

		if (this.props.favorite) {
			return (
				<Card className={clsx(classes.paper, classes.favoritePaper)}
				      elevation={3}
				      onClick={this.props.onClick}>
					<CardMedia
						className={clsx(classes.cardMedia, classes.borderMedia)}
						image={this.props.image.filepath_medium}
						alt={this.props.image.description}/>
					<FavoriteIcon className={clsx(classes.cardIcon, classes.favoriteIcon)}/>
				</Card>
			);
		} else if (this.props.selected) {
			return (
				<Card className={clsx(classes.paper, classes.selectedPaper)}
				      elevation={3}
				      onClick={this.props.onClick}>
					<CardMedia
						className={clsx(classes.cardMedia, classes.borderMedia)}
						image={this.props.image.filepath_medium}
						alt={this.props.image.description}/>
				</Card>
			);
		} else {
			return (
				<Card className={classes.paper}
				      elevation={3}
				      onClick={this.props.onClick}>
					<CardMedia
						className={classes.cardMedia}
						image={this.props.image.filepath_medium}
						alt={this.props.image.description}/>
				</Card>
			);
		}
	}

}

ImageSelectorImage.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImageSelectorImage);
