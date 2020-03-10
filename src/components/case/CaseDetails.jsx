import React from "react";
import NumberFormat from "react-number-format";
import Moment from "react-moment";

import "../style.css";
import ContactTile from "../contact/ContactDetails";

const CourtCaseDetails = props => {
    return (
        <div className="courtCaseCard courtCaseDetailed">
            <h3 className="courtCaseTitle">{props.courtCase.title}</h3>
            <p className="courtCaseDescription">{props.courtCase.description}</p>
            <div className="cardContainer">
                {props.courtCase.contacts &&
                    props.courtCase.contacts.map(contact => (
                        <ContactTile key={contact.id} contact={contact} courtCase={props.courtCase} />
                    ))}
            </div>
            <Moment className="courtCaseDate" format="MMMM Do YYYY">{props.courtCase.courtDate}</Moment>            
            <NumberFormat
            className="courtCaseValue"
                value={props.courtCase.value}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
            />            
        </div>
    );
};

export default CourtCaseDetails;
