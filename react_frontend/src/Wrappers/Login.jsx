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
				email: Cookies.get("email"),
				api_key: Cookies.get("api_key"),
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
			const resultJson = JSON.parse(resolveMessage);

			if (resultJson["Status"] === "Ok") {
				console.log("Automatic login: Status = " + resolveMessage);
				this.loginUser(params.email, resultJson["api_key"], resultJson["name"]);
			} else {
				console.log("Automatic login failed");
				this.setState({
					automaticLogin: false
				});
				Cookies.remove('email');
				Cookies.remove('api_key');
			}

		}).catch((rejectMessage) => {
			console.log("Automatic login failed");

			this.setState({
				automaticLogin: false
			});

			Cookies.remove('email');
			Cookies.remove('api_key');

		});
	}


	loginUser(email, api_key, name) {

		Cookies.set('email', email, {expires: 7});
		Cookies.set('api_key', api_key, {expires: 7});

		this.setState({
			loggedIn: true,
			automaticLogin: false,

			api: {
				email: email,
				api_key: api_key,
				name: name
			}
		});

		// The cookie will not be accessible on all domains-paths
		// when I don't set it again after the view refresh ...
		Cookies.set('email', email, {expires: 7});
		Cookies.set('api_key', api_key, {expires: 7});
	}


	logoutUser() {
		let params = {email: this.state.api.email, api_key: this.state.api.api_key};
		BackendPOST(BACKEND_URL + "/backend/logout", params).then((resolveMessage) => {
			// Changing Frontend View
			this.setState({
				loggedIn: false,

				api: {
					email: "none",
					api_key: "none",
					name: "none"
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
