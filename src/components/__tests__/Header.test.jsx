import React from 'react';
import { shallow } from 'enzyme';
import Header from '../header';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('Header', () => {

    it('renders correctly', () => {
        const wrapper = shallow(<Header title={"Title test"} />);
        expect(wrapper).toMatchSnapshot();
    });
    
});