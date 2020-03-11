import React from 'react';
import { mount, shallow } from 'enzyme';

import ContactDetails from '../contact/ContactDetails';

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
        const container = shallow(ContactDetailsComponent);        
        expect(container.html()).toMatchSnapshot();
        
        const contactEmail = container.find('.contactEmail');
        expect(contactEmail.text()).toBe('js@js.com');

        const contactCaseRole = container.find('.contactCaseRole');
        expect(contactCaseRole.text()).toBe('Judge');        
    });

});