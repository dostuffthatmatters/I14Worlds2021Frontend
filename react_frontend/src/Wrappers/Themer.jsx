/* General Imports --------------------------------------------------------------- */
import React from 'react';


/* Styling Imports --------------------------------------------------------------- */
import {createMuiTheme} from "@material-ui/core/styles";
import {ThemeProvider} from "@material-ui/core/styles";
import {BreakpointProvider} from 'react-socks';


/* Component Imports ------------------------------------------------------------- */
import {Login} from './Login';


/* Theme ------------------------------------------------------------------------- */


const theme = createMuiTheme({
	palette : {
		primary: {
			main: 'hsl(229, 25%, 18%)',
			transparent80: 'rgba(40, 44, 52, 0.8)',
		},
		secondary: {
			main: 'hsl(344, 93%, 50%)',
			transparent80: 'hsla(340, 100%, 50%, 0.8)',
		},
		white: {
			main: 'rgb(255, 255, 255)',
			transparent80: 'rgba(255, 255, 255, 0.8)',
			transparent60: 'rgba(255, 255, 255, 0.6)',
		},

		maastrichtBlue: {
			main: 'hsl(237, 77%, 18%)',
			transparent80: 'hsla(237, 77%, 18%, 0.8)',
			transparent60: 'hsla(237, 77%, 18%, 0.6)',
		},
		pinctonBlue: {
			main: 'hsl(206, 81%, 50%)',
			transparent80: 'hsla(206, 81%, 50%, 0.8)',
			transparent60: 'hsla(206, 81%, 50%, 0.6)',
		},
		desireMagenta: {
			main: 'hsl(344, 93%, 50%)',
			transparent80: 'hsla(344, 93%, 50%, 0.8)',
			transparent60: 'hsla(344, 93%, 50%, 0.6)',
		},
		gunmetalGray: {
			main: 'hsl(229, 25%, 18%)',
			transparent80: 'hsla(229, 25%, 18%, 0.8)',
			transparent60: 'hsla(229, 25%, 18%, 0.6)',
		},
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
