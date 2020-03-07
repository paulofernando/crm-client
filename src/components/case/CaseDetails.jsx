import React from 'react';
import NumberFormat from 'react-number-format';
import Moment from 'react-moment';

import '../ComponentStyle.css';
import ContactTile from "../contact/ContactDetails";

const CourtCaseDetails = (props) => { 
    return (
        <div className="courtCaseCard courtCaseDetailed">
            <h3 className="courtCaseTitle">{props.courtCase.title}</h3>
            <p>{props.courtCase.description}</p>
            <div className="cardContainer">
                {props.courtCase.contacts &&
                    props.courtCase.contacts.map(contact => (
                        <ContactTile key={contact.id} contact={contact} />
                    ))}
            </div>
            <Moment format="MMMM Do YYYY">
                {props.courtCase.courtDate}
            </Moment>
            <div className="courtCaseValue">
                <NumberFormat value={props.courtCase.value} displayType={'text'} thousandSeparator={true} prefix={'$'} />
            </div>
        </div>
    );    
}

export default CourtCaseDetails;