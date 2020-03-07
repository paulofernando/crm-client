import React from 'react';
import { Link } from '@reach/router';
import Moment from 'react-moment';

import '../ComponentStyle.css';
import ContactTileSmall from "../contact/ContactTile";

const CourtCaseTile = (props) => {     
    return (
        <div className="courtCaseCard">
            <Link style={{ color: 'white' }} to={`/case/${props.courtCase.id}`}>
                <h3 className="courtCaseTitle">{props.courtCase.title}</h3>
            </Link>
            <p className="truncate courtCaseDescription">{props.courtCase.description}</p>
            <div className="cardContainer">
                {props.courtCase.contacts &&
                    props.courtCase.contacts.map(contact => (
                        <ContactTileSmall key={contact.id} contact={contact} />
                    ))}
            </div>
            <Moment format="MMMM Do YYYY">
                {props.courtCase.courtDate}
            </Moment>
        </div>
    );    
}

export default CourtCaseTile;