import React from 'react'
import { withFormik } from 'formik'
import '../App.css'

import { validContactSchema } from '../validation/validation'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'

const InnerForm = props => {
    const { values, touched, errors, isSubmitting, handleChange, handleBlur, handleSubmit } = props

    return (
        <Form className="contactForm" onSubmit={handleSubmit}>
            <Form.Label>Title</Form.Label>
            <Form.Control className="formField" type="input"/>

            <Form.Label>Description</Form.Label>
            <Form.Control className="formField" type="textarea"/>

            <Form.Label>Value</Form.Label>
            <Form.Control className="formField formSmallInput" type="input"/>

            <Form.Label>Court date</Form.Label>            
            <Form.Control className="formField formSmallInput" type="input"/>

            <div className="formButtonContainer">
                <Button className="formButton" type='submit' disabled={isSubmitting} variant="primary">
                    Create Case
                </Button>
                <Button className="formButton" disabled={isSubmitting} variant="secondary">
                    Reset
                </Button>
            </div>
        </Form>
    )
}

const CreateCourtCaseForm = withFormik({
    mapPropsToValues: () => ({ firstName: '', lastName: '', caseRole: '', email: '', courtCaseId: '' }),

    validationSchema: validContactSchema,

    handleSubmit: async (values, { props, setErrors, setSubmitting }) => {
        console.log("HandleSubmit")
        //const [mutate] = useMutation(createContactMutation)
        const errors = await props.submit(values)
        if (errors) {
            //setErrors(normalizeErrors(errors))
        } else {
            props.onFinish()
        }
        setSubmitting(false)
    },

    displayName: 'CreateCourtCaseForm'
})(InnerForm)

export default CreateCourtCaseForm