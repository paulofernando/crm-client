import React from 'react';
import './Style.css';


class ContactTile extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="contactCard">
                <div className={`${ this.props.contact.caseRole.toLowerCase() }`}>
                    <h3>{this.props.contact.firstName} {this.props.contact.lastName}</h3>
                    <spam>{this.props.contact.email}</spam>
                    <p>#{this.props.contact.courtCase.id}</p>
                </div>
            </div>
        );
    }
}

export default ContactTile;