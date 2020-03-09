import React from 'react';
import { shallow } from 'enzyme';
import LinkedIcon from '../LinkedIcon';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('LinkedIcon', () => {

    const contact = {
        firstName: "John",
        lastName: "Smith",
        caseRole: "Judge",
        email: "js@js.com",
        courtCaseId: 1
    }

    it('renders correctly', () => {
        const wrapper = shallow(<LinkedIcon contact={contact}/>);
        expect(wrapper).toMatchSnapshot();
    });
    
});