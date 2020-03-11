import React from 'react';
import renderer from 'react-test-renderer';

import ContactFormFields from '../contact/ContactFormFields';

// -------------------------------

const contact = {
    firstName: "John",
    lastName: "Smith",
    caseRole: "Judge",
    email: "js@js.com"
}

const errors = {
    title: ""
}

const touched = {
    title: ""
}

const ContactFormFieldsComponent = (
    <ContactFormFields
        values={contact}
        errors={errors}
        touched={touched} />
)

// -------------------------------

describe('ContactFormFields', () => {
    it('renders correctly', () => {
        const wrapper = renderer
            .create(ContactFormFieldsComponent)
            .toJSON();
        expect(wrapper).toMatchSnapshot();
    });

});