
/* General Imports --------------------------------------------------------------- */
import React from 'react';


/* Routing Imports --------------------------------------------------------------- */
// noinspection ES6CheckImport
import {Switch, Route, BrowserRouter, Redirect} from 'react-router-dom';


/* Component Imports ------------------------------------------------------------- */
import {IndexPage} from "../App/IndexPage/IndexPage";
import {NavBar} from "../App/NavBar/NavBar";
import {Footer} from "../App/Footer/Footer";
import {ContentPage} from "../App/ContentPage/ContentPage";
import {NotFoundPage} from "../App/NotFoundPage/NotFoundPage";
import LoginPageManager from "../App/LoginPage/LoginPage";


/* Data -------------------------------------------------------------------------- */


const userRoutes = ["/event", "/news-feed", "/gallery", "/sailors-guide", "/contact-us"];
const adminRoutes = ["/admin/news-feed", "/admin/gallery", "/admin/contact-us"];


/* Component --------------------------------------------------------------------- */


export const Router = (props) => {

	let navBarRoutes = "/(";

	let [websiteHidden, hideWebsite] = React.useState(false);

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
				{!websiteHidden && (
					<NavBar loggedIn={props.loggedIn}
					        logoutUser={props.logoutUser}/>
				)}
			</Route>
			<Switch>
				<Route exact strict path="/">
					<IndexPage/>
				</Route>
				<Route exact strict path="/login">
					{props.loggedIn && (
						<Redirect to="/admin/news-feed"/>
					)}
					{!props.loggedIn && (
						<LoginPageManager loggedIn={props.loggedIn}
						                  loginUser={(email, api_key) => props.loginUser(email, api_key)}/>
					)}
				</Route>
				{userRoutes.map((path, index) => (
						<Route path={path} key={index}>
							<ContentPage loggedIn={props.loggedIn}
							             path={path}
							             hideWebsite={hideWebsite}/>
						</Route>
					)
				)}
				{adminRoutes.map((path, index) => (
						<Route path={path} key={index}>
							<ContentPage automaticLogin={props.automaticLogin}
							             loggedIn={props.loggedIn}
							             path={path}
							             api={props.api}/>
						</Route>
					)
				)}
				<Route path="/">
					<NotFoundPage/>
				</Route>
			</Switch>
			<Route path={navBarRoutes}>
				{!websiteHidden && (
					<Footer/>
				)}
			</Route>
		</BrowserRouter>
	);
};
