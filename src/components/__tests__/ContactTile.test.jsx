import React from 'react';
import { shallow } from 'enzyme';

import ContactTile from '../contact/ContactTile';

// -------------------------------

const contact = {
    firstName: "John",
    lastName: "Smith",
    caseRole: "Judge",
    email: "js@js.com",
    courtCaseId: 1
}

const ContactTileComponent = (<ContactTile contact={contact} />)

// -------------------------------

describe('ContactTile', () => {
    it('renders correctly', () => {
        const container = shallow(ContactTileComponent);        
        expect(container.html()).toMatchSnapshot();
    });

});