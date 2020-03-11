import React from "react";
import { Alert } from "react-bootstrap";
import { Formik } from "formik";
import { Mutation } from "@apollo/react-components";

import "../../App.css";
import { CONTAINER, FORM, BUTTON } from "../../components/StyledComponents";
import Header from "../../components/Header";
import CaseFormFields from "../../components/case/CaseFormFields";

import { validCourtCaseSchema } from "../../validation";
import { CREATE_COURT_CASE } from "../../graphQL/mutations"
import { GET_COURT_CASES } from "../../graphQL/queries"

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
    this.setState({
      courtDate: courtDate
    });
  };

  onUpdate = (cache, { data: { createCourtCase } }) => {
    try {
      const { courtCases } = cache.readQuery({ query: GET_COURT_CASES });    
      cache.writeQuery({
        query: GET_COURT_CASES,
        data: { courtCases: courtCases.concat([createCourtCase]) }
      });
    } catch (e) {
      //window.location.reload(false);
    }
  };

  render() {
    return (
      <div>
        <Header title={"Create Case"} />

        {this.state.alert && this.state.type ? (
          <Alert
            className="customAlert"
            variant={this.state.type}
            onClick={() => this.setState({ alert: "" })}
          > {this.state.alert} </Alert>
        ) : null}

        <CONTAINER>
          <Mutation 
              mutation={CREATE_COURT_CASE}
              update={this.onUpdate}
              refetchQueries = {[
                { query: GET_COURT_CASES }
              ]}
            >
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
                    if (!this.state.courtDate) {
                      setSubmitting(false);
                      return
                    }
                    createCourtCase({
                      variables: {
                        title: values.title,
                        description: values.description,
                        value: parseFloat(values.value),
                        courtDate: this.state.courtDate
                      }
                    })
                      .then(res => {            
                        setSubmitting(false);
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
