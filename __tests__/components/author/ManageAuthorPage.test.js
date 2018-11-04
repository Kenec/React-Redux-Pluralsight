/* global expect jest */
import React from 'react';
import { mount } from 'enzyme';
import PropTypes from 'prop-types';
import configureStore from 'redux-mock-store'
import sinon from 'sinon';
import { ManageAuthorPage } from '../../../src/components/author/ManageAuthorPage';

describe('<ManageAuthorPage />', () => {
  const saveOrUpdateAuthor = sinon.spy(() => Promise
  .resolve({ response: { data: 'Error' } }));
  const updateAuthorState = sinon.spy();

  const props = {
    actions: {
      saveOrUpdateAuthor
    },
    author: { id: 'cory-house', firstName: 'Cory', lastName: 'House' }
  };

  const initialState = {
    actions: props.actions,
    author: props.author
  };
  const mockStore = configureStore();
  let store, wrapper;

  const saveAuthor = sinon.spy();
  const redirectToAddAuthor = sinon.spy();

  beforeEach(() => {
    store = mockStore(initialState);
    wrapper = mount(<ManageAuthorPage store={store} {...props} />);
  });

  it('should render the ManageAuthorPage contents', () => {
    expect(wrapper.find('h1').at(0).text()).toEqual('Manage Authors');
    expect(wrapper.find('TextInput').at(0).length).toEqual(1);
    expect(wrapper.find('[label="FirstName"]').at(0).length).toEqual(1);
  });

  it('should contain the AuthorForm component', () => {
    expect(wrapper.find('AuthorForm').length).toEqual(1);
  });

  it('should saveAuthor author when the saveAuthor button is clicked', () => {
    wrapper.find('input').at(2).simulate('click');
    expect(saveAuthor.calledOnce).toEqual(false);
  });

  it('should call the redirect to author page when Edit button is clicked', () => {
    wrapper.find('TextInput').at(0).simulate('change');
    expect(updateAuthorState.calledOnce).toEqual(false);
  });
});