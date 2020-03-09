import React from 'react';
import { shallow } from 'enzyme';
import DashoardButton from '../DashoardButton';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('DashoardButton', () => {

    it('renders correctly', () => {
        const wrapper = shallow(<DashoardButton to={"/test/1"} icon={"logo"} tooltip={"Tooltip test"}/>);
        expect(wrapper).toMatchSnapshot();
    });
    
});