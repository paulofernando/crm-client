import React from 'react';
import { Link } from '@reach/router';
import './style.css';

import ContactTileSmall from "./contact-tile-small";
import NumberFormat from 'react-number-format';

class CourtCaseTile extends React.Component {
    render() {
        return (
            <div className="courtCaseCard">                
                <div className="courtCaseValue"><NumberFormat value={this.props.courtCase.value} displayType={'text'} thousandSeparator={true} prefix={'$'} /></div>
                <Link to={`/case/${this.props.courtCase.id}`}>
                    <h3>{this.props.courtCase.title}</h3>                    
                </Link>
                <div className="cardContainer">
                    {this.props.courtCase.contacts &&
                        this.props.courtCase.contacts.map(contact => (                
                            <ContactTileSmall key={contact.id} contact={contact} />
                        ))}
                </div>
                <div>{this.props.courtCase.courtDate}</div>
            </div>
        );
    }
}

export default CourtCaseTile;