import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import ContactDetails from '../contact/ContactDetails';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

// -------------------------------

const contact = {
    firstName: "John",
    lastName: "Smith",
    caseRole: "Judge",
    email: "js@js.com",
    courtCaseId: 1
}

const ContactDetailsComponent = (<ContactDetails contact={contact} />)

// -------------------------------

describe('ContactDetails', () => {
    it('renders correctly', () => {
        const wrapper = renderer
            .create(ContactDetailsComponent)
            .toJSON();
        expect(wrapper).toMatchSnapshot();
    });

});