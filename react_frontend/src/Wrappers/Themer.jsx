/* General Imports --------------------------------------------------------------- */
import React from 'react';


/* Styling Imports --------------------------------------------------------------- */
import {createMuiTheme} from "@material-ui/core";
import {ThemeProvider} from "@material-ui/styles";
import {BreakpointProvider} from 'react-socks';


/* Component Imports ------------------------------------------------------------- */
import {Login} from './Login';


/* Theme ------------------------------------------------------------------------- */


const theme = createMuiTheme({
	palette : {
		primary: {
			main: '#282c34',
			transparent80: 'rgba(40, 44, 52, 0.8)',
		},
		secondary: {
			main: 'hsl(340, 100%, 50%)',
			transparent80: 'hsla(340, 100%, 50%, 0.8)',
		},
		white: {
			main: 'rgb(255, 255, 255)',
		}
	}
});


/* Component --------------------------------------------------------------------- */


export const Themer = () => {
	return (
		<ThemeProvider theme={theme}>
			<BreakpointProvider>
				<Login/>
			</BreakpointProvider>
		</ThemeProvider>
	);
};
