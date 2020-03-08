import React, { useState } from "react";
import { Modal, Button, Tooltip, OverlayTrigger, InputGroup } from "react-bootstrap";
import gql from "graphql-tag";
import { Mutation } from "@apollo/react-components";
import { Typeahead } from "react-bootstrap-typeahead";
import { Query } from "react-apollo";

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

const ASSIGN_CONTACT_CASES = gql`
  mutation AssignContact($contactId: ID!, $courtCaseId: ID!) {
    updateContact(input: { id: $contactId, courtCaseId: $courtCaseId }) {
      contact {
        id
        courtCase {
          id
        }
      }
      errors
    }
  }
`;

const GET_CASES_TITLES = gql`
  query {
    courtCases {
      id
      title
    }
  }
`;

function LinkedIcon(props) {
  const [showUnassign, setShowUnassign] = useState(false);
  const [showAssign, setShowAssign] = useState(false);
  const [selectedCase, setSelectedCase] = useState('');
  const [isHovering, setHover] = useState(false);

  const handleCloseUnassign = () => setShowUnassign(false);
  const handleShowUnassign = () => setShowUnassign(true);
  const handleCloseAssign = () => setShowAssign(false);
  const handleShowAssign = () => setShowAssign(true);
  const handleSelectedCase = (selected) => setSelectedCase(selected);

  const handleMouseEnter = () => setHover(true);
  const handleMouseLeave = () => setHover(false);

  return (
    <>
      <OverlayTrigger
        placement="right"
        delay={{ show: 800, hide: 300 }}
        overlay={<Tooltip>{props.contact.courtCase ? "Unassign contact" : "Assign contact"}</Tooltip>}
      >
        <div onClick={() => props.contact.courtCase ? handleShowUnassign() : handleShowAssign()}>
          {props.contact.courtCase && (
            <div
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <SVGIcon name={isHovering ? "unlinked" : "linked"} width="18" />
            </div>
          )}

          {!props.contact.courtCase && (
            <div
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <SVGIcon name={isHovering ? "linked" : "unlinked"} width="18" />
            </div>
          )}
        </div>
      </OverlayTrigger>

      <Modal show={showUnassign} onHide={handleCloseUnassign} style={{ color: "black" }}>
        <Modal.Header closeButton>
          <Modal.Title>Unassign contact</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to unassign{" "}
          <b>
            {props.contact.firstName} {props.contact.lastName}
          </b>{" "}
          from case{" "}
          <b>{props.contact.courtCase && props.contact.courtCase.title}</b>?
        </Modal.Body>
        <Modal.Footer>
          <Mutation mutation={UNASSIGN_CONTACT_CASES}>
            {(updateContact, { error, data }) => (
              <form
                onSubmit={e => {
                  e.preventDefault();
                  updateContact({ variables: { contactId: props.contact.id } });
                  handleCloseUnassign();
                  window.location.reload(false);
                }}
              >
                <Button
                  className="m-3"
                  variant="secondary"
                  onClick={handleCloseUnassign}
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

      <Modal show={showAssign} onHide={handleCloseAssign} style={{ color: "black" }}>
        <Modal.Header closeButton>
          <Modal.Title>Assign contact</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Choose the case you would like to link to
          <b>
            {" "}{props.contact.firstName} {props.contact.lastName}
          </b>
          <Query query={GET_CASES_TITLES}>
            {({ loading, error, data }) => {
              if (loading) return <div>Fetching...</div>;
              if (error) return <div>Error</div>;

              const options = [];
              data.courtCases.map(item =>
                options.push({ label: `${item.id} - ${item.title}`, id: item.id })
              );

              return (
                <InputGroup className="mb-3">
                  <Typeahead
                    id="autocompleteCasesModal"
                    name="caseId"
                    placeholder="Choose a case..."
                    options={options}
                    onChange={selected => {
                      handleSelectedCase(selected[0].id);
                    }}
                  />
                </InputGroup>
              );
            }}
          </Query>
        </Modal.Body>
        <Modal.Footer>
          <Mutation mutation={ASSIGN_CONTACT_CASES}>
            {(updateContact, { error, data }) => (
              <form
                onSubmit={e => {
                  e.preventDefault();
                  updateContact({ variables: { contactId: props.contact.id, courtCaseId: selectedCase } });
                  handleCloseAssign();
                  window.location.reload(false);
                }}
              >
                <Button
                  className="m-3"
                  variant="secondary"
                  onClick={handleCloseAssign}
                >
                  Cancel
                </Button>
                <Button className="m-3" type="submit" variant="danger">
                  Assign
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
