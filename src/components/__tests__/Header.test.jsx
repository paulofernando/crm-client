import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import Header from '../header';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

// -------------------------------

const HeaderComponent = (<Header title={"Title test"} />)

// -------------------------------

describe('Header', () => {
    it('renders correctly', () => {
        const wrapper = renderer
            .create(HeaderComponent)
            .toJSON();
        expect(wrapper).toMatchSnapshot();
    });

});