/* General Imports --------------------------------------------------------------- */
import React from 'react';


/* Routing Imports --------------------------------------------------------------- */
import {Link} from 'react-router-dom';


/* Styling Imports --------------------------------------------------------------- */
import './IndexPage.scss';


/* Material UI Imports ----------------------------------------------------------- */
import {Button} from '@material-ui/core';


/* Component --------------------------------------------------------------------- */


export function IndexPage() {
  return (
    <div className="IndexPage">
        <div>
            <Button variant="contained" color="secondary">
                <Link to={"/event"}>Learn More</Link>
            </Button>
        </div>
    </div>
  );
}
