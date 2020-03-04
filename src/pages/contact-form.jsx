import React from "react";
import { Form, ToggleButtonGroup } from "react-bootstrap";
import { Formik } from "formik";

import { validContactSchema } from "../validation/validation";
import { CONTAINER, FORM, BUTTON, TOGGLE } from "../components/style";

const CreateContactForm = () => {
  return (
    <CONTAINER>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          caseRole: "Accused",
          email: "",
          courtCaseId: ""
        }}
        validationSchema={validContactSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
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
                className={touched.caseId && errors.caseId ? "error" : null}
              />
              {touched.caseId && errors.caseId ? (
                <div className="error-message">{errors.caseId}</div>
              ) : null}
            </Form.Group>

            <div className="formButtonContainer">
              <BUTTON type="submit" disabled={isSubmitting} variant="primary">
                Create Contact
              </BUTTON>
              <BUTTON disabled={isSubmitting} variant="secondary">
                Reset
              </BUTTON>
            </div>
          </FORM>
        )}
      </Formik>
    </CONTAINER>
  );
};

export default CreateContactForm;