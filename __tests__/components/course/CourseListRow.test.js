/* global expect */
import React from 'react';
import { shallow } from 'enzyme';
import PropTypes from 'prop-types';
import sinon from 'sinon';
import CourseListRow from '../../../src/components/course/CourseListRow';

describe('<CourseListRow />', () => {
  const deleteCourse = sinon.spy();

  const props = {
    deleteCourse,
    course: {
      id: "test",
      title: "Test",
      watchHref: "test.com",
      authorId: "cory-house",
      length: "5:08",
      category: "JavaScript"
    }
  };

  let wrapper = shallow(<CourseListRow {...props} />);

  it('should render the CourseListRow contents', () => {
    expect(wrapper.find('tr').at(0).length).toEqual(1);
    expect(wrapper.find('td').at(0).text()).toEqual('Watch');
    expect(wrapper.find('Link').at(0).length).toEqual(1);
    expect(wrapper.find('td').at(2).text()).toEqual('cory-house');
    expect(wrapper.find('button').length).toEqual(1);
    expect(wrapper.find('button').at(0).text()).toEqual('Delete');
  });

  it('should delete Course when the delete button is clicked', () => {
    wrapper.find('button').at(0).simulate('click');
    expect(deleteCourse.calledOnce).toEqual(true);
  });
});