import React from "react";
import { Form } from "react-bootstrap";
import { Formik } from "formik";

import { validContactSchema } from "../validation/validation";
import { CONTAINER, FORM, BUTTON, TOGGLE } from "../components/style";

const CreateCourtCaseForm = () => {
  return (
    <CONTAINER>
      <Formik
        initialValues={{ firstName: '', lastName: '', caseRole: '', email: '', courtCaseId: '' }}
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
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.title}
                className={touched.title && errors.title ? "error" : null}
              />
              {touched.title && errors.title ? (
                <div className="error-message">{errors.title}</div>
              ) : null}
            </Form.Group>
            <Form.Group controlId="formLastName">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.description}
                className={touched.description && errors.description ? "error" : null}
              />
              {touched.description && errors.description ? (
                <div className="error-message">{errors.description}</div>
              ) : null}
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Value</Form.Label>
              <Form.Control
                type="text"
                name="value"
                placeholder="john@email.com"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.value}
                className={touched.value && errors.value ? "error" : null}
              />
              {touched.value && errors.value ? (
                <div className="error-message">{errors.value}</div>
              ) : null}
            </Form.Group>
            <Form.Group controlId="formCourtDate">
              <Form.Label>Court Date</Form.Label>
              <Form.Control
                type="text"
                name="courtDate"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.courtDate}
                className={touched.courtDate && errors.courtDate ? "error" : null}
              />
              {touched.courtDate && errors.courtDate ? (
                <div className="error-message">{errors.courtDate}</div>
              ) : null}
            </Form.Group>

            <div className="formButtonContainer">
              <BUTTON type="submit" disabled={isSubmitting} variant="primary">
                Create Case
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

export default CreateCourtCaseForm;