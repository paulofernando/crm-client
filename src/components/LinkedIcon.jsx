import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import gql from "graphql-tag";
import { Mutation } from "@apollo/react-components";

import SVGIcon from "./SVGIcon";

const UNASSIGN_CONTACT_CASES = gql`
  mutation UnassignContact($contactId: ID!) {
    updateContact(input: { id: $contactId, courtCaseId: null }) {
      contact {
        id
      }
      errors
    }
  }
`;

function LinkedIcon(props) {
  const [show, setShow] = useState(false);
  const [isHovering, setHover] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleMouseEnter = () => setHover(true);
  const handleMouseLeave = () => setHover(false);

  return (
    <>
      <div onClick={handleShow}>
        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <SVGIcon name={isHovering ? "unlinked" : "linked"} width="18" />
        </div>
      </div>

      <Modal show={show} onHide={handleClose} style={{ color: "black" }}>
        <Modal.Header closeButton>
          <Modal.Title>Unassign contact</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to unassign <b>{props.contact.firstName}{" "}
          {props.contact.lastName}</b> from 
          case <b>{props.contact.courtCase && props.contact.courtCase.title}</b>?
        </Modal.Body>
        <Modal.Footer>
          <Mutation mutation={UNASSIGN_CONTACT_CASES}>
            {(updateContact, { error, data }) => (
              <form
                onSubmit={e => {
                  e.preventDefault();
                  updateContact({ variables: { contactId: props.contact.id } });
                  handleClose();
                  window.location.reload(false);
                }}
              >
                <Button
                  className="m-3"
                  variant="secondary"
                  onClick={handleClose}
                >
                  Cancel
                </Button>
                <Button className="m-3" type="submit" variant="danger">
                  Confirm
                </Button>
              </form>
            )}
          </Mutation>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default LinkedIcon;
