import React from 'react';


class ContactTile extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const mystyle = {
            color: "#222222",
            backgroundColor: "#EEEEEE",
            padding: "10px",
            margin: "10px",
            width: "300px",
            borderStyle: "solid"
          };

        return (
            <div style={mystyle}>
                <p>{this.props.contact.lastName}</p>
                <p>{this.props.contact.caseRole}</p>
                <p>{this.props.contact.email}</p>
            </div>
        );
    }
}

export default ContactTile;