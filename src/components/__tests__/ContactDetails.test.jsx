import React from 'react';
import { shallow } from 'enzyme';
import ContactDetails from '../contact/ContactDetails';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('ContactDetails', () => {

    it('renders correctly', () => {
        const contact = {
            firstName: "John",
            lastName: "Smith",
            caseRole: "Judge",
            email: "js@js.com",
            courtCaseId: 1
        }
        
        let wrapper = shallow(<ContactDetails contact={contact} />);
        expect(wrapper).toMatchSnapshot();

        delete contact.courtCaseId;
        wrapper = shallow(<ContactDetails contact={contact} />);
        expect(wrapper).toMatchSnapshot();
    });
    
});