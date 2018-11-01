/* global expect */
import React from 'react';
import { shallow } from 'enzyme';
import Header from '../../../src/components/common/Header';

describe('<Header />', () => {
  const props = {
    loading: false
  };

  let wrapper = shallow(<Header {...props}/>);
  it('should render the Header contents', () => {
    expect(wrapper.find('IndexLink').at(0).length).toEqual(1);
    expect(wrapper.find('Link').length).toEqual(3);
    expect(wrapper.find('LoadingDots').length).toEqual(0);
  });

  it('should render LoadingDots components when loading props is true', () => {
    props.loading = true;
    wrapper = shallow(<Header {...props} />);
    expect(wrapper.find('LoadingDots').length).toEqual(1);
  });
});