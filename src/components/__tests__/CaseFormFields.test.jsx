import React from 'react';
import renderer from 'react-test-renderer';

import CaseFormFields from '../case/CaseFormFields';

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
        courtDate={new Date("2020-01-01T00:00:00.000Z")} />
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