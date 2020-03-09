import React from 'react';
import { shallow } from 'enzyme';
import ContactTile from '../contact/ContactTile';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('ContactTile', () => {
    it('renders correctly', () => {
      const wrapper = shallow(<ContactTile />);
      expect(wrapper).toMatchSnapshot();
    });
  });