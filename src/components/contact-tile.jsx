import React from 'react';
import { Link } from '@reach/router';
import './style.css';

class ContactTile extends React.Component {
    render() {
        return (
            <Link style={{ textDecoration: 'none' }} to={`/contact/${this.props.contact.id}`}>
                <div className="smallContactCard">
                    <div className={`${this.props.contact.caseRole.toLowerCase()}`}>
                        {this.props.contact.firstName}
                    </div>
                </div>
            </Link>
        );
    }
}

export default ContactTile;