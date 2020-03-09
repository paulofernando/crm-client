import React from 'react';
import { shallow } from 'enzyme';
import ContactTile from '../contact/ContactTile';

describe('ContactTile', () => {
    it('renders correctly', () => {
      const wrapper = shallow(<ContactTile />);
      expect(wrapper).toMatchSnapshot();
    });
  });