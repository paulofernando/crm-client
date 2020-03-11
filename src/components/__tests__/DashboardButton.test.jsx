import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import DashoardButton from '../DashoardButton';

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
        const container = shallow(DashoardButtonComponent);        
        expect(container.html()).toMatchSnapshot();     
    });

});