import React from "react";
import { Alert } from "react-bootstrap";
import { Formik } from "formik";
import gql from "graphql-tag";
import { Mutation } from "@apollo/react-components";

import "../App.css";
import { CONTAINER, FORM, BUTTON } from "../components/StyledComponents";
import Header from "../components/header";
import ContactFormFields from "../components/contact/ContactFormFields";
import CaseFormFields from "../components/case/CaseFormFields";

import { validContactCourtCaseSchema } from "../validation";

const CREATE_CONTACT_COURT_CASE = gql`
  mutation CreateContactCourtCase(
    $title: String!
    $description: String!
    $value: Float!
    $courtDate: String!
    $firstName: String!
    $lastName: String!
    $caseRole: [Role]!
    $email: String!
  ) {
    createContactCourtCase(
      input: {
        title: $title
        description: $description
        value: $value
        courtDate: $courtDate
        firstName: $firstName
        lastName: $lastName
        caseRole: $caseRole
        email: $email
      }
    ) {
      contact {
        id
      }
      courtCase {
        id
      }
      errors
    }
  }
`;

class CreateContactCourtCaseForm extends React.Component {
  constructor(props) {
    super(props);
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
        <Header title={"Create Case with Contact"} />

        {this.state.alert && this.state.type ? (
          <Alert
            className="customAlert"
            variant={this.state.type}
            onClick={() => this.setState({ alert: "" })}
          > {this.state.alert} </Alert>
        ) : null}

        <CONTAINER>
          <Mutation mutation={CREATE_CONTACT_COURT_CASE}>
            {(createContactCourtCase, { data }) => (
              <div>
                <Formik
                  initialValues={{
                    title: "",
                    description: "",
                    value: "",
                    courtDate: "",
                    firstName: "",
                    lastName: "",
                    email: "",
                    caseRole: ""
                  }}
                  validationSchema={validContactCourtCaseSchema}
                  onSubmit={(values, { setSubmitting, resetForm }) => {
                    if (!this.state.courtDate) {
                        setSubmitting(false);
                        return
                    }
                    createContactCourtCase({
                      variables: {
                        title: values.title,
                        description: values.description,
                        value: parseFloat(values.value),
                        courtDate: this.state.courtDate,
                        firstName: values.firstName,
                        lastName: values.lastName,
                        caseRole: values.caseRole,
                        email: values.email
                      }
                    })
                      .then(res => {
                        setSubmitting(false);
                        resetForm();
                        this.setState({
                          alert: "Contact and court case created successfully!",
                          type: "success"
                        });
                      })
                      .catch(err => {
                        setSubmitting(false);
                        this.setState({
                          alert: "Error on creating contact and court case!",
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
                      <CaseFormFields
                        values={values}
                        errors={errors}
                        touched={touched}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        setFieldValue={setFieldValue}
                        handleDateChange={this.handleDateChange}
                        courtDate={this.state.courtDate}
                      />

                      <h3 className="m-3" style={{ textAlign: "center" }}>
                        Create Contact
                      </h3>
                      <ContactFormFields
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

export default CreateContactCourtCaseForm;
