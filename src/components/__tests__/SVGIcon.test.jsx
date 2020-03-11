import React from 'react';
import { shallow } from 'enzyme';

import SVGIcon from '../SVGIcon';

// -------------------------------

const SVGIconComponent = (<SVGIcon name={"logo"} width="24" />)

// -------------------------------

describe('SVGIcon', () => {
    it('renders correctly', () => {
        const container = shallow(SVGIconComponent);        
        expect(container.html()).toMatchSnapshot();        
    });

});