/* global expect */
import React from 'react';
import { shallow } from 'enzyme';
import PropTypes from 'prop-types';
import sinon from 'sinon';
import AuthorList from '../../../src/components/author/AuthorList';

describe('<AuthorList />', () => {
  const deleteAuthor = sinon.spy();

  const props = {
    deleteAuthor,
    authors: [ { id: 'cory-house', firstName: 'Cory', lastName: 'House' } ]
  };

  const wrapper = shallow(<AuthorList {...props} />);

  it('should render the AuthorList contents', () => {
    expect(wrapper.find('table').at(0).length).toEqual(1);
    expect(wrapper.find('th').at(0).text()).toEqual('FirstName');
    expect(wrapper.find('th').at(1).text()).toEqual('LastName');
    expect(wrapper.find('AuthorListRow').length).toEqual(1);
    expect(wrapper.find('AuthorListRow').props().author).toEqual({ id: 'cory-house', firstName: 'Cory', lastName: 'House' });
  });
});