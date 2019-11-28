import React from 'react';
import {createMuiTheme} from "@material-ui/core";
import {ThemeProvider} from "@material-ui/styles";

import {Login} from './Login';

import {BreakpointProvider} from 'react-socks';


const theme = createMuiTheme({
	palette : {
		primary: {
			main: '#282c34'
		},
		secondary: {
			main: 'hsl(340, 100%, 50%)'
		},
	}
});

export const Themer = () => {
	return (
		<ThemeProvider theme={theme}>
			<BreakpointProvider>
				<Login/>
			</BreakpointProvider>
		</ThemeProvider>
	);
}