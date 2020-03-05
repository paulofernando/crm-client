import React from "react";
import '../../App.css'

import { Link } from '@reach/router';

const Dashboard = () => {
    return (
        <div className="dashboard">
            <div className="dashboardGroup">
                <h3>Court Cases</h3>
                <div className="dashboardRow">
                    <Link className="dashboardButton" to={`/cases`}>List</Link>
                    <Link className="dashboardButton" to={`/case/create`}>Create</Link>
                </div>
            </div>
            <div className="dashboardGroup">
                <h3>Contacts</h3>
                <div className="dashboardRow">
                    <Link className="dashboardButton" to={`/contacts`}>List</Link>
                    <Link className="dashboardButton" to={`/contact/create`}>Create</Link>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;