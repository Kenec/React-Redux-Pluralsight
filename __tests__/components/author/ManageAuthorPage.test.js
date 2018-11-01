/* global expect jest */
import React from 'react';
import { mount } from 'enzyme';
import PropTypes from 'prop-types';
import configureStore from 'redux-mock-store'
import sinon from 'sinon';
import { ManageAuthorPage } from '../../../src/components/author/ManageAuthorPage';

describe('<ManageAuthorPage />', () => {
  const props = {
    actions: {},
    author: { id: 'cory-house', firstName: 'Cory', lastName: 'House' }
  };

  const initialState = {
    actions: props.actions,
    author: props.author
  };
  const mockStore = configureStore();
  let store, wrapper;

  const saveAuthor = sinon.spy();

  beforeEach(() => {
    store = mockStore(initialState);
    wrapper = mount(<ManageAuthorPage {...props} />);
  });

  it('should render the ManageAuthorPage contents', () => {
    expect(wrapper.find('h1').at(0).text()).toEqual('Manage Authors');
    // expect(wrapper.find('[type="submit"]').at(0).length).toEqual(1);
    // expect(wrapper.find('[value="Add Author"]').at(0).length).toEqual(1);
    // expect(wrapper.find('td').at(1).text()).toEqual('House');
    // expect(wrapper.find('AuthorList').length).toEqual(1);
    // expect(wrapper.find('AuthorListRow').length).toEqual(1);
    // console.log(wrapper.debug());
  });

  it('should remove author when the remove button is clicked', () => {
  //   // wrapper.find('button').at(1).simulate('click');
  //   // console.log(wrapper.debug());
  });

  it('should call the redirect to author page when Edit button is clicked', () => {
  //   wrapper.find('a').at(0).simulate('click');
  //   // expect(redirectToAddAuthor.calledOnce).toEqual(true);
  //   // console.log(wrapper.find('a').at(0));
  });
});