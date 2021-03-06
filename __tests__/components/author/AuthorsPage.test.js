/* global expect jest */
import React from 'react';
import { mount } from 'enzyme';
import PropTypes from 'prop-types';
import configureStore from 'redux-mock-store'
import sinon from 'sinon';
import { AuthorsPage } from '../../../src/components/author/AuthorsPage';

describe('<AuthorsPage />', () => {
  const handleClick = sinon.spy();
  const deleteAuthor = sinon.spy();
  const removeAuthor = sinon.spy();
  const redirectToAddAuthor = sinon.spy();

  const props = {
    actions: {},
    authors: [{ id: 'cory-house', firstName: 'Cory', lastName: 'House' }],
    courses: [{ id: "test", title: "Test", watchHref: "test.com", authorId: "cory-house", length: "5:08", category: "JavaScript" }]
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
    wrapper = mount(<AuthorsPage store={store} {...props} />);
  });

  it('should render the AuthorsPage contents', () => {
    expect(wrapper.find('h1').at(0).text()).toEqual('Authors');
    expect(wrapper.find('[type="submit"]').at(0).length).toEqual(1);
    expect(wrapper.find('[value="Add Author"]').at(0).length).toEqual(1);
    expect(wrapper.find('td').at(1).text()).toEqual('House');
    expect(wrapper.find('AuthorList').length).toEqual(1);
    expect(wrapper.find('AuthorListRow').length).toEqual(1);
  });

  it('should remove author when the remove button is clicked', () => {
    const spy = jest.spyOn(wrapper.instance(), 'deleteAuthor');
    wrapper.find('button').at(1).simulate('click'); 
    expect(deleteAuthor.calledOnce).toEqual(false);
  });

  it('should call the redirect to author page when Edit button is clicked', () => {
    const spy = jest.spyOn(wrapper.instance(), 'redirectToAddAuthor');
    
    wrapper.find('Link').at(0).simulate('click');
    expect(redirectToAddAuthor.calledOnce).toEqual(false);
  });
});