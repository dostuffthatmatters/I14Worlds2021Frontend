import React, {Component} from 'react';
import {Link} from 'react-router-dom';


import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/styles';

import { withRouter } from 'react-router-dom';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import './LoginPage.scss';
import {Container, Typography} from "@material-ui/core";
import {BackendPOST} from "../../Wrappers/backendCommunication";

import {BACKEND_URL} from '../../constants';


const styles = theme => ({
	title: {
		display: "block",
		textAlign: "center",
		marginBottom: theme.spacing(2)
	},
	link: {
		textDecoration: "none",
		display: "block"
	},
	button: {
		marginTop: theme.spacing(1),
		marginLeft: theme.spacing(0.5),
		marginRight: theme.spacing(0.5)
	},
	textField: {
		display: "block",
		marginBottom: theme.spacing(1)
	}
});


class LoginPageManager extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: "",
			password: ""
		};

		this.emailInputRef = React.createRef();
		this.passwordInputRef = React.createRef();

		this.processLogin = this.processLogin.bind(this);
		this.handleEmailKeyDown = this.handleEmailKeyDown.bind(this);
		this.handlePasswordKeyDown = this.handlePasswordKeyDown.bind(this);
	}

	processLogin() {
		console.log("Trying to log in");

		let params = {
			email: this.state.email,
			password: this.state.password,
		};

		BackendPOST(BACKEND_URL + "/backend/login", params).then((resolveMessage) => {
			console.log("Login successful");
			this.props.loginUser(params.email, resolveMessage);
		}).catch((rejectMessage) => {
			console.log("Login failed");
			document.cookie = "email=none";
			document.cookie = "api_key=none";
		});
	}

	handleEmailKeyDown(event) {
		console.log(event.which);
		if (event.which === 13 || event.which === 9) {
			// enter || tab
			event.preventDefault();
			this.emailInputRef.current.blur();
			this.passwordInputRef.current.focus();
		}
	}

	handlePasswordKeyDown(event) {
		console.log(event.which);
		if (event.which === 13) {
			// enter
			this.passwordInputRef.current.blur();
			this.processLogin();
		} else if (event.which === 9) {
			// tab
			event.preventDefault();
			this.passwordInputRef.current.blur();
			this.emailInputRef.current.focus();
		}
	}

	render() {

		const {classes} = this.props;

		/*
		const {history} = this.props;

		if (this.props.loggedIn) {
			history.push('/admin/news-feed');
		}*/

		return (
			<div className="LoginPage">
				<Container maxWidth="xs">
					<Typography variant="h3" className={classes.title}>Login</Typography>

					<TextField required
					           fullWidth
					           id="email-input"
					           label="Email"
					           variant="outlined"
					           value={this.state.email}
					           inputRef={this.emailInputRef}
					           onChange={event => this.setState({email: event.target.value})}
					           onKeyDown={this.handleEmailKeyDown}
					           className={classes.textField}/>
					<TextField required
					           fullWidth
					           type="password"
					           id="password-input"
					           label="Password"
					           variant="outlined"
					           value={this.state.password}
					           inputRef={this.passwordInputRef}
					           onChange={event => this.setState({password: event.target.value})}
					           onKeyDown={this.handlePasswordKeyDown}
					           className={classes.textField}/>

					<div className="ButtonBox">
						<Button variant="contained" color="secondary" className={classes.button}>
							<Link to={"/event"} className={classes.link}>Cancel</Link>
						</Button>
						<Button variant="contained"
						        color="secondary"
						        onClick={this.processLogin}
						        className={classes.button}>login</Button>
					</div>
				</Container>
			</div>
		);
	}

}

LoginPageManager.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(LoginPageManager));
