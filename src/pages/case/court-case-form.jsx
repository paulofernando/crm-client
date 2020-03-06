import React from "react";
import { Form, InputGroup } from "react-bootstrap";
import { Formik } from "formik";
import gql from "graphql-tag";
import { Mutation } from "@apollo/react-components";
import '../../App.css';

import { CONTAINER, FORM, BUTTON } from "../../components/style";
import Header from "../../components/header";

import { validCourtCaseSchema } from "../../validation";

const CREATE_COURT_CASE = gql`
  mutation CreateCourtCase(
    $title: String!
    $description: String!
    $value: Float!
    $courtDate: String!
  ) {
    createCourtCase(
      input: {
        title: $title
        description: $description
        value: $value
        courtDate: $courtDate
      }
    ) {
      courtCase {
        id
        title
        description
        value
        courtDate
      }
      errors
    }
  }
`;

const CreateCourtCaseForm = () => {
  return (
    <div>
      <Header title={"Create Case"}/> 
      <CONTAINER>
        <Mutation mutation={CREATE_COURT_CASE}>
          {(createCourtCase, { data }) => (
            <div>
              <Formik
                initialValues={{
                  title: "",
                  description: "",
                  value: "",
                  courtDate: ""
                }}
                validationSchema={validCourtCaseSchema}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                  createCourtCase({
                    variables: {
                      title: values.title,
                      description: values.description,
                      value: parseFloat(values.value),
                      courtDate: values.courtDate
                    }
                  })
                    .then(res => console.log(res))
                    .catch(err => console.log("ERROR: " + err));
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
                  isSubmitting,
                  resetForm
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
                        as="textarea"
                        name="description"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.description}
                        className={
                          touched.description && errors.description
                            ? "error"
                            : null
                        }
                      />
                      {touched.description && errors.description ? (
                        <div className="error-message">{errors.description}</div>
                      ) : null}
                    </Form.Group>
                    <Form.Group style={{width:'50%'}} controlId="formEmail">
                      <Form.Label>Value</Form.Label>
                      <InputGroup>
                          <InputGroup.Prepend>
                              <InputGroup.Text>$</InputGroup.Text>
                          </InputGroup.Prepend>
                          <Form.Control
                          type="text"
                          name="value"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.value}
                          className={touched.value && errors.value ? "error" : null}                        
                          style={{textAlign: "right"}}
                          />
                          <InputGroup.Append>
                              <InputGroup.Text>.00</InputGroup.Text>
                          </InputGroup.Append>
                      </InputGroup>
                      {touched.value && errors.value ? (
                        <div className="error-message">{errors.value}</div>
                      ) : null}
                    </Form.Group>
                    <Form.Group style={{width:'50%'}} controlId="formCourtDate">
                      <Form.Label>Court Date</Form.Label>
                      <Form.Control
                        type="text"
                        name="courtDate"
                        placeholder="01-30-2020"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.courtDate}
                        className={
                          touched.courtDate && errors.courtDate ? "error" : null
                        }
                      />
                      {touched.courtDate && errors.courtDate ? (
                        <div className="error-message">{errors.courtDate}</div>
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
                      <BUTTON disabled={isSubmitting} variant="secondary" onClick={() => resetForm()}>
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

export default CreateCourtCaseForm;
