import React from "react";
import {
    FormControl,
    InputGroup,
    Button,
    Tooltip
} from "react-bootstrap";
import '../../App.css'

import Header from "../../components/header";
import DashboardButton from '../../components/dashoard-button';

const Dashboard = () => {
    return (
        <div>
            <Header title={"Dashboard"} />
            <div className="dashboard">
                <div className="dashboardGroup">
                    <h3>Court Cases</h3>
                    <div className="dashboardRow">
                        <DashboardButton to={`/cases`} tooltip="List" icon="grid"/>
                        <DashboardButton to={`/case/create`} tooltip="Create" icon="create"/>
                    </div>
                    <InputGroup className="mb-3">
                        <FormControl
                            type="number"
                            placeholder="Court case id"
                        />
                        <InputGroup.Append>
                            <Button variant="primary">Search</Button>
                        </InputGroup.Append>
                    </InputGroup>
                </div>
                <div className="dashboardGroup">
                    <h3>Contacts</h3>
                    <div className="dashboardRow">
                        <DashboardButton to={`/contacts`} tooltip="List" icon="grid"/>
                        <DashboardButton to={`/contact/create`} tooltip="Create" icon="create"/>                        
                    </div>
                    <InputGroup className="mb-3">
                        <FormControl
                            type="number"
                            placeholder="Contact id"
                        />
                        <InputGroup.Append>
                            <Button variant="primary">Search</Button>
                        </InputGroup.Append>
                    </InputGroup>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;