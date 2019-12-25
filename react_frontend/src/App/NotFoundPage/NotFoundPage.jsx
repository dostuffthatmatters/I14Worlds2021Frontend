
/* General Imports --------------------------------------------------------------- */
import React from 'react';


/* Routing Imports --------------------------------------------------------------- */
import {Link} from 'react-router-dom';


/* Material UI Imports ----------------------------------------------------------- */
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


import {makeStyles} from '@material-ui/core/styles';
import clsx from 'clsx';

/* Component --------------------------------------------------------------------- */


const useStyles = makeStyles(theme => ({
	container: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "column",
		width: "100vw",
		height: "100vh",
	},
	headline: {
		paddingBottom: theme.spacing(3),
	},
}));

export function NotFoundPage() {

	const classes = useStyles();

	return (
		<div className={clsx(classes.container,"NotFoundPage")}>
			<Typography variant="h4" className={classes.headline}>404: Page not found ...</Typography>
			<Link to="/">
				<Button variant="contained" color="secondary">Get back to main page</Button>
			</Link>
		</div>
	);
}
