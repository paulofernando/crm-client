import React from 'react';
import { mount, shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import CaseDetails from '../case/CaseDetails';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

// -------------------------------

const courtCase = {
    title: "Test title",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin arcu enim, tincidunt fringilla rhoncus vitae, semper quis quam. Nam et tincidunt ex. Nunc ut ante id lorem consectetur vulputate ut non nulla. Curabitur viverra, libero vel rutrum volutpat, erat orci eleifend sem, sit amet vestibulum leo lectus at quam",
    value: 1000.00,
    courtDate: "2020-01-01T00:00:00.000Z"
}

const CaseDetailsComponent = (<CaseDetails courtCase={courtCase} />)

// -------------------------------

describe('CaseDetails', () => {
    it('renders correctly', () => {
        const wrapper = renderer
            .create(CaseDetailsComponent)
            .toJSON();
        expect(wrapper).toMatchSnapshot();

        const component = mount(
            <CaseDetails courtCase={courtCase} />
        );

        const courtCaseTitle = component.find('.courtCaseTitle');
        expect(courtCaseTitle.text()).toBe('Test title');

        const courtCaseDescription = component.find('.courtCaseDescription');
        expect(courtCaseDescription.text()).toBe('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin arcu enim, tincidunt fringilla rhoncus vitae, semper quis quam. Nam et tincidunt ex. Nunc ut ante id lorem consectetur vulputate ut non nulla. Curabitur viverra, libero vel rutrum volutpat, erat orci eleifend sem, sit amet vestibulum leo lectus at quam');

        const courtCaseDate = component.find('.courtCaseDate');
        expect(courtCaseDate.text()).toBe('2020-01-01T00:00:00.000Z');

        const courtCaseValue = component.find('.courtCaseValue');
        expect(courtCaseValue.text()).toBe('$1000.00');        
    });
});