/* global expect */
import authorReducer from '../../src/reducers/authorReducer';
import * as types from '../../src/actions/actionTypes';

const state = [{ id: 1, name: 'Kene' }, { id: 2, name: 'Nzube' }];

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
        author: { id: 3, name: 'Paul' }
      };
      expect(authorReducer(state, action))
      .toEqual([ {"id": 1, "name": "Kene"}, {"id": 2, "name": "Nzube"}, {"id": 3, "name": "Paul"} ]);
    });
  });

  describe('UPDATE_AUTHORS_SUCCESS', () => {
    it('should update the author in the store', () => {
      const action = {
        type: types.UPDATE_AUTHORS_SUCCESS,
        author: { id: 1, name: 'Kenec' }
      };
      expect(authorReducer(state, action)).toEqual([ {"id": 2, "name": "Nzube"}, {"id": 1, "name": "Kenec"} ]);
    });
  });

  describe('DELETE_AUTHORS_SUCCESS', () => {
    it('should remove the author in the store', () => {
      const action = {
        type: types.DELETE_AUTHORS_SUCCESS,
        authorId: 1
      };
      expect(authorReducer(state, action)).toEqual([ { id: 2, name: 'Nzube' } ]);
    });
  });

  describe('AUTHOR_ERROR', () => {
    it('should add author error to the store', () => {
      const action = {
        type: types.AUTHOR_ERROR,
        error: 'Author Name cannot be empty'
      };
      expect(authorReducer(state, action)).toEqual('Author Name cannot be empty');
    });
  });

  describe('Author Reducer', () => {
    it('should return state if no action is received', () => {
      const action = {
        type: ''
      };
      expect(authorReducer(state, action)).toEqual(state);
    });
  });
});
