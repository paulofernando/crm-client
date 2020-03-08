import React from 'react';
import { Link } from '@reach/router';
import { Row, Col } from "react-bootstrap";

import '../style.css';
import LinkedIcon from '../LinkedIcon'

const ContactDetails = (props) => {    
    return (
        <div className="cardContainer">
            <div className="contactCard">
                <div className={`${props.contact.caseRole.toLowerCase()}`}>
                    <h3>{props.contact.firstName} {props.contact.lastName}</h3>
                    <div className="contactEmail">{props.contact.email}</div>
                    {props.contact.courtCase &&
                        <Link className="contactCaseId" to={`/case/${props.contact.courtCase.id}`}>
                            Case #{props.contact.courtCase.id}
                        </Link>
                    }
                    {props.courtCase &&
                        <Link className="contactCaseId" to={`/case/${props.courtCase.id}`}>
                            Case #{props.courtCase.id}
                        </Link>
                    }
                    <Row>
                        <Col></Col>
                        <Col className="contactCaseRole">{props.contact.caseRole}</Col>
                        <Col className="contactCaseLinkStatus"><LinkedIcon contact={props.contact}
                            courtCase={props.contact.courtCase || props.courtCase}/></Col>
                    </Row>
                </div>
            </div>
        </div>
    );
}

export default ContactDetails;