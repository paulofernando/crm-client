import React from 'react';

class Header extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <h1>{this.props.firstName}</h1>
            </div>
        );
    }
}

export default Header;