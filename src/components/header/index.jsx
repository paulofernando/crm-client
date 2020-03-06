import React from 'react';
import { Row, Col } from "react-bootstrap";
import { Link } from '@reach/router';
import '../componentStyle.css';

import SVGIcon from '../svg-icon';

const Header = (props) => {     
    return (
        <Row className="header">
            <Col>
                <Link to="/">
                    <SVGIcon name="logo" width="24" />
                </Link>
            </Col>
            <Col><h4 className="headerTitle">{props.title}</h4></Col>
            <Col></Col>
        </Row>
    );    
}

export default Header;