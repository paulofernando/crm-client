import React from "react";
import { Form, ToggleButtonGroup } from "react-bootstrap";
import { Formik } from "formik";
import gql from "graphql-tag";
import { Mutation } from "@apollo/react-components";
import '../../App.css';

import { validContactSchema } from "../../validation";
import { CONTAINER, FORM, BUTTON, TOGGLE } from "../../components/style";

const CREATE_CONTACT = gql`
  mutation CreateContact(
    $firstName: String!
    $lastName: String!
    $caseRole: [Role]!
    $email: String!
    $courtCaseId: [ID]!
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

const CreateContactForm = () => {
  return (
    <div>
      <h2 className="title">Create Contact</h2>
      <CONTAINER>      
        <Mutation mutation={CREATE_CONTACT}>
          {(createContact, { data }) => (
            <div>
              <Formik
                initialValues={{
                  firstName: "",
                  lastName: "",
                  caseRole: "Accused",
                  email: "",
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
                    .then(res => console.log(res))
                    .catch(err => console.log("ERROR: " + err));
                  setSubmitting(false);
                  resetForm();
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting
                }) => (
                  <FORM onSubmit={handleSubmit} className="mx-auto">
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
                        className={
                          touched.lastName && errors.lastName ? "error" : null
                        }
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
                    <Form.Group controlId="formEmail">
                      <Form.Label>Court Role</Form.Label>
                      <ToggleButtonGroup type="checkbox" value={values.caseRole}>
                        <TOGGLE variant="outline-primary" value={"Accused"}>
                          Accused
                        </TOGGLE>
                        <TOGGLE variant="outline-primary" value={"Barrister"}>
                          Barrister
                        </TOGGLE>
                        <TOGGLE variant="outline-primary" value={"Judge"}>
                          Judge
                        </TOGGLE>
                        <TOGGLE variant="outline-primary" value={"Prosecutor"}>
                          Prosecutor
                        </TOGGLE>
                      </ToggleButtonGroup>
                    </Form.Group>

                    <Form.Group controlId="formCourtCaseId">
                      <Form.Label>Case ID</Form.Label>
                      <Form.Control
                        type="text"
                        name="caseId"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.caseId}
                        className={
                          touched.caseId && errors.caseId ? "error" : null
                        }
                      />
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
                      <BUTTON disabled={isSubmitting} variant="secondary">
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
};

export default CreateContactForm;
