import React from 'react';
import { Link } from '@reach/router';

import '../ComponentStyle.css';

const ContactTile = (props) => {     
    return (
        <Link style={{ textDecoration: 'none' }} to={`/contact/${props.contact.id}`}>
            <div className="smallContactCard">
                <div className={`${props.contact.caseRole.toLowerCase()}`}>
                    {props.contact.firstName}
                </div>
            </div>
        </Link>
    );    
}

export default ContactTile;