/* global expect */
import React from 'react';
import { shallow } from 'enzyme';
import LoadingDots from '../../../src/components/common/LoadingDots';

describe('<LoadingDots />', () => {
  const props = {
    interval: 20,
    dots: 20
  };

  let wrapper = shallow(<LoadingDots {...props}/>);
  it('should render the LoadingDots contents', () => {
    expect(wrapper.props().interval).toEqual(20);
    expect(wrapper.props().dots).toEqual(20);
  });

  it('should render LoadingDots components when loading props is true', () => {
    props.loading = true;
    wrapper = shallow(<LoadingDots {...props} />);
    expect(wrapper.props().loading).toEqual(true);
    expect(wrapper.find('span').text().length).toEqual(2);
  });
});