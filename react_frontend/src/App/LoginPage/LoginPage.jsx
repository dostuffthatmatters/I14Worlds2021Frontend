/* General Imports --------------------------------------------------------------- */
import React from 'react';


/* Routing Imports --------------------------------------------------------------- */
import {Link} from 'react-router-dom';


/* Styling Imports --------------------------------------------------------------- */
import './LoginPage.scss';


/* AJAX Imports ------------------------------------------------------------------ */
import {BackendREST} from "../../Wrappers/backendCommunication";
import {BACKEND_URL} from '../../constants';


/* Material UI Imports ----------------------------------------------------------- */
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


/* Hook Linking Imports ---------------------------------------------------------- */
import PropTypes from 'prop-types';
import withStyles from '@material-ui/styles/withStyles/withStyles';
// noinspection ES6CheckImport
import {withRouter} from "react-router-dom";

/* Styles ------------------------------------------------------------------------ */


const styles = theme => ({
	title: {
		display: "block",
		textAlign: "center",
		marginBottom: theme.spacing(2)
	},
	link: {
		textDecoration: "none",
		display: "block"
	},
	button: {
		color: "white"
	},
	textField: {
		display: "block",
		marginBottom: theme.spacing(1)
	},
	wrapper: {
		marginTop: theme.spacing(1),
		marginLeft: theme.spacing(0.5),
		marginRight: theme.spacing(0.5),
		position: 'relative',
	},
	buttonProgress: {
		position: 'absolute',
		top: '50%',
		left: '50%',
		marginTop: -12,
		marginLeft: -12,
	},
	snackbar: {
		margin: theme.spacing(1)
	},
	snackbarContentError: {
		backgroundColor: theme.palette.primary.main,
	},
	snackbarContentSuccess: {
		backgroundColor: theme.palette.secondary.main,
	},
});


/* Component --------------------------------------------------------------------- */


class LoginPageManager extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: false,
			email: "",
			password: "",
			errorMessageVisible: false,
			errorMessageText: "",
		};

		this.emailInputRef = React.createRef();
		this.passwordInputRef = React.createRef();

		this.processLogin = this.processLogin.bind(this);
		this.handleEmailKeyDown = this.handleEmailKeyDown.bind(this);
		this.handlePasswordKeyDown = this.handlePasswordKeyDown.bind(this);
	}

	processLogin() {
		console.log("Trying to log in");

		this.setState({
			loading: true
		});

		let params = {
			email: this.state.email,
			password: this.state.password,
		};

		BackendREST(BACKEND_URL + "/backend/login", params, "POST").then((resolveMessage) => {
			const resultJson = JSON.parse(resolveMessage);

			if (resultJson["Status"] === "Ok") {
				console.log("Login: Status = Ok");
				this.setState({
					loading: false,
					successMessageVisible: true,
					successMessageText: "Login successful!"
				});
				setTimeout(() => {
					this.props.loginUser(params.email, resultJson["api_key"], resultJson["name"]);
					// The redirect now happens automatically
				}, 600);
			} else {
				console.log("Login failed: " + resultJson["Status"]);
				this.setState({
					loading: false,
					errorMessageVisible: true,
					errorMessageText: resultJson["Status"]
				});
			}

		}).catch((rejectMessage) => {
			console.log("Login failed: " + rejectMessage);
			const resultJson = JSON.parse(rejectMessage);

			this.setState({
				loading: false,
				errorMessageVisible: true,
				errorMessageText: resultJson["Status"]
			});
		});
	}

	handleEmailKeyDown(event) {
		this.setState({
			errorMessageVisible: false,
		});

		if (event.which === 13 || event.which === 9) {
			// enter || tab
			event.preventDefault();
			this.emailInputRef.current.blur();
			this.passwordInputRef.current.focus();
		}
	}

	handlePasswordKeyDown(event) {
		this.setState({
			errorMessageVisible: false,
		});

		if (event.which === 13) {
			// enter
			this.passwordInputRef.current.blur();
			this.processLogin();
		} else if (event.which === 9) {
			// tab
			event.preventDefault();
			this.passwordInputRef.current.blur();
			this.emailInputRef.current.focus();
		}
	}

	render() {

		const {classes} = this.props;

		return (
			<div className="LoginPage">
				<Container maxWidth="xs">
					<Typography variant="h3" className={classes.title}>Login</Typography>

					<TextField required
					           fullWidth
					           disabled={this.state.loading}
					           id="email-input"
					           label="Email"
					           variant="outlined"
					           value={this.state.email}
					           inputRef={this.emailInputRef}
					           onChange={event => this.setState({email: event.target.value})}
					           onKeyDown={this.handleEmailKeyDown}
					           className={classes.textField}/>
					<TextField required
					           fullWidth
					           disabled={this.state.loading}
					           type="password"
					           id="password-input"
					           label="Password"
					           variant="outlined"
					           value={this.state.password}
					           inputRef={this.passwordInputRef}
					           onChange={event => this.setState({password: event.target.value})}
					           onKeyDown={this.handlePasswordKeyDown}
					           className={classes.textField}/>
					<div className="ButtonBox">
						<div className={classes.wrapper}>
							<Button variant="contained"
							        disabled={this.state.loading}
							        color="secondary"
							        className={classes.button}>
								<Link to={"/event"} className={classes.link}>Cancel</Link>
							</Button>
						</div>
						<div className={classes.wrapper}>
							<Button variant="contained"
							        disabled={this.state.loading}
							        color="secondary"
							        onClick={this.processLogin}
							        className={classes.button}>login</Button>
							{this.state.loading && (
								<CircularProgress size={24}
								                  className={classes.buttonProgress}
								                  color="secondary"/>
							)
							}
						</div>
					</div>
					{this.state.errorMessageVisible && (
						<Snackbar className={classes.snackbar}
						          open={true}
						          anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}>
							<SnackbarContent
								className={classes.snackbarContentError}
								aria-describedby = "message-id"
								message={<span id="message-id">{this.state.errorMessageText}</span>}
							/>
						</Snackbar>
					)}
					{this.state.successMessageVisible && (
						<Snackbar className={classes.snackbar}
						          open={true}
						          anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}>
							<SnackbarContent
								className={classes.snackbarContentSuccess}
								aria-describedby = "message-id"
								message={<span id="message-id">{this.state.successMessageText}</span>}
							/>
						</Snackbar>
					)}
				</Container>
			</div>
		);
	}

}

LoginPageManager.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(LoginPageManager));
