import React from 'react';
import { shallow } from 'enzyme';
import CaseFormFields from '../case/CaseFormFields';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('CaseFormFields', () => {

    const values = {
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

    it('renders correctly', () => {
        const wrapper = shallow(
            <CaseFormFields
                values={values}
                errors={errors}
                touched={touched}
                courtDate={"01-01-2020"}
            />
        );        
        expect(wrapper).toMatchSnapshot();
    });
        
});