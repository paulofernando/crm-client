import React from "react";
import { InputGroup, Button } from "react-bootstrap";
import { Link } from "@reach/router";
import { Typeahead } from "react-bootstrap-typeahead";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import "../../App.css";
import Header from "../../components/header";
import DashboardButton from "../../components/DashoardButton";

const GET_CONTACTS_NAMES = gql`
  query {
    contacts {
      id
      firstName
      lastName
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

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      caseId: "",
      contactId: ""
    };
    this.textCaseId = React.createRef();
    this.textContactId = React.createRef();
  }

  handleChangeCaseId = () => {
    this.setState({ caseId: this.textCaseId.current.value });
  };

  handleChangeContactId = () => {
    this.setState({ contactId: this.textContactId.current.value });
  };

  render() {
    return (
      <div>
        <Header title={"Dashboard"} />
        <div className="dashboard">
          <div className="dashboardGroup">
            <h3>Court Cases</h3>
            <div className="dashboardRow">
              <DashboardButton to={`/cases`} tooltip="List" icon="grid" />
              <DashboardButton
                to={`/case/create`}
                tooltip="Create"
                icon="create"
              />
            </div>
            <div className="dashboardRow">
              <Query query={GET_CASES_TITLES}>
                {({ loading, error, data }) => {
                  if (loading) return <div>Fetching...</div>;
                  if (error) return <div>Error</div>;

                  const options = [];
                  data.courtCases.map(item =>
                    options.push({ label: item.title, id: item.id })
                  );

                  return (
                    <InputGroup className="mb-3">
                      <Typeahead
                        id="autocompleteContacts"
                        name="caseId"
                        placeholder="Choose a case..."
                        options={options}
                        onChange={selected => {
                          console.log(selected[0].id);
                          this.setState({ caseId: selected[0].id });
                        }}
                      />
                      <InputGroup.Append>
                        <Link to={`/case/${this.state.caseId}`}>
                          <Button variant="primary">Search</Button>
                        </Link>
                      </InputGroup.Append>
                    </InputGroup>
                  );
                }}
              </Query>
            </div>
          </div>
          <div className="dashboardGroup">
            <h3>Contacts</h3>
            <div className="dashboardRow">
              <DashboardButton to={`/contacts`} tooltip="List" icon="grid" />
              <DashboardButton
                to={`/contact/create`}
                tooltip="Create"
                icon="create"
              />
            </div>
            <div className="dashboardRow">
              <Query query={GET_CONTACTS_NAMES}>
                {({ loading, error, data }) => {
                  if (loading) return <div>Fetching...</div>;
                  if (error) return <div>Error</div>;

                  const options = [];
                  data.contacts.map(item =>
                    options.push({
                      label: `${item.firstName} ${item.lastName}`,
                      id: item.id
                    })
                  );

                  return (
                    <InputGroup className="mb-3">
                      <Typeahead
                        id="autocompleteContacts"
                        name="contactId"
                        placeholder="Choose a contact..."
                        options={options}
                        onChange={selected => {
                          console.log(selected[0].id);
                          this.setState({ contactId: selected[0].id });
                        }}
                      />
                      <InputGroup.Append>
                        <Link to={`/contact/${this.state.contactId}`}>
                          <Button variant="primary">Search</Button>
                        </Link>
                      </InputGroup.Append>
                    </InputGroup>
                  );
                }}
              </Query>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
