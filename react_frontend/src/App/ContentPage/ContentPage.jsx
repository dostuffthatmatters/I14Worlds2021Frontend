/* General Imports --------------------------------------------------------------- */
import React from 'react';


/* Routing Imports --------------------------------------------------------------- */
// noinspection ES6CheckImport
import {useHistory} from 'react-router-dom';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';


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

	if (props.path.startsWith("/admin")) {
		if (props.automaticLogin) {
			console.log({source: "contentPage:25"});
			return "";
		} else if (!props.loggedIn) {
			console.log({source: "contentPage:28"});
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
							<NewsFeedPageManager/>
						</Route>
						<Route path="/gallery">
							<GalleryPageManager/>
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
