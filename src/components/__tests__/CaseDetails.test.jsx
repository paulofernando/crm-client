import React from 'react';
import { mount, shallow } from 'enzyme';

import CaseDetails from '../case/CaseDetails';

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
        const container = shallow(CaseDetailsComponent);        
        expect(container.html()).toMatchSnapshot();

        const courtCaseTitle = container.find('.courtCaseTitle');
        expect(courtCaseTitle.text()).toBe('Test title');

        const courtCaseDescription = container.find('.courtCaseDescription');
        expect(courtCaseDescription.text()).toBe('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin arcu enim, tincidunt fringilla rhoncus vitae, semper quis quam. Nam et tincidunt ex. Nunc ut ante id lorem consectetur vulputate ut non nulla. Curabitur viverra, libero vel rutrum volutpat, erat orci eleifend sem, sit amet vestibulum leo lectus at quam');
        
        const courtCaseValue = container.find('NumberFormat').props();
        expect(courtCaseValue.value).toBe(1000);        
    });
});