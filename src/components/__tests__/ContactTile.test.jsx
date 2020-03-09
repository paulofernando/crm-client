import React from 'react';
import { shallow } from 'enzyme';
import ContactTile from '../contact/ContactTile';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('ContactTile', () => {

    it('renders correctly', () => {
        const contact = {
            firstName: "John",
            lastName: "Smith",
            caseRole: "Judge",
            email: "js@js.com",
            courtCaseId: 1
        }

        let wrapper = shallow(<ContactTile contact={contact} />);
        expect(wrapper).toMatchSnapshot();

        delete contact.courtCaseId
        wrapper = shallow(<ContactTile contact={contact} />);
        expect(wrapper).toMatchSnapshot();
    });

});