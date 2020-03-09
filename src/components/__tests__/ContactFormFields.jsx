import React from 'react';
import { shallow } from 'enzyme';
import ContactFormFields from '../contact/ContactFormFields';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('ContactFormFields', () => {

    const values = {
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

    it('renders correctly', () => {
        const wrapper = shallow(
            <ContactFormFields
                values={values}
                errors={errors}
                touched={touched}
            />
        );        
        expect(wrapper).toMatchSnapshot();
    });
        
});