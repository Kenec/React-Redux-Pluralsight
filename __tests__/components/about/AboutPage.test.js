/* global expect */
import React from 'react';
import { shallow } from 'enzyme';
import AboutPage from '../../../src/components/about/AboutPage';

describe('<AboutPage />', () => {
  const wrapper = shallow(<AboutPage />);
  it('should render the AboutPage contents', () => {
    expect(wrapper.find('div').at(0).length).toEqual(1);
    expect(wrapper.find('h1').at(0).text()).toEqual('About');
    expect(wrapper.find('p').at(0).text()).toEqual('Sample React Redux Demo App');
  });
});