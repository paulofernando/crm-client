import React from 'react';
import './style.css';

class Header extends React.Component {    
    render() {
        return (
            <div>
                <h2 className="headerTitle">{this.props.title}</h2>
            </div>
        );
    }
}

export default Header;