import React from 'react';
import NumberFormat from 'react-number-format';
import Moment from 'react-moment';
import './style.css';

import ContactTile from "./contact-details";

class CourtCaseDetails extends React.Component {
    render() {
        return (
            <div className="courtCaseCard courtCaseDetailed">                
                <h3>{this.props.courtCase.title}</h3>
                <p>{this.props.courtCase.description}</p>
                <div className="cardContainer">
                    {this.props.courtCase.contacts &&
                        this.props.courtCase.contacts.map(contact => (
                            <ContactTile key={contact.id} contact={contact} />
                        ))}
                </div>
                <Moment format="MMMM Do YYYY">
                    {this.props.courtCase.courtDate}
                </Moment>
                <div className="courtCaseValue">
                    <NumberFormat value={this.props.courtCase.value} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                </div>
            </div>
        );
    }
}

export default CourtCaseDetails;