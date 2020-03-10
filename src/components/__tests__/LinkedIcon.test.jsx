import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import LinkedIcon from '../LinkedIcon';

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

const LinkedIconComponent = (<LinkedIcon contact={contact} />)

// -------------------------------

describe('LinkedIcon', () => {
    it('renders correctly', () => {
        const wrapper = renderer
            .create(LinkedIconComponent)
            .toJSON();
        expect(wrapper).toMatchSnapshot();
    });

});