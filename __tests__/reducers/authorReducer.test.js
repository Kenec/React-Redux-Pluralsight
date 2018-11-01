/* global expect */
import authorReducer from '../../src/reducers/authorReducer';
import * as types from '../../src/actions/actionTypes';
const state = {};

describe('author reducers:', () => {
  describe('LOAD_AUTHORS_SUCCESS', () => {
    it('should return all authors in the store', () => {
      const action = {
        type: types.LOAD_AUTHORS_SUCCESS,
        authors: ['Kene', 'Nzube']
      };
      expect(authorReducer(state, action)).toEqual(action.authors);
    });
  });

  describe('CREATE_AUTHORS_SUCCESS', () => {
    it('should add newly created authors to the store', () => {
      const action = {
        type: types.CREATE_AUTHORS_SUCCESS,
        author: { name: 'Kene' }
      };
      expect(authorReducer(state, action)).toEqual([ action.author ]);
    });
  });
});
