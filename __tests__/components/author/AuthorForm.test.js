/* global expect */
import React from 'react';
import { shallow } from 'enzyme';
import PropTypes from 'prop-types';
import sinon from 'sinon';
import AuthorForm from '../../../src/components/author/AuthorForm';

describe('<AuthorForm />', () => {
  const onSave = sinon.spy();
  const onChange = sinon.spy();
  let saving = false;
  
  const props = { 
      onSave,
      onChange,
      saving,
      author: { firstName: 'Kene', lastName: 'Nnamani' },
      errors: { firstName: '', lastName: '' }
  };

  let wrapper = shallow(<AuthorForm {...props} />);

  it('should render the AuthorForm contents', () => {
    expect(wrapper.find('form').at(0).length).toEqual(1);
    expect(wrapper.find('h1').at(0).text()).toEqual('Manage Authors');
    expect(wrapper.find('TextInput').at(0).length).toEqual(1);
    expect(wrapper.find('TextInput').at(1).length).toEqual(1);
    expect(wrapper.find('TextInput').at(0).props().name).toEqual('firstName');
    expect(wrapper.find('TextInput').at(1).props().name).toEqual('lastName');
    expect(wrapper.find('[type="submit"]').at(0).props().value).toEqual('Save');
    expect(wrapper.find('[type="submit"]').length).toEqual(1);
  });

  it('should display "saving..." when the submit button is clicked', () => {
    props.saving = true;
    wrapper = shallow(<AuthorForm {...props} />);
    expect(wrapper.find('[type="submit"]').at(0).props().value).toEqual('Saving...');
  });
});