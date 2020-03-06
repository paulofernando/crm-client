import React from 'react';
import { Link } from '@reach/router';
import '../componentStyle.css';

class ContactDetails extends React.Component {
    render() {
        return (
            <div className="cardContainer">
                <div className="contactCard">
                    <div className={`${this.props.contact.caseRole.toLowerCase()}`}>
                        <h3>{this.props.contact.firstName} {this.props.contact.lastName}</h3>
                        <div className="contactEmail">{this.props.contact.email}</div>
                        {this.props.contact.courtCase &&
                            <Link className="contactCaseId" to={`/case/${this.props.contact.courtCase.id}`}>
                                Case #{this.props.contact.courtCase.id}
                            </Link>
                        }
                        <div className="contactCaseRole">{this.props.contact.caseRole}</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ContactDetails;