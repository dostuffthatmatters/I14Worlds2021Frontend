import React from 'react';
import {Route} from 'react-router-dom';

import './ContentPage.scss';

import {useHistory} from 'react-router-dom';

import {EventPage} from "./UserPages/EventPage/EventPage";
import {NewsFeedPage} from "./UserPages/NewsFeedPage/NewsFeedPage";
import {GalleryPage} from "./UserPages/GalleryPage/GalleryPage";
import {AdminGalleryPage} from "./AdminPages/AdminGalleryPage/AdminGalleryPage";
import {SailorsGuidePage} from "./UserPages/SailorsGuidePage/SailorsGuidePage";
import {ContactUsPage} from "./UserPages/ContactUsPage/ContactUsPage";
import {AdminNewsFeedPage} from "./AdminPages/AdminNewsFeedPage/AdminNewsFeedPage";
import {AdminContactUsPage} from "./AdminPages/AdminContactUsPage/AdminContactUsPage";

import {Container} from "@material-ui/core";

export const ContentPage = (props) => {

	const history = useHistory();

	if (!props.loggedIn && props.path.startsWith("/admin")) {
		history.push("/event");
	}

	return (
		<Container className="ContentPage" maxWidth="sm">
			<Route path="/event">
				<EventPage/>
			</Route>
			<Route path="/news-feed">
				<NewsFeedPage/>
			</Route>
			<Route path="/gallery">
				<GalleryPage/>
			</Route>
			<Route path="/sailors-guide">
				<SailorsGuidePage/>
			</Route>
			<Route path="/contact-us">
				<ContactUsPage/>
			</Route>
			<Route path="/admin/news-feed">
				<AdminNewsFeedPage/>
			</Route>
			<Route path="/admin/gallery">
				<AdminGalleryPage/>
			</Route>
			<Route path="/admin/contact-us">
				<AdminContactUsPage/>
			</Route>
		</Container>
	);
}