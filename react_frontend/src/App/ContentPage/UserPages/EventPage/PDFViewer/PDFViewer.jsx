import React from 'react';
import clsx from "clsx";
import {Paper, Typography, IconButton} from "@material-ui/core";


import GetAppIcon from '@material-ui/icons/GetApp';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';


/* Hook Linking Imports --------------------------------------------------------------- */
import PropTypes from "prop-types";
import withStyles from "@material-ui/styles/withStyles/withStyles";


/* PDF Imports ------------------------------------------------------------------- */
import {Document, Page, pdfjs} from 'react-pdf';
import InvitationPDF from './Invitation_WM2021.pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


/* Style ------------------------------------------------------------------------- */


const whitePages = [1, 2, 3, 4, 5, 6, 7, 9, 13, 15, 17, 20, 22, 25];

const styles = theme => ({
	page: {
		backgroundColor: theme.palette.primary.main,
		textAlign: "center",
	},
	pdfPaper: {
		margin: theme.spacing(2),
	},
	pdfPage: {
		maxWidth: "60vw",
		zIndex: 100,
	},
	button: {
		position: "absolute",
		cursor: "pointer",
		bottom: theme.spacing(1),
		backgroundColor: "rgba(255, 255, 255, 0.5)",
		borderRadius: "50%",
		zIndex: 300,
	},
	leftButton: {
		left: theme.spacing(1),
	},
	rightButton: {
		right: theme.spacing(1),
	},
	pageNumberBox: {
		top: theme.spacing(1),
	},
	pageNumber: {
		paddingRight: theme.spacing(2),
	}
});


/* Component --------------------------------------------------------------------- */


class PDFViewer extends React.Component {

	constructor() {
		super();

		this.state = {
			page: 1,
			pageCount: 25,
		};

		this.prevPage = this.prevPage.bind(this);
		this.nextPage = this.nextPage.bind(this);
	}

	prevPage() {
		let newPage = this.state.page - 1;
		newPage += newPage < 1 ? this.state.pageCount : 0;
		this.setState({page: newPage});
	}

	nextPage() {
		let newPage = this.state.page + 1;
		newPage -= newPage > this.state.pageCount ? this.state.pageCount : 0;
		this.setState({page: newPage});
	}

	render() {

		const {classes} = this.props;

		return (
			<Paper elevation={3} className={clsx(classes.pdfPaper, "PDFPaper")}>
				<Document file={InvitationPDF}>
					<Page pageNumber={this.state.page}/>
				</Document>
				<div className={clsx(classes.leftButton, classes.button)}
				     onClick={this.prevPage}>
					<IconButton color="secondary" aria-label="previous" size="medium">
						<ChevronLeftIcon/>
					</IconButton>
				</div>
				<div className={clsx(classes.rightButton, classes.button)}
				     onClick={this.nextPage}>
					<IconButton color="secondary" aria-label="next" size="medium">
						<ChevronRightIcon/>
					</IconButton>
				</div>
				<div
					className={clsx(classes.pageNumberBox, "PageNumberBox", (whitePages.includes(this.state.page)) ? "DarkColor" : "BrightColor")}>
					<Typography variant="h6"
					            className={classes.pageNumber}>{this.state.page} / {this.state.pageCount}</Typography>
					<div className={clsx(classes.downloadButton)}>
						<a href="https://storage.googleapis.com/i14-worlds-documents/Invitation_WM2021.pdf"
						   target="_blank">
							<IconButton aria-label="download" size="medium">
								<GetAppIcon/>
							</IconButton>
						</a>
					</div>
				</div>
			</Paper>
		);
	}
}


/*
Followed the Example from:
https://medium.com/@aliglenesk/how-to-embed-a-google-map-in-your-react-app-23866d759e92
*/

PDFViewer.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default (withStyles(styles)(PDFViewer));
