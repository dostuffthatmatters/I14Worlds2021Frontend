/* General Imports --------------------------------------------------------------- */
import React from 'react';


/* Routing Imports --------------------------------------------------------------- */
import {Link} from 'react-router-dom';


/* Component --------------------------------------------------------------------- */


export class NotFoundPage extends React.Component {
	render() {
		return (
			<div className="NotFoundPage">
				<h1>404: Page not found ...</h1>
				<Link to="/">Get back to main page</Link>
			</div>
		);
	}
}
