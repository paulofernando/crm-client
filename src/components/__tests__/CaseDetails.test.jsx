import React from 'react';
import { shallow } from 'enzyme';
import CaseDetails from '../case/CaseDetails';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('CaseDetails', () => {

    it('renders correctly', () => {
        const courtCase = {
            title: "Test title",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin arcu enim, tincidunt fringilla rhoncus vitae, semper quis quam. Nam et tincidunt ex. Nunc ut ante id lorem consectetur vulputate ut non nulla. Curabitur viverra, libero vel rutrum volutpat, erat orci eleifend sem, sit amet vestibulum leo lectus at quam",
            value: 1000.00,
            courtDate: "01-01-2020"
        }

        let wrapper = shallow(<CaseDetails courtCase={courtCase} />);
        expect(wrapper).toMatchSnapshot();

        delete courtCase.description
        wrapper = shallow(<CaseDetails courtCase={courtCase} />);
        expect(wrapper).toMatchSnapshot();
    });

});