import React from 'react';
import SVGIcon from './svg-icon';
import { Row, Col } from "react-bootstrap";
import './style.css';
import { Link } from '@reach/router';

class Header extends React.Component {
    render() {
        return (
            <Row className="header">
                <Col>
                    <Link to="/">
                        <SVGIcon name="logo" width="24" />
                    </Link>
                </Col>
                <Col><h4 className="headerTitle">{this.props.title}</h4></Col>
                <Col></Col>
            </Row>
        );
    }
}

export default Header;