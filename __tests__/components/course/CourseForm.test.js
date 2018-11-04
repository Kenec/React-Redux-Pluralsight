/* global expect */
import React from 'react';
import { shallow } from 'enzyme';
import PropTypes from 'prop-types';
import sinon from 'sinon';
import CourseForm from '../../../src/components/course/CourseForm';

describe('<CourseForm />', () => {
  const onSave = sinon.spy();
  const onChange = sinon.spy();
  let saving = false;
  
  const props = { 
      onSave,
      onChange,
      saving,
      course: {
        id: "test",
        title: "Test",
        watchHref: "test.com",
        authorId: "cory-house",
        length: "5:08",
        category: "JavaScript"
      },
      errors: { title: '', authorId: '', category: '', length: '' }
  };

  let wrapper = shallow(<CourseForm {...props} />);

  it('should render the CourseForm contents', () => {
    expect(wrapper.find('form').at(0).length).toEqual(1);
    expect(wrapper.find('h1').at(0).text()).toEqual('Manage Course');
    expect(wrapper.find('TextInput').at(0).length).toEqual(1);
    expect(wrapper.find('TextInput').at(1).length).toEqual(1);
    expect(wrapper.find('TextInput').at(0).props().name).toEqual('title');
    expect(wrapper.find('TextInput').at(1).props().name).toEqual('category');
    expect(wrapper.find('[type="submit"]').at(0).props().value).toEqual('Save');
    expect(wrapper.find('[type="submit"]').length).toEqual(1);
  });

  it('should display "saving..." when the submit button is clicked', () => {
    props.saving = true;
    wrapper = shallow(<CourseForm {...props} />);
    expect(wrapper.find('[type="submit"]').at(0).props().value).toEqual('Saving...');
  });
});