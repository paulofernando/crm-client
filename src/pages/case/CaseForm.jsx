import React from "react";
import { Alert } from "react-bootstrap";
import { Formik } from "formik";
import gql from "graphql-tag";
import { Mutation } from "@apollo/react-components";

import "../../App.css";
import { CONTAINER, FORM, BUTTON } from "../../components/StyledComponents";
import Header from "../../components/header";
import CaseFormFields from "../../components/case/CaseFormFields";

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
    super(props);
    this.state = {
      alert: "",
      type: "",
      courtDate: ""
    };
  }

  handleDateChange = courtDate => {
    console.log(courtDate);
    this.setState({
      courtDate: courtDate
    });
  };

  render() {
    return (
      <div>
        <Header title={"Create Case"} />

        {this.state.alert && this.state.type ? (
          <Alert variant={this.state.type}>{this.state.alert}</Alert>
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
                        });
                      })
                      .catch(err => {
                        setSubmitting(false);
                        this.setState({
                          alert: "Error on creating court case!",
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

export default CreateCourtCaseForm;
