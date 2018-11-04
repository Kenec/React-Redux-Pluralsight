/* global expect jest */
import React from 'react';
import { mount } from 'enzyme';
import PropTypes from 'prop-types';
import configureStore from 'redux-mock-store'
import sinon from 'sinon';
import { ManageCoursePage } from '../../../src/components/course/ManageCoursePage';

describe('<ManageCoursePage />', () => {
  const props = {
    actions: {},
    authors: [{
      id: 'cory-house',
      firstName: 'Cory',
      lastName: 'House'
     }],
    course: {
      id: "test",
      title: "Test",
      watchHref: "test.com",
      authorId: "cory-house",
      length: "5:08",
      category: "JavaScript"
    }
  };
  const initialState = {
    actions: props.actions,
    authors: props.authors,
    courses: props.courses
  };

  const redirectToAddAuthor = sinon.spy();
  const saveCourse = sinon.spy();

  let store, wrapper;
  const mockStore = configureStore();

  beforeEach(() => {
    store = mockStore(initialState);
    wrapper = mount(<ManageCoursePage store={store} {...props} />);
  });

  it('should render the ManageCoursePage contents', () => {
    expect(wrapper.find('h1').at(0).text()).toEqual('Manage Course');
    expect(wrapper.find('TextInput').at(0).length).toEqual(1);
    expect(wrapper.find('[label="Title"]').at(0).length).toEqual(1);
  });

  it('should contain the CourseForm component', () => {
    expect(wrapper.find('CourseForm').length).toEqual(1);
  });

  it('should call updateCourseState on onChange event', () => {
    const handleChangeSpy = sinon.spy(ManageCoursePage.prototype, "updateCourseState");
    const event = {target: {name: "title", value: "spam"}};
    wrapper.find('TextInput').at(0).simulate('change', event);
    expect(handleChangeSpy.calledOnce).toEqual(false);
  });

  it('should save course when the save button is clicked', () => {
    wrapper.find('input').at(2).simulate('click');
    expect(saveCourse.calledOnce).toEqual(false);
  });
});