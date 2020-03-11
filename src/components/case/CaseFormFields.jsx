import React from "react";
import { Form, InputGroup } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import "../../App.css";

class CaseFormFields extends React.Component {
  render() {
    const {
      values,
      errors,
      touched,
      handleChange,
      handleBlur,
      handleDateChange,
      courtDate
    } = this.props;

    return (
      <>
        <Form.Group controlId="formTitle">
          <Form.Label>Title *</Form.Label>
          <Form.Control
            type="text"
            name="title"
            className="formTitle"
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
              touched.description && errors.description ? "error" : null
            }
          />
          {touched.description && errors.description ? (
            <div className="error-message">{errors.description}</div>
          ) : null}
        </Form.Group>
        <Form.Group style={{ width: "50%" }} controlId="formEmail">
          <Form.Label>Value *</Form.Label>
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
        <Form.Group style={{ width: "50%" }} controlId="formCourtDate">
          <Form.Label>Court Date *</Form.Label>
          <DatePicker
            name="courtDate"
            onBlur={handleBlur}
            selected={courtDate}
            onChange={handleDateChange}
            className={touched.courtDate && errors.courtDate ? "error" : null}
          />
          {touched.courtDate && !courtDate ? (
            <div className="error-message">This field is required</div>
          ) : null}
        </Form.Group>
      </>
    );
  }
}

export default CaseFormFields;
