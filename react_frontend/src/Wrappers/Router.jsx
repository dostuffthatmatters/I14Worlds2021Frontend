/* General Imports --------------------------------------------------------------- */
import React from 'react';
import {animateScroll as scroll} from "react-scroll";


/* Routing Imports --------------------------------------------------------------- */
// noinspection ES6CheckImport
import {Switch, Route, BrowserRouter, Redirect} from 'react-router-dom';

/* Component Imports ------------------------------------------------------------- */
import {IndexPage} from "../App/IndexPage/IndexPage";
import {NavBar} from "../App/NavBar/NavBar";
import {Footer} from "../App/Footer/Footer";
import {ContentPage} from "../App/ContentPage/ContentPage";
import {NotFoundPage} from "../App/NotFoundPage/NotFoundPage";
import LinearProgress from "@material-ui/core/LinearProgress";

const LoginPageManager = React.lazy(() => {
	console.log("Importing LoginPage JS now.");
	return import("../App/LoginPage/LoginPage");
});

/* Data -------------------------------------------------------------------------- */

const userRoutesPlain = ["/event", "/news-feed", "/gallery", "/sailors-guide", "/contact-us"];
const userRoutesNested = ["/event", "/(news-feed|news-feed/:articleId)", "/(gallery|gallery/:albumId)", "/sailors-guide", "/contact-us"];

const adminRoutesPlain = ["/admin/news-feed", "/admin/news-feed", "/admin/gallery", "/admin/gallery", "/admin/gallery", "/admin/contact-us"];
const adminRoutesNested = ["/admin/(news-feed|news-feed/:articleId)", "/admin/(gallery|gallery/:albumId|gallery/:albumId/:imageId)", "/admin/contact-us"];

/* Component --------------------------------------------------------------------- */


export const Router = (props) => {

	let navBarRoutes = "/(";

	let [websiteHidden, hideWebsite] = React.useState(false);

	userRoutesPlain.forEach(element => {
		navBarRoutes += element.slice(1) + "|";
	});
	if (props.loggedIn) {
		adminRoutesPlain.forEach(element => {
			navBarRoutes += element.slice(1) + "|";
		});
	}

	window.onpopstate = () => {
		scroll.scrollToTop({duration: 300});
	};

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
						<React.Suspense fallback={<FullPageLoader/>}>
							<LoginPageManager loggedIn={props.loggedIn}
							                  loginUser={(email, api_key) => props.loginUser(email, api_key)}/>
						</React.Suspense>
					)}
				</Route>
				{userRoutesNested.map((path, index) => (
						<Route path={path} key={index}>
							<ContentPage loggedIn={props.loggedIn}
							             path={path}
							             hideWebsite={hideWebsite}/>
						</Route>
					)
				)}
				{adminRoutesNested.map((path, index) => (
						<Route path={path} key={index}>
							<ContentPage automaticLogin={props.automaticLogin}
							             loggedIn={props.loggedIn}
							             path={path}
							             api={props.api}/>
						</Route>
					)
				)}
				<Route>
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


const FullPageLoader = props => {

	const styles = {
		position: "absolute",
		top: "50vh",
		left: "5vw",
		width: "90vw",
		borderRadius: "2px",
	};

	return (
		<LinearProgress style={styles} color="secondary"/>
	)
};