import React from 'react';
import { Link } from '@reach/router';
import {
    Tooltip,
    OverlayTrigger
} from "react-bootstrap";
import SVGIcon from '../components/svg-icon';

const DashboardButton = (props) => {     
    return (
        <OverlayTrigger
            placement="top"
            delay={{ show: 500, hide: 300 }}
            overlay={(<Tooltip>{props.tooltip}</Tooltip>)} >
            <Link className="dashboardButton" to={props.to}>
                <SVGIcon name={props.icon} width="24" />
            </Link>
        </OverlayTrigger>
    );    
}

export default DashboardButton;