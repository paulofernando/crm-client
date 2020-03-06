import React, { useState } from "react";
import {
    FormControl,
    InputGroup,
    Button
} from "react-bootstrap";
import { Link } from '@reach/router';
import '../../App.css'

import Header from "../../components/header";
import DashboardButton from '../../components/dashoard-button';

const textCaseId = React.createRef();
const textContactId = React.createRef();

const Dashboard = () => {    

    const [caseId, setCaseId] = useState('');
    const [contactId, setContactId] = useState('');

    return (
        <div>
            <Header title={"Dashboard"} />
            <div className="dashboard">
                <div className="dashboardGroup">
                    <h3>Court Cases</h3>
                    <div className="dashboardRow">
                        <DashboardButton to={`/cases`} tooltip="List" icon="grid" />
                        <DashboardButton to={`/case/create`} tooltip="Create" icon="create" />
                    </div>
                    <InputGroup className="mb-3">
                        <FormControl
                            type="number"
                            placeholder="Court case id"
                            ref={textCaseId}
                            onChange={e => setCaseId(textCaseId.current.value)}
                        />
                        <InputGroup.Append>
                            <Link to={`/case/${caseId}`}>
                                <Button variant="primary">Search</Button>
                            </Link>
                        </InputGroup.Append>
                    </InputGroup>
                </div>
                <div className="dashboardGroup">
                    <h3>Contacts</h3>
                    <div className="dashboardRow">
                        <DashboardButton to={`/contacts`} tooltip="List" icon="grid" />
                        <DashboardButton to={`/contact/create`} tooltip="Create" icon="create" />
                    </div>
                    <InputGroup className="mb-3">
                        <FormControl
                            type="number"
                            placeholder="Contact id"
                            ref={textContactId}
                            onChange={e => setContactId(textContactId.current.value)}
                        />
                        <InputGroup.Append>
                            <Link to={`/contact/${contactId}`}>
                                <Button variant="primary">Search</Button>
                            </Link>
                        </InputGroup.Append>
                    </InputGroup>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;