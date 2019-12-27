
/* General Imports --------------------------------------------------------------- */
import React from "react";


/* Material UI Imports ----------------------------------------------------------- */
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';


/* Component --------------------------------------------------------------------- */


export const CustomSelect = (props) => {

	/*

	REQUIRED props:
	* label (label of the select box)
	* value (initial value)
	* selectOptions (JS Object storing all possible values as keys
					 and their labels as the respective values)

	OPTIONAL props:
	* onChange (function that takes in the value of the select after changing it)
	* className (actual classname strings)

	*/

	const [value, setValue] = React.useState(props.value);

	const handleChange = (event) => {
		setValue(event.target.value);
		if ("onChange" in props) {
			props.onChange(event.target.value);
		}
	};

	return (
		<FormControl className={"className" in props ? props["className"] : ""}>
			<InputLabel id="select-label">{props.label}</InputLabel>
			<Select
				disabled={"disabled" in props ? props["disabled"] : false}
				labelId="select-label"
				id="demo-simple-select"
				value={value}
				onChange={handleChange}>
				{Object.keys(props.selectOptions).map((value, index) => (
					<MenuItem key={index} value={value}>{props.selectOptions[value]}</MenuItem>
				))}
			</Select>
		</FormControl>
	);
};
