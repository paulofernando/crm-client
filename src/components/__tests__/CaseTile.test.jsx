import React from 'react';
import { shallow, mount } from 'enzyme';

import CourtCaseTile from '../case/CaseTile';

// -------------------------------

const courtCase = {
    title: "Test title",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin arcu enim, tincidunt fringilla rhoncus vitae, semper quis quam. Nam et tincidunt ex. Nunc ut ante id lorem consectetur vulputate ut non nulla. Curabitur viverra, libero vel rutrum volutpat, erat orci eleifend sem, sit amet vestibulum leo lectus at quam",
    value: 1000.00,
    courtDate: "2020-01-01T00:00:00.000Z"
}

const CourtCaseTileComponent = (<CourtCaseTile courtCase={courtCase} />)

// -------------------------------

describe('CourtCaseTile', () => {
    it('renders correctly', () => {
        const container = shallow(CourtCaseTileComponent);        
        expect(container.html()).toMatchSnapshot();
        
        const component = mount(
            <CourtCaseTile courtCase={courtCase} />
        );

        const courtCaseTitle = component.find('.courtCaseTitle');
        expect(courtCaseTitle.text()).toBe('Test title');

        const courtCaseDescription = component.find('.courtCaseDescription');
        expect(courtCaseDescription.text()).toBe('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin arcu enim, tincidunt fringilla rhoncus vitae, semper quis quam. Nam et tincidunt ex. Nunc ut ante id lorem consectetur vulputate ut non nulla. Curabitur viverra, libero vel rutrum volutpat, erat orci eleifend sem, sit amet vestibulum leo lectus at quam');        
    });
});