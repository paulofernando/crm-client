import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import DashoardButton from '../DashoardButton';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

// -------------------------------

const DashoardButtonComponent = (
    <DashoardButton
        to={"/test/1"}
        icon={"logo"}
        tooltip={"Tooltip test"} />
)

// -------------------------------

describe('DashoardButton', () => {
    it('renders correctly', () => {
        const wrapper = renderer
            .create(DashoardButtonComponent)
            .toJSON();
        expect(wrapper).toMatchSnapshot();
    });

});