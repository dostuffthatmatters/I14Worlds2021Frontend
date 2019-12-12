/* General Imports --------------------------------------------------------------- */
import React, {useState} from 'react';


/* Routing Imports --------------------------------------------------------------- */
import Link from 'react-router-dom/Link';


/* Styling Imports --------------------------------------------------------------- */
import {makeStyles} from "@material-ui/core";
import './NavBar.scss';


/* Material UI Imports ----------------------------------------------------------- */
import {
	AppBar,
	Toolbar,
	IconButton,
	Typography,
	Drawer,
	Divider,
	Button
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import EmojiEventsTwoToneIcon from '@material-ui/icons/EmojiEventsTwoTone';
import ChatTwoToneIcon from '@material-ui/icons/ChatTwoTone';
import PermMediaTwoToneIcon from '@material-ui/icons/PermMediaTwoTone';
import AssignmentTurnedInTwoToneIcon from '@material-ui/icons/AssignmentTurnedInTwoTone';
import ContactMailTwoToneIcon from '@material-ui/icons/ContactMailTwoTone';
import AccountCircleTwoToneIcon from '@material-ui/icons/AccountCircleTwoTone';


/* Asset Imports ----------------------------------------------------------- */
import I14Icon from './images/I14Icon.svg';


/* Component --------------------------------------------------------------------- */


const useStyles = makeStyles(theme => ({
	menuButton: {
		marginRight: theme.spacing(1),
	},
	title: {
		flexGrow: 1,
	},
	i14Icon: {
		width: theme.spacing(4),
		height: theme.spacing(4),
	},
	button: {
		margin: theme.spacing(1),
		marginBottom: 0,
		padding: theme.spacing(1),
		width: "225px",
		alignItems: "flex-start",
		justifyContent: "left",
		textTransform: "capitalize",
		transitionDelay: 0,
		transitionDuration: 0
	},
	topButton: {
		marginTop: theme.spacing(1)
	},
	link: {
		textDecoration: "none",
		display: "block"
	},
	divider: {
		marginTop: theme.spacing(2),
		marginBottom: theme.spacing(1),
		marginRight: theme.spacing(1),
		marginLeft: theme.spacing(1),
	},
	loginButton: {
		padding: theme.spacing(1),
		width: "225px",
		textTransform: "capitalize",
		position: "absolute",
		left: 0,
		bottom: theme.spacing(1),
		backgroundColor: "white"
	},
}));

export const NavBar = (props) => {

	const [drawerIsOpen, toggleDrawer] = useState(false);
	const path = window.location.pathname;

	const classes = useStyles();

	let pageTitle = "";

	if (path.startsWith("/event")) {
		pageTitle = "Event";
	} else if (path.startsWith("/news-feed") || path.startsWith("/admin/news-feed")) {
		pageTitle = "News Feed";
	} else if (path.startsWith("/gallery") || path.startsWith("/admin/gallery")) {
		pageTitle = "Gallery";
	} else if (path.startsWith("/sailors-guide")) {
		pageTitle = "Sailors Guide";
	} else if (path.startsWith("/contact-us") || path.startsWith("/admin/contact-us")) {
		pageTitle = "Contact Us";
	}

	if (path.startsWith("/admin")) {
		pageTitle += " (Admin)";
	}

	const userPages = (
		<React.Fragment>
			<Link to="/event" className={classes.link}>
				<Button size="large"
				        color={path.startsWith("/event") ? "secondary" : "primary"}
				        startIcon={<EmojiEventsTwoToneIcon/>}
				        className={`${classes.button} ${classes.topButton}`}>Event</Button>
			</Link>
			<Link to="/news-feed" className={classes.link}>
				<Button size="large"
				        color={path.startsWith("/news-feed") ? "secondary" : "primary"}
				        startIcon={<ChatTwoToneIcon/>}
				        className={classes.button}>News Feed</Button>
			</Link>
			<Link to="/gallery" className={classes.link}>
				<Button size="large"
				        color={path.startsWith("/gallery") ? "secondary" : "primary"}
				        startIcon={<PermMediaTwoToneIcon/>}
				        className={classes.button}>Gallery</Button>
			</Link>
			<Link to="/sailors-guide" className={classes.link}>
				<Button size="large"
				        color={path.startsWith("/sailors-guide") ? "secondary" : "primary"}
				        startIcon={<AssignmentTurnedInTwoToneIcon/>}
				        className={classes.button}>Sailors Guide</Button>
			</Link>
			<Link to="/contact-us" className={classes.link}>
				<Button size="large"
				        color={path.startsWith("/contact-us") ? "secondary" : "primary"}
				        startIcon={<ContactMailTwoToneIcon/>}
				        className={classes.button}>Contact Us</Button>
			</Link>
		</React.Fragment>
	);

	const adminPages = (
		<React.Fragment>
			<Link to="/admin/news-feed" className={classes.link}>
				<Button size="large"
				        color={path.startsWith("/admin/news-feed") ? "secondary" : "primary"}
				        startIcon={<ChatTwoToneIcon/>}
				        className={classes.button}>Admin - News Feed</Button>
			</Link>
			<Link to="/admin/gallery" className={classes.link}>
				<Button size="large"
				        color={path.startsWith("/admin/gallery") ? "secondary" : "primary"}
				        startIcon={<PermMediaTwoToneIcon/>}
				        className={classes.button}>Admin - Gallery</Button>
			</Link>
			<Link to="/admin/contact-us" className={classes.link}>
				<Button size="large"
				        color={path.startsWith("/admin/contact-us") ? "secondary" : "primary"}
				        startIcon={<ContactMailTwoToneIcon/>}
				        className={classes.button}>Admin - Contact Us</Button>
			</Link>
		</React.Fragment>
	);

	let loginButton;

	if (props.loggedIn) {
		loginButton = (
			<Button size="large"
			        startIcon={<AccountCircleTwoToneIcon/>}
			        className={`${classes.button} ${classes.loginButton}`}
			        onClick={props.logoutUser}>
				Logout
			</Button>
		);
	} else {
		loginButton = (
			<Link to="/login" className={classes.link}>
				<Button size="large"
				        startIcon={<AccountCircleTwoToneIcon/>}
				        className={`${classes.button} ${classes.loginButton}`}>
					Login
				</Button>
			</Link>
		);
	}

	return (
		<React.Fragment>
			<AppBar position="fixed">
				<Toolbar>
					<IconButton edge="start"
					            color="inherit"
					            aria-label="menu"
					            className={classes.menuButton}
					            onClick={() => toggleDrawer(true)}>
						<MenuIcon/>
					</IconButton>
					<Typography variant="h6" className={classes.title}>{pageTitle}</Typography>
					<IconButton edge="end"
					            color="inherit"
					            aria-label="index">
						<Link to="/">
							<img src={I14Icon} className={classes.i14Icon} alt="I14 Icon"/>
						</Link>
					</IconButton>
				</Toolbar>
			</AppBar>
			<Drawer open={drawerIsOpen}
			        onClose={() => toggleDrawer(false)}
			        onClick={() => toggleDrawer(false)}
			        onKeyDown={() => toggleDrawer(false)}>
				<div role="presentation">
					{userPages}
					{props.loggedIn && <Divider className={classes.divider}/>}
					{props.loggedIn && adminPages}
					{loginButton}
				</div>
			</Drawer>
		</React.Fragment>
	);
};