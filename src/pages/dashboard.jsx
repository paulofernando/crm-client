import React from "react";
import '../App.css'

import { Link } from '@reach/router';

const Dashboard = () => {    
    return (
        <div className="dashboard">
            <Link className="dashboardButton" to={``}>Create Case</Link>
            <Link className="dashboardButton" to={``}>Create Contact</Link>
            <Link className="dashboardButton" to={`/cases`}>List Cases</Link>
            <Link className="dashboardButton" to={`/contacts`}>List Contacts</Link>
            <Link className="dashboardButton" to={``}>Search Contacts</Link>
            <Link className="dashboardButton" to={``}>Search Contacts</Link>
        </div>
    );
  };
  
  export default Dashboard;