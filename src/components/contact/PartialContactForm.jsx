import React from "react";
import { Form, ToggleButtonGroup, ToggleButton } from "react-bootstrap";
import gql from "graphql-tag";
import { Typeahead } from "react-bootstrap-typeahead";
import { Query } from "react-apollo";

import "../../App.css";

const GET_CASES_TITLES = gql`
  query {
    courtCases {
      id
      title
    }
  }
`;

class PartialContactForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alert: "",
      type: "",
      caseOptions: ""
    };
  }

  render() {
    const {
      values,
      errors,
      touched,
      handleChange,
      handleBlur,
      setFieldValue
    } = this.props;

    return (
      <>
        <Form.Group controlId="formFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            name="firstName"
            placeholder="John"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.firstName}
            className={touched.name && errors.name ? "error" : null}
          />
          {touched.firstName && errors.firstName ? (
            <div className="error-message">{errors.firstName}</div>
          ) : null}
        </Form.Group>

        <Form.Group controlId="formLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            name="lastName"
            placeholder="Smith"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.lastName}
            className={touched.lastName && errors.lastName ? "error" : null}
          />
          {touched.lastName && errors.lastName ? (
            <div className="error-message">{errors.lastName}</div>
          ) : null}
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            name="email"
            placeholder="john@email.com"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            className={touched.email && errors.email ? "error" : null}
          />
          {touched.email && errors.email ? (
            <div className="error-message">{errors.email}</div>
          ) : null}
        </Form.Group>

        <Form.Group controlId="formCaseRole">
          <Form.Label>Court Role</Form.Label>
          <br></br>
          <ToggleButtonGroup type="radio" name="caseRole" size="sm">
            <ToggleButton
              variant="outline-primary"
              value={"Accused"}
              onChange={() => setFieldValue("caseRole", "Accused")}
            >
              Accused
            </ToggleButton>
            <ToggleButton
              variant="outline-primary"
              value={"Barrister"}
              onChange={() => setFieldValue("caseRole", "Barrister")}
            >
              Barrister
            </ToggleButton>
            <ToggleButton
              variant="outline-primary"
              value={"Judge"}
              onChange={() => setFieldValue("caseRole", "Judge")}
            >
              Judge
            </ToggleButton>
            <ToggleButton
              variant="outline-primary"
              value={"Prosecutor"}
              onChange={() => setFieldValue("caseRole", "Prosecutor")}
            >
              Prosecutor
            </ToggleButton>
          </ToggleButtonGroup>
        </Form.Group>

        <Form.Group controlId="formCourtCase">
          <Form.Label>Case</Form.Label>
          <Query query={GET_CASES_TITLES}>
            {({ loading, error, data }) => {
              if (loading) return <div>Fetching...</div>;
              if (error) return <div>Error</div>;

              const options = [];
              data.courtCases.map(item =>
                options.push({
                  label: `${item.id} - ${item.title}`,
                  id: item.id
                })
              );

              return (
                <Typeahead
                  id="autocompleteCases"
                  name="caseId"
                  options={options}
                  placeholder="Choose a case..."
                  onChange={selected => setFieldValue("caseId", selected[0].id)}
                  className={touched.caseId && errors.caseId ? "error" : null}
                />
              );
            }}
          </Query>
          {touched.caseId && errors.caseId ? (
            <div className="error-message">{errors.caseId}</div>
          ) : null}
        </Form.Group>
      </>
    );
  }
}

export default PartialContactForm;
