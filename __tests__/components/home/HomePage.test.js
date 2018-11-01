/* global expect */
import React from 'react';
import { shallow } from 'enzyme';
import HomePage from '../../../src/components/home/HomePage';

describe('<HomePage />', () => {
  let wrapper = shallow(<HomePage />);
  it('should render the HomePage contents', () => {
    expect(wrapper.find('h1').text()).toEqual('Demo Admin');
    expect(wrapper.find('p').text()).toEqual('Sample React Redux Demo App');
    expect(wrapper.find('Link').props().to).toEqual('about');
  });
});