import React from 'react';
import { Link } from '@reach/router';
import {
    Tooltip,
    OverlayTrigger
} from "react-bootstrap";
import SVGIcon from '../components/svg-icon';

class DashboardButton extends React.Component {
    render() {
        return (
            <OverlayTrigger
                placement="top"
                delay={{ show: 500, hide: 300 }}
                overlay={(<Tooltip>{this.props.tooltip}</Tooltip>)} >
                <Link className="dashboardButton" to={this.props.to}>
                    <SVGIcon name={this.props.icon} width="24" />
                </Link>
            </OverlayTrigger>
        );
    }
}

export default DashboardButton;