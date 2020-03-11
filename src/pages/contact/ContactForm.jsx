import React from "react";
import { Alert, Form } from "react-bootstrap";
import { Formik } from "formik";
import { Mutation } from "@apollo/react-components";
import { Typeahead } from "react-bootstrap-typeahead";
import { Query } from "react-apollo";

import "../../App.css";
import { CONTAINER, FORM, BUTTON } from "../../components/StyledComponents";
import Header from "../../components/Header";
import ContactFormFields from "../../components/contact/ContactFormFields";

import {
  GET_CONTACTS,
  GET_CASES_TITLES,
  GET_COURT_CASES
} from "../../graphQL/queries"
import { CREATE_CONTACT } from "../../graphQL/mutations"

import { validContactSchema } from "../../validation";

class CreateContactForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alert: "",
      type: ""
    };
  }

  onUpdate = (cache, { data: { createContact } }) => {
    try {
      const { contacts } = cache.readQuery({ query: GET_CONTACTS });
      cache.writeQuery({
        query: GET_CONTACTS,
        data: { contacts: contacts.concat([createContact]) }
      });
    } catch (e) {
      //window.location.reload(false);
    }
  };

  render() {
    return (
      <div>
        <Header title={"Create Contact"} />

        {this.state.alert && this.state.type ? (
          <Alert
            className="customAlert"
            variant={this.state.type}
            onClick={() => this.setState({ alert: "" })}
          > {this.state.alert} </Alert>
        ) : null}

        <CONTAINER>
          <Mutation 
              mutation={CREATE_CONTACT}
              update={this.onUpdate}
              refetchQueries = {[
                { query: GET_CONTACTS },
                { query: GET_COURT_CASES}
              ]}
            >
            {(createContact, { data }) => (
              <div>
                <Formik
                  enableReinitialize
                  initialValues={{
                    firstName: "",
                    lastName: "",
                    email: "",
                    caseRole: ""
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
                        <Form.Group className="ml-4 mr-4" controlId="formCourtCase">
                          <Form.Label>Case</Form.Label>
                          <Query query={GET_CASES_TITLES}>
                            {({ loading, error, data }) => {
                              if (loading) return <div>Fetching...</div>;
                              if (error) return <div>Error</div>;

                              const options = [];
                              data.courtCases.map(item => {
                                let caseHasRole = false
                                for(var i = 0; i < item.contacts.length; i++) {
                                  if (item.contacts[i].caseRole === values.caseRole) {
                                    caseHasRole = true
                                    break;
                                  }
                                }

                                if (!caseHasRole) options.push({ label: `${item.id} - ${item.title}`, id: item.id })
                              });

                              return (
                                <Typeahead
                                  id="autocompleteCases"
                                  name="caseId"
                                  options={options}
                                  value={values.caseId}
                                  disabled={values.caseRole === ""}
                                  placeholder="Choose a case..."
                                  onChange={selected => {
                                      if (selected[0]) {
                                        setFieldValue("caseId", selected[0].id)
                                      }
                                    }
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
