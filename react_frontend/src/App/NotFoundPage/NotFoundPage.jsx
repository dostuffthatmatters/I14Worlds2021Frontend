
import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export class NotFoundPage extends Component {
	render() {
		return (
			<div className="NotFoundPage">
				<h1>404: Page not found ...</h1>
				<Link to="/">Get back to main page</Link>
			</div>
		);
	}
}
