/* General Imports --------------------------------------------------------------- */
import React, {useState} from 'react';
import {animateScroll as scroll} from 'react-scroll';


/* Routing Imports --------------------------------------------------------------- */
import {Link} from 'react-router-dom';


/* Styling Imports --------------------------------------------------------------- */
import {makeStyles} from "@material-ui/core/styles";
import './NavBar.scss';
import clsx from 'clsx';


/* Material UI Imports ----------------------------------------------------------- */
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

import MenuIcon from '@material-ui/icons/Menu';
import EmojiEventsTwoToneIcon from '@material-ui/icons/EmojiEventsTwoTone';
import ChatTwoToneIcon from '@material-ui/icons/ChatTwoTone';
import PermMediaTwoToneIcon from '@material-ui/icons/PermMediaTwoTone';
import AssignmentTurnedInTwoToneIcon from '@material-ui/icons/AssignmentTurnedInTwoTone';
import ContactMailTwoToneIcon from '@material-ui/icons/ContactMailTwoTone';
import AccountCircleTwoToneIcon from '@material-ui/icons/AccountCircleTwoTone';


/* Asset Imports ----------------------------------------------------------- */
import HeaderLogo from './images/HeaderLogo.svg';


/* Component --------------------------------------------------------------------- */


const useStyles = makeStyles(theme => ({
	navBar: {
		backgroundColor: theme.palette.gunmetalGray.main,
	},
	menuButton: {
		marginRight: theme.spacing(1),
	},
	title: {
		flexGrow: 1,
	},
	I14Button: {
		marginTop: 4,
		backgroundColor: "transparent !important",
		overflow: "visible",
		borderRadius: "0",
	},
	I14Icon: {
		backgroundColor: "transparent !important",
		height: theme.spacing(5),
		margin: "-6px",
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
	drawerBox: {
		height: "100vh",
		position: "relative",
	},
	drawerScrollBox: {
		paddingBottom: theme.spacing(10),
	},
	loginButtonBox: {
		paddingTop: theme.spacing(1),
		paddingBottom: theme.spacing(1),
		position: "fixed",
		left: 0,
		bottom: 0,
		backgroundColor: "white",
	},
	loginButton: {
		padding: theme.spacing(1),
		width: "225px",
		textTransform: "capitalize",
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

	const handleClick = () => {
		scroll.scrollToTop({duration: 300});
	};

	const userPages = (
		<React.Fragment>
			<Link to="/event"
			      className={classes.link}
			      onClick={handleClick}>
				<Button size="large"
				        color={path.startsWith("/event") ? "secondary" : "primary"}
				        startIcon={<EmojiEventsTwoToneIcon alt="Event Icon"/>}
				        className={clsx(classes.button, classes.topButton)}>Event</Button>
			</Link>
			{/*
			<Link to="/news-feed"
			      className={classes.link}
			      onClick={handleClick}>
				<Button size="large"
				        color={path.startsWith("/news-feed") ? "secondary" : "primary"}
				        startIcon={<ChatTwoToneIcon alt="News Feed Icon"/>}
				        className={classes.button}>News Feed</Button>
			</Link>
			<Link to="/gallery"
			      className={classes.link}
			      onClick={handleClick}>
				<Button size="large"
				        color={path.startsWith("/gallery") ? "secondary" : "primary"}
				        startIcon={<PermMediaTwoToneIcon alt="Gallery Icon"/>}
				        className={classes.button}>Gallery</Button>
			</Link>*/}
			<Link to="/sailors-guide"
			      className={classes.link}
			      onClick={handleClick}>
				<Button size="large"
				        color={path.startsWith("/sailors-guide") ? "secondary" : "primary"}
				        startIcon={<AssignmentTurnedInTwoToneIcon alt="Sailors Guide Icon"/>}
				        className={classes.button}>Sailors Guide</Button>
			</Link>
			<Link to="/contact-us"
			      className={classes.link}
			      onClick={handleClick}>
				<Button size="large"
				        color={path.startsWith("/contact-us") ? "secondary" : "primary"}
				        startIcon={<ContactMailTwoToneIcon alt="Contact Us Icon"/>}
				        className={classes.button}>Contact Us</Button>
			</Link>
		</React.Fragment>
	);

	const adminPages = (
		<React.Fragment>
			<Link to="/admin/news-feed"
			      className={classes.link}
			      onClick={handleClick}>
				<Button size="large"
				        color={path.startsWith("/admin/news-feed") ? "secondary" : "primary"}
				        startIcon={<ChatTwoToneIcon alt="Admin News Feed Icon"/>}
				        className={classes.button}>Admin - News Feed</Button>
			</Link>
			<Link to="/admin/gallery"
			      className={classes.link}
			      onClick={handleClick}>
				<Button size="large"
				        color={path.startsWith("/admin/gallery") ? "secondary" : "primary"}
				        startIcon={<PermMediaTwoToneIcon alt="Admin Gallery Icon"/>}
				        className={classes.button}>Admin - Gallery</Button>
			</Link>
			<Link to="/admin/contact-us"
			      className={classes.link}
			      onClick={handleClick}>
				<Button size="large"
				        color={path.startsWith("/admin/contact-us") ? "secondary" : "primary"}
				        startIcon={<ContactMailTwoToneIcon alt="Admin Contact Us Icon"/>}
				        className={classes.button}>Admin - Contact Us</Button>
			</Link>
		</React.Fragment>
	);

	let loginButton;

	if (props.loggedIn) {
		loginButton = (
			<div className={classes.loginButtonBox}>
				<Button size="large"
				        startIcon={<AccountCircleTwoToneIcon alt="Logout Icon"/>}
				        className={clsx(classes.button, classes.loginButton)}
				        onClick={() => {
					        handleClick();
					        props.logoutUser();
				        }}>
					Logout
				</Button>
			</div>
		);
	} else {
		loginButton = (
			<Link to="/login"
			      className={clsx(classes.link, classes.loginButtonBox)}
			      onClick={handleClick}>
				<Button size="large"
				        startIcon={<AccountCircleTwoToneIcon alt="Login Icon"/>}
				        className={clsx(classes.button, classes.loginButton)}>
					Login
				</Button>
			</Link>
		);
	}

	return (
		<React.Fragment>
			<AppBar position="fixed" className={classes.navBar}>
				<Toolbar>
					<IconButton edge="start"
					            color="inherit"
					            aria-label="menu"
					            className={classes.menuButton}
					            onClick={() => toggleDrawer(true)}>
						<MenuIcon alt="Menu Icon"/>
					</IconButton>
					<Typography variant="h6" className={classes.title}>{pageTitle}</Typography>
					<IconButton edge="end"
					            aria-label="index"
					            className={classes.I14Button}
					            disableRipple={true}>
						<Link to="/">
							<img src={HeaderLogo} className={classes.I14Icon} alt="I14 Icon"/>
						</Link>
					</IconButton>
				</Toolbar>
			</AppBar>
			<Drawer open={drawerIsOpen}
			        onClose={() => toggleDrawer(false)}
			        onClick={() => toggleDrawer(false)}
			        onKeyDown={() => toggleDrawer(false)}>
				<div role="presentation" className={classes.drawerBox}>
					<div className={classes.drawerScrollBox}>
						{userPages}
						{props.loggedIn && <Divider className={classes.divider}/>}
						{props.loggedIn && adminPages}
					</div>
					{loginButton}
				</div>
			</Drawer>
		</React.Fragment>
	);
};