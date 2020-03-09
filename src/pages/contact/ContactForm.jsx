import React from "react";
import { Alert, Form } from "react-bootstrap";
import { Formik } from "formik";
import gql from "graphql-tag";
import { Mutation } from "@apollo/react-components";
import { Typeahead } from "react-bootstrap-typeahead";
import { Query } from "react-apollo";

import "../../App.css";
import { CONTAINER, FORM, BUTTON } from "../../components/StyledComponents";
import Header from "../../components/header";
import ContactFormFields from "../../components/contact/ContactFormFields";

import { validContactSchema } from "../../validation";

const CREATE_CONTACT = gql`
  mutation CreateContact(
    $firstName: String!
    $lastName: String!
    $caseRole: [Role]!
    $email: String!
    $courtCaseId: [ID]
  ) {
    createContact(
      input: {
        firstName: $firstName
        lastName: $lastName
        caseRole: $caseRole
        email: $email
        courtCaseId: $courtCaseId
      }
    ) {
      contact {
        id
        firstName
        lastName
        caseRole
        email
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

class CreateContactForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alert: "",
      type: "",
      caseOptions: ""
    };
  }

  render() {
    return (
      <div>
        <Header title={"Create Contact"} />

        {this.state.alert && this.state.type ? (
          <Alert variant={this.state.type}>{this.state.alert}</Alert>
        ) : null}

        <CONTAINER>
          <Mutation mutation={CREATE_CONTACT}>
            {(createContact, { data }) => (
              <div>
                <Formik
                  enableReinitialize
                  initialValues={{
                    firstName: "",
                    lastName: "",
                    email: "",
                    caseRole: "",
                    caseId: ""
                  }}
                  validationSchema={validContactSchema}
                  onSubmit={(values, { setSubmitting, resetForm }) => {
                    createContact({
                      variables: {
                        firstName: values.firstName,
                        lastName: values.lastName,
                        caseRole: values.caseRole,
                        email: values.email,
                        courtCaseId: parseInt(values.caseId)
                      }
                    })
                      .then(res => {                        
                        setSubmitting(false);
                        resetForm();
                        this.setState({
                          alert: "Contact created successfully!",
                          type: "success"
                        });
                        window.location.reload(false);
                      })
                      .catch(err => {
                        setSubmitting(false);
                        this.setState({
                          alert: "Error on creating contact!",
                          type: "danger"
                        });
                      });
                  }}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                    resetForm,
                    setFieldValue
                  }) => (
                      <FORM onSubmit={handleSubmit} className="mx-auto">
                        <ContactFormFields
                          values={values}
                          errors={errors}
                          touched={touched}
                          handleChange={handleChange}
                          handleBlur={handleBlur}
                          setFieldValue={setFieldValue}
                        />
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
                                  onChange={selected =>
                                    setFieldValue("caseId", selected[0].id)
                                  }
                                  className={
                                    touched.caseId && errors.caseId
                                      ? "error"
                                      : null
                                  }
                                />
                              );
                            }}
                          </Query>
                          {touched.caseId && errors.caseId ? (
                            <div className="error-message">{errors.caseId}</div>
                          ) : null}
                        </Form.Group>
                        <div className="formButtonContainer">
                          <BUTTON
                            type="submit"
                            disabled={isSubmitting}
                            variant="primary"
                          >
                            Create
                        </BUTTON>
                          <BUTTON
                            disabled={isSubmitting}
                            variant="secondary"
                            onClick={() => resetForm()}
                          >
                            Reset
                        </BUTTON>
                        </div>
                      </FORM>
                    )}
                </Formik>
              </div>
            )}
          </Mutation>
        </CONTAINER>
      </div>
    );
  }
}

export default CreateContactForm;
