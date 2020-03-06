import React from "react";
import {
  Form,
  ToggleButtonGroup,
  ToggleButton
} from "react-bootstrap";
import { Formik } from "formik";
import gql from "graphql-tag";
import { Mutation } from "@apollo/react-components";
import "../../App.css";

import { CONTAINER, FORM, BUTTON } from "../../components/style";
import Header from "../../components/header";

import { validContactSchema } from "../../validation";

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
      <Header title={"Create Contact"} />
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
                  console.log(values)
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
                  isSubmitting,
                  resetForm,
                  setFieldValue
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
                        className={
                          touched.email && errors.email ? "error" : null
                        }
                      />
                      {touched.email && errors.email ? (
                        <div className="error-message">{errors.email}</div>
                      ) : null}
                    </Form.Group>                    
                    <Form.Group controlId="formCaseRole">
                      <Form.Label>Court Role</Form.Label>
                        <ToggleButtonGroup
                          type="radio"
                          name="caseRole"
                          size="sm"
                        >
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
};

export default CreateContactForm;
