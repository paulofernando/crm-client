import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import ContactFormFields from '../contact/ContactFormFields';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

// -------------------------------

const contact = {
    firstName: "John",
    lastName: "Smith",
    caseRole: "Judge",
    email: "js@js.com"
}

const ContactFormFieldsComponent = (
    <ContactFormFields
        values={contact}
        errors={errors}
        touched={touched} />
)

// -------------------------------

describe('ContactFormFields', () => {

    const errors = {
        title: ""
    }

    const touched = {
        title: ""
    }

    it('renders correctly', () => {
        const wrapper = renderer
            .create(ContactFormFieldsComponent)
            .toJSON();
        expect(wrapper).toMatchSnapshot();
    });

});