/* global expect */
import React from 'react';
import { shallow } from 'enzyme';
import PropTypes from 'prop-types';
import sinon from 'sinon';
import CourseList from '../../../src/components/course/CourseList';

describe('<CourseList />', () => {
  const deleteCourse = sinon.spy();

  const props = {
    deleteCourse,
    courses: [ {
      id: "test",
      title: "Test",
      watchHref: "test.com",
      authorId: "cory-house",
      length: "5:08",
      category: "JavaScript"
    } ]
  };

  const wrapper = shallow(<CourseList {...props} />);

  it('should render the CourseList contents', () => {
    expect(wrapper.find('table').at(0).length).toEqual(1);
    expect(wrapper.find('th').at(1).text()).toEqual('Title');
    expect(wrapper.find('th').at(2).text()).toEqual('Author');
    expect(wrapper.find('CourseListRow').length).toEqual(1);
    expect(wrapper.find('CourseListRow').props().course).toEqual(props.courses[0]);
  });
});