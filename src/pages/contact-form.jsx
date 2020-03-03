import React from 'react'
import { withFormik } from 'formik'
import '../App.css'

import { validContactSchema } from '../validation/validation'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'

const fields = ['firstName', 'lastName', 'caseRole', 'email', 'courtCaseId']

const InnerForm = props => {
    const { values, touched, errors, isSubmitting, handleChange, handleBlur, handleSubmit } = props

    return (
        <Form className="contactForm" onSubmit={handleSubmit}>
            <Form.Label>First name</Form.Label>
            <Form.Control className="formField" type="input" placeholder="Enter first name" />

            <Form.Label>Last name</Form.Label>
            <Form.Control className="formField" type="input" placeholder="Enter last name" />

            <Form.Label>Email address</Form.Label>
            <Form.Control className="formField" type="email" placeholder="Enter email" />

            <Form.Label>Court Role</Form.Label>
            <p>
                <ToggleButtonGroup type="checkbox">
                    <ToggleButton variant="outline-primary" value={'Accused'}>Accused</ToggleButton>
                    <ToggleButton variant="outline-primary" value={'Barrister'}>Barrister</ToggleButton>
                    <ToggleButton variant="outline-primary" value={'Judge'}>Judge</ToggleButton>
                    <ToggleButton variant="outline-primary" value={'Prosecutor'}>Prosecutor</ToggleButton>
                </ToggleButtonGroup>
            </p>

            <Form.Label>Case ID</Form.Label>
            <Form.Control className="formField" className="formCaseIdInput" type="input" placeholder="Enter court case id" />
            
            <div className="formButtonContainer">
                <Button className="formButton" type='submit' disabled={isSubmitting} variant="primary">
                    Create Contact
                </Button>
                <Button className="formButton" type='submit' disabled={isSubmitting} variant="secondary">
                    Reset
                </Button>
            </div>
        </Form>
    )
}

const CreateContactForm = withFormik({
    mapPropsToValues: () => ({ firstName: '', lastName: '', caseRole: '', email: '', courtCaseId: '' }),

    validationSchema: validContactSchema,

    handleSubmit: async (values, { props, setErrors, setSubmitting }) => {
        await new Promise(resolve => setTimeout(resolve, 3000))
        const errors = await props.submit(values)
        if (errors) {
            console.log("ERROS")
        } else {
            props.onFinish()
        }
        setSubmitting(false)
    },

    displayName: 'CreateContactForm'
})(InnerForm)

export default CreateContactForm