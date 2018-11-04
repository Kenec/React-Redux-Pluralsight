/* global expect */
import * as types from '../../src/actions/actionTypes';
import { beginAjaxCall, ajaxCallError } from '../../src/actions/ajaxStatusActions';

describe('AjaxStatus Actions:', () => {

  describe('BeginAjax call', () => {
    it('should create BEGIN_AJAX_CALL action', () => {
      expect(beginAjaxCall()).toEqual({ type: types.BEGIN_AJAX_CALL })
    });
  });

  describe('ajaxCallError call', () => {
    it('should create AJAX_CALL_ERROR action', () => {
      expect(ajaxCallError()).toEqual({ type: types.AJAX_CALL_ERROR })
    });
  });
});