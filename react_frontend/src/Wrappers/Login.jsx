import React, {Component} from 'react';
import {BackendPOST, getCookie} from "./backendCommunication";
import {Router} from "./Router";

import {BACKEND_URL} from '../constants';


export class Login extends Component {

	constructor(props) {
		super(props);
		this.state = {
			loggedIn: false,

			api: {
				email: "null",
				api_key: "null"
			}
		};

		this.loginUser = this.loginUser.bind(this);
		this.logoutUser = this.logoutUser.bind(this);
	}

	componentDidMount() {

		console.log("Trying to log in automatically");

		let params = {
			email: getCookie("email"),
			api_key: getCookie("api_key"),
		};

		BackendPOST(BACKEND_URL + "/backend/login", params).then((resolveMessage) => {
			console.log("Automatic login succeeded");

			// Changing Frontend View
			this.setState({
				loggedIn: true,
				userView: true,
				api: {
					email: params.email,
					api_key: resolveMessage
				}
			});

			document.cookie = "email=" + encodeURIComponent(params.email);
			document.cookie = "api_key=" + encodeURIComponent(resolveMessage);

		}).catch((rejectMessage) => {
			console.log("Automatic login failed");
			document.cookie = "email=none";
			document.cookie = "api_key=none";
		});
	}


	loginUser(email, api_key) {
		this.setState({
			loggedIn: true,

			api: {
				email: email,
				api_key: api_key
			}
		});

		document.cookie = "email=" + encodeURIComponent(email);
		document.cookie = "api_key=" + encodeURIComponent(api_key);
	}


	logoutUser() {
		let params = {email: this.state.api.email, api_key: this.state.api.api_key};
		BackendPOST(BACKEND_URL + "/backend/logout", params).then((resolveMessage) => {
			// Changing Frontend View
			this.setState({
				loggedIn: false,

				api: {
					email: "none",
					api_key: "none"
				}
			});

		}).catch((rejectMessage) => {
			console.log(rejectMessage);
		});

		document.cookie = "email=none";
		document.cookie = "api_key=none";
	}

	render() {
		return (
			<Router loggedIn={this.state.loggedIn}
			        loginUser={(email, api_key) => this.loginUser(email, api_key)}
			        logoutUser={this.logoutUser}/>
        );
	}
}
