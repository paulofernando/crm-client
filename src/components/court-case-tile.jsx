import React from 'react';
import { Link } from '@reach/router';
import Moment from 'react-moment';
import './style.css';

import ContactTileSmall from "./contact-tile";

class CourtCaseTile extends React.Component {
    render() {
        return (
            <div className="courtCaseCard">
                <Link style={{ textDecoration: 'none', color: 'white' }} to={`/case/${this.props.courtCase.id}`}>
                    <h3>{this.props.courtCase.title}</h3>
                </Link>
                <p className="truncate">{this.props.courtCase.description}</p>
                <div className="cardContainer">
                    {this.props.courtCase.contacts &&
                        this.props.courtCase.contacts.map(contact => (
                            <ContactTileSmall key={contact.id} contact={contact} />
                        ))}
                </div>
                <Moment format="MMMM Do YYYY">
                    {this.props.courtCase.courtDate}
                </Moment>
            </div>
        );
    }
}

export default CourtCaseTile;