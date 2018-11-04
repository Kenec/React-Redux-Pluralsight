/* global expect */
import React from 'react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { App } from '../../src/components/App';


function childComponent(){
  return (<h1>Home</h1>);
}

describe('<App />', () => {
  const props = {
    loading: false
  };

  const initialState = {
    loading: props.loading
  };
  const mockStore = configureStore();
  const store = mockStore(initialState);

  let wrapper = mount(<App store={store} {...props}/>);
  it('should render the App contents', () => {
    // expect(wrapper.find('h1').text()).toEqual('Demo Admin');
    // expect(wrapper.find('p').text()).toEqual('Sample React Redux Demo App');
    // expect(wrapper.find('Link').props().to).toEqual('about');
    // console.log(wrapper.props());
  });
});