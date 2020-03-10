import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import ContactTile from '../contact/ContactTile';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

// -------------------------------

const ContactTileComponent = (<ContactTile contact={contact} />)

// -------------------------------

describe('ContactTile', () => {

    it('renders correctly', () => {
        const contact = {
            firstName: "John",
            lastName: "Smith",
            caseRole: "Judge",
            email: "js@js.com",
            courtCaseId: 1
        }

        const wrapper = renderer
            .create(ContactTileComponent)
            .toJSON();
        expect(wrapper).toMatchSnapshot();
    });

});