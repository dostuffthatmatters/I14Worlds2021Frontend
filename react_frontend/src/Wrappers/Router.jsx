import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";

import {IndexPage} from "../App/IndexPage/IndexPage";
import {NavBar} from "../App/NavBar/NavBar";
import {ContentPage} from "../App/ContentPage/ContentPage";
import {NotFoundPage} from "../App/NotFoundPage/NotFoundPage";
import LoginPageManager from "../App/LoginPage/LoginPage";


const userRoutes = ["/event", "/news-feed", "/gallery", "/sailors-guide", "/contact-us"];
const adminRoutes = ["/admin/news-feed", "/admin/gallery", "/admin/contact-us"];


export const Router = (props) => {

	let navBarRoutes = "/(";

	userRoutes.forEach(element => {
		navBarRoutes += element.slice(1) + "|";
	});
	if (props.loggedIn) {
		adminRoutes.forEach(element => {
			navBarRoutes += element.slice(1) + "|";
		});
	}

	navBarRoutes = navBarRoutes.slice(0, -1) + ")";

	return (
		<BrowserRouter>
			<Route path={navBarRoutes}>
				<NavBar loggedIn={props.loggedIn}
				        logoutUser={props.logoutUser}/>
			</Route>
			<Switch>
				<Route exact strict path="/">
					<IndexPage/>
				</Route>
				<Route exact strict path="/login">
					<LoginPageManager loggedIn={props.loggedIn}
					                  loginUser={(email, api_key) => props.loginUser(email, api_key)}/>
				</Route>
				{userRoutes.map((path, index) => (
						<Route path={path} key={index}>
							<ContentPage loggedIn={props.loggedIn}
							             path={path}/>
						</Route>
					)
				)}
				{adminRoutes.map((path, index) => (
						<Route path={path} key={index}>
							<ContentPage loggedIn={props.loggedIn}
							             path={path}/>
						</Route>
					)
				)}
				<Route path="/">
					<NotFoundPage/>
				</Route>
			</Switch>
		</BrowserRouter>
	);
};