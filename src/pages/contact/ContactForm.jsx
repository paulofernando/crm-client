import React from "react";
import { Alert } from "react-bootstrap";
import { Formik } from "formik";
import gql from "graphql-tag";
import { Mutation } from "@apollo/react-components";

import "../../App.css";
import { CONTAINER, FORM, BUTTON } from "../../components/StyledComponents";
import Header from "../../components/header";
import PartialContactForm from "../../components/contact/PartialContactForm";

import { validSchema } from "../../validation";

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
                  validationSchema={validSchema}
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
                        window.location.reload(false);
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
                      <PartialContactForm
                        values={values}
                        errors={errors}
                        touched={touched}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        setFieldValue={setFieldValue}
                      />
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
