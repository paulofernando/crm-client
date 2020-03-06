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

class Dashboard extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            caseId: "",
            contactId: ""
        };
        this.textCaseId = React.createRef();
        this.textContactId = React.createRef();
    }

    handleChangeCaseId = () => {
        this.setState({ caseId: this.textCaseId.current.value });
    }

    handleChangeContactId = () => {
        this.setState({ contactId: this.textContactId.current.value });
    }

    render() {
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
                                ref={this.textCaseId}
                                onChange={e => this.handleChangeCaseId()}
                            />
                            <InputGroup.Append>
                                <Link to={`/case/${this.state.caseId}`}>
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
                                ref={this.textContactId}
                                onChange={e => this.handleChangeContactId()}
                            />
                            <InputGroup.Append>
                                <Link to={`/contact/${this.state.contactId}`}>
                                    <Button variant="primary">Search</Button>
                                </Link>
                            </InputGroup.Append>
                        </InputGroup>
                    </div>
                </div>
            </div>
        );
    }
};

export default Dashboard;