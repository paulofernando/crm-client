import React from "react";
import {
  Form,
  InputGroup,
  Alert
} from "react-bootstrap";
import { Formik } from "formik";
import gql from "graphql-tag";
import { Mutation } from "@apollo/react-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import '../../App.css';
import { CONTAINER, FORM, BUTTON } from "../../components/StyledComponents";
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

class CreateCourtCaseForm extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      alert: "",
      type: "",
      courtDate: ""
    };
  }

  handleDateChange = courtDate => {
    this.setState({
      courtDate: courtDate
    });
  };

  render() {
    return (
      <div>
        <Header title={"Create Case"} />
        
        {this.state.alert && this.state.type ? (
          <Alert variant={this.state.type}>
            {this.state.alert}
          </Alert>
        ) : null}
        
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
                        courtDate: this.state.courtDate
                      }
                    })
                      .then(res => {
                        setSubmitting(true);
                        resetForm();
                        this.setState({
                          alert: "Court case created successfully!",
                          type: "success"
                        })
                      })
                      .catch(err => {
                        this.setState({
                          alert: "Error on creating court case!",
                          type: "danger"
                        })
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
                        <Form.Group style={{ width: '50%' }} controlId="formEmail">
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
                              style={{ textAlign: "right" }}
                            />
                            <InputGroup.Append>
                              <InputGroup.Text>.00</InputGroup.Text>
                            </InputGroup.Append>
                          </InputGroup>
                          {touched.value && errors.value ? (
                            <div className="error-message">{errors.value}</div>
                          ) : null}
                        </Form.Group>
                        <Form.Group style={{ width: '50%' }} controlId="formCourtDate">
                          <Form.Label>Court Date</Form.Label>
                          <DatePicker
                            name="courtDate"
                            onBlur={handleBlur}
                            selected={this.state.courtDate}
                            onChange={this.handleDateChange}                  
                          />
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
  }
};

export default CreateCourtCaseForm;
