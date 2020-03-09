import React from 'react';
import { shallow } from 'enzyme';
import SVGIcon from '../SVGIcon';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('SVGIcon', () => {

    it('renders correctly', () => {
        let wrapper = shallow(<SVGIcon name={"logo"} width="24" />);
        expect(wrapper).toMatchSnapshot();

        wrapper = shallow(<SVGIcon name={"logo"} width="24" fill={"#aaa"}/>);
        expect(wrapper).toMatchSnapshot();
    });
    
});