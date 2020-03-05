import React from 'react';
import { Link } from '@reach/router';
import './style.css';

import ContactTile from "./contact-tile";
import NumberFormat from 'react-number-format';

class CourtCaseDetails extends React.Component {
    render() {
        return (
            <div className="courtCaseCard">                
                <div className="courtCaseValue">
                    <NumberFormat value={this.props.courtCase.value} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                </div>
                <h3>{this.props.courtCase.title}</h3>                
                <p>{this.props.courtCase.description}</p>
                Contacts:
                <div className="cardContainer">
                    {this.props.courtCase.contacts &&
                        this.props.courtCase.contacts.map(contact => (
                            <ContactTile key={contact.id} contact={contact} />
                        ))}
                </div>
                <div>{this.props.courtCase.courtDate.toLocaleDateString()}</div>                
            </div>
        );
    }
}

export default CourtCaseDetails;