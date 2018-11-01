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

  let store, wrapper;

  const saveAuthor = sinon.spy();

  beforeEach(() => {
    wrapper = mount(<ManageCoursePage {...props} />);
  });

  it('should render the ManageCoursePage contents', () => {
    expect(wrapper.find('h1').at(0).text()).toEqual('Manage Course');
    // expect(wrapper.find('[type="submit"]').at(0).length).toEqual(1);
    // expect(wrapper.find('[value="Add Author"]').at(0).length).toEqual(1);
    // expect(wrapper.find('td').at(1).text()).toEqual('House');
    // expect(wrapper.find('AuthorList').length).toEqual(1);
    // expect(wrapper.find('AuthorListRow').length).toEqual(1);
    // console.log(wrapper.debug());
  });

  it('should remove course when the remove button is clicked', () => {
  //   // wrapper.find('button').at(1).simulate('click');
  //   // console.log(wrapper.debug());
  });

  it('should call the redirect to course page when Edit button is clicked', () => {
  //   wrapper.find('a').at(0).simulate('click');
  //   // expect(redirectToAddAuthor.calledOnce).toEqual(true);
  //   // console.log(wrapper.find('a').at(0));
  });
});