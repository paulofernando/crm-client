import React, { useState } from "react";
import { Modal, Button, Tooltip, OverlayTrigger, InputGroup, Alert } from "react-bootstrap";
import { Mutation } from "@apollo/react-components";
import { Typeahead } from "react-bootstrap-typeahead";
import { Query } from "react-apollo";

import SVGIcon from "./SVGIcon";
import { GET_CASES_TITLES, GET_CONTACTS } from '../graphQL/queries'
import { 
  UNASSIGN_CONTACT_CASES,
  ASSIGN_CONTACT_CASES
} from '../graphQL/mutations'


function LinkedIcon(props) {
  const [showUnassign, setShowUnassign] = useState(false);
  const [showAssign, setShowAssign] = useState(false);
  const [selectedCase, setSelectedCase] = useState('');
  const [isHovering, setHover] = useState(false);
  const [alert, setAlert] = useState("");

  const handleCloseUnassign = () => setShowUnassign(false);
  const handleShowUnassign = () => setShowUnassign(true);
  const handleCloseAssign = () => setShowAssign(false);
  const handleShowAssign = () => setShowAssign(true);
  const handleSelectedCase = (selected) => setSelectedCase(selected);
  const handleAlert = (alertMessage) => setAlert(alertMessage);

  const handleMouseEnter = () => setHover(true);
  const handleMouseLeave = () => setHover(false);

  const onUpdate = (cache, { data: { updateContact } }) => {
    try {
      const { contacts } = cache.readQuery({ query: GET_CONTACTS });
      cache.writeQuery({
        query: GET_CONTACTS,
        data: { contacts: contacts.concat([updateContact]) }
      });
    } catch (e) {
      //window.location.reload(false);
    }
  };

  return (
    <>      
      <OverlayTrigger
        placement="right"
        delay={{ show: 800, hide: 300 }}
        overlay={<Tooltip>{props.courtCase ? "Unassign contact" : "Assign contact"}</Tooltip>}
      >
        <div onClick={() => props.courtCase ? handleShowUnassign() : handleShowAssign()}>
          {props.courtCase && (
            <div
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <SVGIcon name={isHovering ? "unlinked" : "linked"} width="18" />
            </div>
          )}

          {!props.courtCase && (
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
          <b>{props.courtCase && props.courtCase.title}</b>?
        </Modal.Body>
        <Modal.Footer>
          <Mutation 
              mutation={UNASSIGN_CONTACT_CASES}
              update={onUpdate}
              refetchQueries = {[
                { query: GET_CONTACTS },
                { query: GET_CASES_TITLES },
              ]}
            >
            {(updateContact, { error, data }) => (
              <form
                onSubmit={e => {
                  e.preventDefault();
                  updateContact({ 
                    variables: {
                      contactId: props.contact.id
                    }
                  })
                  .then(res => {
                    handleCloseUnassign();
                  })
                  .catch(err => {
                    handleAlert("Error on trying to unassign contact")
                  });
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
        {alert ? (
          <Alert
            className="customAlert"
            style={{width: 'auto'}}
            variant={"danger"}
            onClick={() => handleAlert("")}
          > {alert} </Alert>
        ) : null}
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
              data.courtCases.map(item => {
                let caseHasRole = false
                for(var i = 0; i < item.contacts.length; i++) {
                  if (item.contacts[i].caseRole === props.contact.caseRole) {
                    caseHasRole = true
                    break;
                  }
                }

                if (!caseHasRole) options.push({ label: `${item.id} - ${item.title}`, id: item.id })
              });

              return (
                <InputGroup className="mb-3">
                  <Typeahead
                    id="autocompleteCasesModal"
                    name="caseId"
                    placeholder="Choose a case..."
                    options={options}
                    onChange={selected => {
                      handleSelectedCase(selected[0] ? selected[0].id : null);
                    }}
                  />
                </InputGroup>
              );
            }}
          </Query>
        </Modal.Body>
        <Modal.Footer>
          <Mutation 
              mutation={ASSIGN_CONTACT_CASES}
              update={onUpdate}
              refetchQueries = {[
                { query: GET_CONTACTS },
                { query: GET_CASES_TITLES },
              ]}
            >
            {(updateContact, { error, data }) => (
              <form
                onSubmit={e => {
                  e.preventDefault();
                  if (props.contact.id && selectedCase) {
                    updateContact({
                      variables: {
                        contactId: props.contact.id,
                        courtCaseId: selectedCase
                      }
                    })
                    .then(res => {                        
                      handleCloseAssign();                  
                    })
                    .catch(err => {
                      handleAlert("This case may have a contact with the same role or it does not exist.")
                    });                    
                  }
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
