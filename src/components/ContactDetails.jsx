import React from 'react';

class ContactDetails extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div key={this.props.contact.id}>
                <p>{this.props.contact.lastName}</p>
                <p>{this.props.contact.caseRole}</p>
                <p>{this.props.contact.email}</p>
            </div>
        );
    }
}

export default ContactDetails;