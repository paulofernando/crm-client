import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import CourtCaseTile from '../case/CaseTile';

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

const CourtCaseTileComponent = (<CourtCaseTile courtCase={courtCase} />)

// -------------------------------

describe('CourtCaseTile', () => {
    it('renders correctly', () => {
        const wrapper = renderer
            .create(CourtCaseTileComponent)
            .toJSON();
        expect(wrapper).toMatchSnapshot();
    });
});