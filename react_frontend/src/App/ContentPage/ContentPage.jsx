/* General Imports --------------------------------------------------------------- */
import React from 'react';


/* Routing Imports --------------------------------------------------------------- */
// noinspection ES6CheckImport
import {Route, Switch, useHistory} from 'react-router-dom';


/* Styling Imports --------------------------------------------------------------- */
import './ContentPage.scss';


/* Material UI Imports ----------------------------------------------------------- */
import {Container} from "@material-ui/core";


/* Component Imports ------------------------------------------------------------- */
import EventPage from "./UserPages/EventPage/EventPage";
import NewsFeedPageManager from "./UserPages/NewsFeedPage/NewsFeedPage";
import GalleryPageManager from "./UserPages/GalleryPage/GalleryPage";
import AdminGalleryPageManager from "./AdminPages/AdminGalleryPage/AdminGalleryPage";
import SailorsGuidePage from "./UserPages/SailorsGuidePage/SailorsGuidePage";
import ContactUsPageManager from "./UserPages/ContactUsPage/ContactUsPage";
import AdminNewsFeedPageManager from "./AdminPages/AdminNewsFeedPage/AdminNewsFeedPage";
import AdminContactUsPageManager from "./AdminPages/AdminContactUsPage/AdminContactUsPage";


/* Component --------------------------------------------------------------------- */


export const ContentPage = (props) => {

	const history = useHistory();

	// Redirecting from admin page to user page if the user
	// is not logged in. In case the login process is still
	// going on the view remains empty (Navbar and Footer visible)
	if (props.path.startsWith("/admin")) {
		if (props.automaticLogin) {
			return <Container className="ContentPage" maxWidth="md"/>;
		} else if (!props.loggedIn) {
			history.push("/event");
		}
	}

	return (
		<React.Fragment>
			<Switch>
				<Route path="/event">
					<EventPage/>
				</Route>
				<Route>
					<Container className="ContentPage" maxWidth="md">
						<Route path="/news-feed">
							<NewsFeedPageManager hideWebsite={props.hideWebsite}/>
						</Route>
						<Route path="/gallery">
							<GalleryPageManager hideWebsite={props.hideWebsite}/>
						</Route>
						<Route path="/sailors-guide">
							<SailorsGuidePage/>
						</Route>
						<Route path="/contact-us">
							<ContactUsPageManager/>
						</Route>
						<Route path="/admin/news-feed">
							<AdminNewsFeedPageManager api={props.api}/>
						</Route>
						<Route path="/admin/gallery">
							<AdminGalleryPageManager api={props.api}/>
						</Route>
						<Route path="/admin/contact-us">
							<AdminContactUsPageManager api={props.api}/>
						</Route>
					</Container>
				</Route>
			</Switch>
		</React.Fragment>
	);
};
