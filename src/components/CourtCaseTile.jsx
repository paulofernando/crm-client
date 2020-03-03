import React from 'react';
import './Style.css';

import ContactTileSmall from "../components/ContactTileSmall";
import ContactTile from './ContactTile';

class CourtCaseTile extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="courtCaseCard">
                <div>
                    <h3>{this.props.courtCase.title}</h3>
                    <p>{this.props.courtCase.description}</p>
                    <div className="cardContainer">
                        {this.props.courtCase.contacts &&
                            this.props.courtCase.contacts.map(contact => (                
                                <ContactTileSmall key={contact.id} contact={contact} />
                            ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default CourtCaseTile;