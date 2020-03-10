import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import SVGIcon from '../SVGIcon';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

// -------------------------------

const SVGIconComponent = (<SVGIcon name={"logo"} width="24" />)

// -------------------------------

describe('SVGIcon', () => {
    it('renders correctly', () => {
        const wrapper = renderer
            .create(SVGIconComponent)
            .toJSON();
        expect(wrapper).toMatchSnapshot();
    });

});