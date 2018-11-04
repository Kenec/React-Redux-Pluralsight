/* global expect */
import React from 'react';
import { shallow } from 'enzyme';
import PropTypes from 'prop-types';
import sinon from 'sinon';
import AuthorListRow from '../../../src/components/author/AuthorListRow';

describe('<AuthorListRow />', () => {
  const deleteAuthor = sinon.spy();

  const props = {
    deleteAuthor,
    author: { id: 'cory-house', firstName: 'Cory', lastName: 'House' }
  };

  let wrapper = shallow(<AuthorListRow {...props} />);

  it('should render the AuthorListRow contents', () => {
    expect(wrapper.find('tr').at(0).length).toEqual(1);
    expect(wrapper.find('td').at(0).text()).toEqual('Cory');
    expect(wrapper.find('td').at(1).text()).toEqual('House');
    expect(wrapper.find('Link').length).toEqual(1);
    expect(wrapper.find('button').length).toEqual(2);
    expect(wrapper.find('button').at(0).text()).toEqual('Edit');
    expect(wrapper.find('button').at(1).text()).toEqual('Delete');
  });

  it('should delete Author when the delete button is clicked', () => {
    wrapper.find('button').at(1).simulate('click');
    expect(deleteAuthor.calledOnce).toEqual(true);
  });
});