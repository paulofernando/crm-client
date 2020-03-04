import React from 'react';
import './style.css';

import { Link } from '@reach/router';

class ContactTile extends React.Component {    
    render() {
        return (            
            <div className="contactCard">
                <div className={`${ this.props.contact.caseRole.toLowerCase() }`}>
                    <h3>{this.props.contact.firstName} {this.props.contact.lastName}</h3>
                    <div className="contactEmail">{this.props.contact.email}</div>
                    Case <Link className="contactCaseId" to={`/case/${this.props.contact.courtCase.id}`}>
                        #{this.props.contact.courtCase.id}
                    </Link>
                    <div className="contactCaseRole">{this.props.contact.caseRole}</div>
                </div>
            </div>
        );
    }
}

export default ContactTile;