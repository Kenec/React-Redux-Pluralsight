/* global expect jest */
import React from 'react';
import { mount } from 'enzyme';
import PropTypes from 'prop-types';
import configureStore from 'redux-mock-store'
import sinon from 'sinon';
import CoursesPage from '../../../src/components/course/CoursesPage';

describe('<CoursesPage />', () => {
  const props = {
    actions: {},
    authors: [{ id: 'cory-house', firstName: 'Cory', lastName: 'House' }],
    courses: [{
      id: "test",
      title: "Test",
      watchHref: "test.com",
      authorId: "cory-house",
      length: "5:08",
      category: "JavaScript"
    }]
  };

  const initialState = {
    actions: props.actions,
    authors: props.authors,
    courses: props.courses
  };
  const mockStore = configureStore();
  let store, wrapper;

  beforeEach(() => {
    store = mockStore(initialState);
    wrapper = mount(<CoursesPage store={store} {...props} />);
  });

  it('should render the CoursesPage contents', () => {
    expect(wrapper.find('h1').at(0).text()).toEqual('Courses');
    expect(wrapper.find('[type="submit"]').at(0).length).toEqual(1);
    expect(wrapper.find('[value="Add Course"]').at(0).length).toEqual(1);
    expect(wrapper.find('th').at(1).text()).toEqual('Title');
    expect(wrapper.find('CourseList').length).toEqual(1);
    expect(wrapper.find('CourseListRow').length).toEqual(1);
  });
});