import React, {Component} from 'react';
import {BackendPOST} from "./backendCommunication";
import {Router} from "./Router";

import {BACKEND_URL} from '../constants';

import Cookies from 'js-cookie'


export class Login extends Component {

	constructor(props) {
		super(props);
		this.state = {
			loggedIn: false,
			automaticLogin: true,

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
			email: Cookies.get("email"),
			api_key: Cookies.get("api_key"),
		};

		console.log({cookie: params});

		BackendPOST(BACKEND_URL + "/backend/login", params).then((resolveMessage) => {
			console.log("Automatic login succeeded");

			this.loginUser(params.email, resolveMessage);

		}).catch((rejectMessage) => {
			console.log("Automatic login failed");

			this.setState({
				automaticLogin: false
			});

			Cookies.remove('email');
			Cookies.remove('api_key');

		});
	}


	loginUser(email, api_key) {

		Cookies.set('email', email, { expires: 7 });
		Cookies.set('api_key', api_key, { expires: 7 });

		this.setState({
			loggedIn: true,
			automaticLogin: false,

			api: {
				email: email,
				api_key: api_key
			}
		});

		Cookies.set('email', email, { expires: 7 });
		Cookies.set('api_key', api_key, { expires: 7 });

		// document.cookie = "email=" + encodeURIComponent(email);
		// document.cookie = "api_key=" + encodeURIComponent(api_key);
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

		Cookies.remove('email');
		Cookies.remove('api_key');

		// document.cookie = "email=";
		// document.cookie = "api_key=";
	}

	render() {
		return (
			<Router automaticLogin={this.state.automaticLogin}
			        loggedIn={this.state.loggedIn}
			        loginUser={(email, api_key) => this.loginUser(email, api_key)}
			        logoutUser={this.logoutUser}
			        api={this.state.api}/>
        );
	}
}
