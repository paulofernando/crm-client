import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import CaseFormFields from '../case/CaseFormFields';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

// -------------------------------

const courtCase = {
    title: "Title test",
    description: "Description test",
    value: 1000
}

const errors = {
    title: ""
}

const touched = {
    title: ""
}

const CaseFormFieldsComponent = (
    <CaseFormFields
        values={courtCase}
        errors={errors}
        touched={touched}
        courtDate={new Date()} />
)

// -------------------------------

describe('CaseFormFields', () => {
    it('renders correctly', () => {
        const wrapper = renderer
            .create(CaseFormFieldsComponent)
            .toJSON();
        expect(wrapper).toMatchSnapshot();
    });

});