
/* General Imports --------------------------------------------------------------- */
import React from 'react';


/* Style Imports ----------------------------------------------------------------- */
import './SailorsGuidePage.scss';


/* Material UI Imports ----------------------------------------------------------- */
import Typography from "@material-ui/core/Typography";


/* Component Imports ------------------------------------------------------------- */
import ScheduleTable from "./SchedulePanel/ScheduleTable";


/* Hook Linking Imports ---------------------------------------------------------- */
import PropTypes from "prop-types";
import withStyles from "@material-ui/styles/withStyles/withStyles";


/* ------------------------------------------------------------------------------- */


const styles = theme => ({
	headline: {
		display: "block",
		textAlign: "center",
		marginBottom: theme.spacing(4)
	},
	headlineSmall: {
		display: "block",
		textAlign: "center",
		marginBottom: theme.spacing(2)
	},
});


/* Component --------------------------------------------------------------------- */


class SailorsGuidePage extends React.Component {
	render() {

		const {classes} = this.props;

		return (
			<div className="SailorsGuidePage">
				<Typography variant="h4" className={classes.headline}>Sailors Guide</Typography>
				<Typography variant="h6" className={classes.headlineSmall}>Preliminary Schedule</Typography>
				<ScheduleTable/>
			</div>
		);
	}
}

SailorsGuidePage.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SailorsGuidePage);
