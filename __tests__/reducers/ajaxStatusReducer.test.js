/* global expect */
import ajaxStatus from '../../src/reducers/ajaxStatusReducer';
import * as types from '../../src/actions/actionTypes';
const state = {};

describe('ajaxStatus reducers:', () => {
  describe('BEGIN_AJAX_CALL', () => {
    it('should increase the ajax call prgress', () => {
      const action = {
        type: types.BEGIN_AJAX_CALL
      };
      expect(ajaxStatus(state, action)).toEqual(state + 1);
    });

    it('should decrease the ajax call when an error is encountered', () => {
      const action = {
        type: types.AJAX_CALL_ERROR
      };
      expect(ajaxStatus(state, action)).toEqual(state - 1);
    }); 

    it('should decreas an ajax call when the action creator is successful', () => {
      const action = {
        type: types.CREATE_AUTHORS_SUCCESS
      };
      expect(ajaxStatus(state, action)).toEqual(state - 1);
    });

    it('should return the current state if no action is fired', () => {
      const action = {
        type: ''
      };
      expect(ajaxStatus(state, action)).toEqual(state);
    });
  });
});
