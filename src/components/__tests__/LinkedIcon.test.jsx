import React from 'react';
import { shallow } from 'enzyme';

import LinkedIcon from '../LinkedIcon';

// -------------------------------

const contact = {
    firstName: "John",
    lastName: "Smith",
    caseRole: "Judge",
    email: "js@js.com",
    courtCaseId: 1
}

const LinkedIconComponent = (<LinkedIcon contact={contact} />)

// -------------------------------

describe('LinkedIcon', () => {
    it('renders correctly', () => {
        const container = shallow(LinkedIconComponent);        
        expect(container.html()).toMatchSnapshot();      
    });

});