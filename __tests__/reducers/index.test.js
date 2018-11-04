/* global expect */
import { createStore } from 'redux';
import rootReducer from '../../src/reducers';

let store = createStore(rootReducer);

describe('root reducer', () => {
  it('should contain course reducer', () => {
    expect(store.getState().courses).toEqual([]);
  });

  it('should contain author reducer', () => {
    expect(store.getState().authors).toEqual([]);
  });

  it('should contain ajaxCallsInProgress reducer', () => {
    expect(store.getState().ajaxCallsInProgress).toEqual(0);
  });
});