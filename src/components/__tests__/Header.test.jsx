import React from 'react';
import { shallow } from 'enzyme';

import Header from '../header';

// -------------------------------

const HeaderComponent = (<Header title={"Title test"} />)

// -------------------------------

describe('Header', () => {
    it('renders correctly', () => {
        const container = shallow(HeaderComponent);        
        expect(container.html()).toMatchSnapshot();
    });

});