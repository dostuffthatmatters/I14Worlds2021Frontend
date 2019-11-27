import React from 'react';
import {Link} from 'react-router-dom';

import './IndexPage.scss';
import Button from '@material-ui/core/Button';

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
