import React from 'react';
import './Style.css';

import ContactTileSmall from "../components/ContactTileSmall";
import NumberFormat from 'react-number-format';

class CourtCaseTile extends React.Component {
    render() {
        return (
            <div className="courtCaseCard">
                <div>                    
                    <div className="courtCaseValue"><NumberFormat value={this.props.courtCase.value} displayType={'text'} thousandSeparator={true} prefix={'$'} /></div>
                    <h3>{this.props.courtCase.title}</h3>                    
                    <p>{this.props.courtCase.description}</p>
                    Contacts:
                    <div className="cardContainer">
                        {this.props.courtCase.contacts &&
                            this.props.courtCase.contacts.map(contact => (                
                                <ContactTileSmall key={contact.id} contact={contact} />
                            ))}
                    </div>
                    <div>{this.props.courtCase.courtDate}</div>
                </div>
            </div>
        );
    }
}

export default CourtCaseTile;