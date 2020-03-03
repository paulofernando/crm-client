import React from 'react';
import './Style.css';

class ContactTileSmall extends React.Component {    
    render() {
        return (
            <div className="smallContactCard">
                <div className={`${ this.props.contact.caseRole.toLowerCase() }`}>
                    {this.props.contact.firstName}
                </div>
            </div>
        );
    }
}

export default ContactTileSmall;