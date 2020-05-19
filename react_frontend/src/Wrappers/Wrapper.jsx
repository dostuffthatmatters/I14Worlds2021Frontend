/* General Imports --------------------------------------------------------------- */
import React from 'react';


/* Component Imports ------------------------------------------------------------- */
import {Themer} from "./Themer";


/* Component --------------------------------------------------------------------- */


export const Wrapper = () => {

	// window.console.log = () => {};
	window.console.warn = () => {};
	window.console.error = () => {};

	return <Themer/>;
};
