import React from 'react';
import './style.css';

class ContactTile extends React.Component {    
    render() {
        return (
            <div className="contactCard">
                <div className={`${ this.props.contact.caseRole.toLowerCase() }`}>
                    <h3>{this.props.contact.firstName} {this.props.contact.lastName}</h3>
                    <span>{this.props.contact.email}</span>
                    <p>#{this.props.contact.courtCase.id}</p>
                </div>
            </div>
        );
    }
}

export default ContactTile;