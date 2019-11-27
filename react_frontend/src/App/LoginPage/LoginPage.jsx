import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { useHistory } from "react-router-dom";

import {makeStyles} from "@material-ui/styles";

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import './LoginPage.scss';
import {Container, Typography} from "@material-ui/core";
import {BackendPOST, getCookie} from "../../Wrappers/backendCommunication";

export class LoginPageManager extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: "",
			password: ""
		};

		this.processLogin = this.processLogin.bind(this);
	}

	processLogin() {
		console.log("Trying to log in");

		let params = {
			email: this.state.email,
			password: this.state.password,
		};

		BackendPOST("http://127.0.0.1:5000/backend/login", params).then((resolveMessage) => {
			console.log("Login successfull");
			this.props.loginUser(params.email, resolveMessage);
		}).catch((rejectMessage) => {
			console.log("Login failed");
			document.cookie = "email=none";
			document.cookie = "api_key=none";
		});
	}

	render() {
		return (
			<LoginPage loggedIn={this.props.loggedIn}
			           email={this.state.email}
			           onEmailChange={text => this.setState({email: text})}
			           password={this.state.password}
			           onPasswordChange={text => this.setState({password: text})}
			           onLogin={this.processLogin}/>
		);
	}

}


const useStyles = makeStyles(theme => ({
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
}));

const LoginPage = (props) => {
	const history = useHistory();

	if (props.loggedIn) {
		history.push("/admin/news-feed");
	}

	const classes = useStyles();
	return (
		<div className="LoginPage">
			<Container maxWidth="sm">
				<Typography variant="h3" className={classes.title}>Login</Typography>
				<TextField required
				           fullWidth
				           id="email-input"
				           label="Email"
				           variant="outlined"
				           value={props.email}
				           onChange={event => props.onEmailChange(event.target.value)}
				           className={classes.textField}/>
				<TextField required
				           fullWidth
				           type="password"
				           id="password-input"
				           label="Password"
				           variant="outlined"
				           value={props.password}
				           onChange={event => props.onPasswordChange(event.target.value)}
				           className={classes.textField}/>
				<div className="ButtonBox">
					<Button variant="contained" color="secondary" className={classes.button}>
						<Link to={"/event"} className={classes.link}>Cancel</Link>
					</Button>
					<Button variant="contained"
					        color="secondary"
					        onClick={props.onLogin}
					        className={classes.button}>login</Button>
				</div>
			</Container>
		</div>
	);
};
