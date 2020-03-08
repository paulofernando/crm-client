import React from "react";
import { Form, ToggleButtonGroup, ToggleButton } from "react-bootstrap";

import "../../App.css";

class ContactFormFields extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alert: "",
      type: "",
      caseOptions: ""
    };
  }

  render() {
    const {
      values,
      errors,
      touched,
      handleChange,
      handleBlur,
      setFieldValue
    } = this.props;

    return (
      <>
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

        <Form.Group controlId="formCaseRole">
          <Form.Label>Court Role</Form.Label>
          <br></br>
          <ToggleButtonGroup type="radio" name="caseRole" size="sm">
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
      </>
    );
  }
}

export default ContactFormFields;
