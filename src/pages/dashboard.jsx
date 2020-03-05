import React from "react";
import '../App.css'

import { Link } from '@reach/router';

import SVGIcon from "../components/svg-icon";

const Dashboard = () => {    
    return (
        <div className="dashboard">
            <div className="dashboardRow">
                <SVGIcon className="dashboardIcon" name="list" width={36} />
                <Link className="dashboardButton" to={`/cases`}>Cases</Link>
                <Link className="dashboardButton" to={`/contacts`}>Contacts</Link>
            </div>
            <div className="dashboardRow">
                <SVGIcon className="dashboardIcon" name="create" width={36} />
                <Link className="dashboardButton" to={`/case/create`}>Case</Link>
                <Link className="dashboardButton" to={`/contact/create`}>Contact</Link>
            </div>            
            <div className="dashboardRow">
                <SVGIcon className="dashboardIcon" name="search" width={36} />
                <Link className="dashboardButton" to={``}>Search Contacts</Link>
                <Link className="dashboardButton" to={``}>Search Contacts</Link>
            </div>
        </div>
    );
  };
  
  export default Dashboard;