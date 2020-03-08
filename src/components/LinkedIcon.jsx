import React, { useState } from 'react';
import {
    Modal,
    Button
} from "react-bootstrap";

import SVGIcon from './SVGIcon'

function LinkedIcon() {
    const [show, setShow] = useState(false);
    const [isHovering, setHover] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleMouseEnter = () => setHover(true);
    const handleMouseLeave = () => setHover(false);

    return (
        <>
            <div onClick={handleShow}>
                <div onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}>
                    <SVGIcon
                        name={isHovering ? "unlinked" : "linked"}
                        width="18"
                    />
                </div>
            </div>

            <Modal show={show} onHide={handleClose} style={{ color: 'black' }}>
                <Modal.Header closeButton>
                    <Modal.Title>Unassign contact</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to unassign the contact?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleClose}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}


export default LinkedIcon