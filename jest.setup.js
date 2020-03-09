import React from 'react';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

module.exports = {    
    "transform": {
        "^.+\\.jsx?$": "babel-jest"
    }
};