/* global expect */
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as types from '../../src/actions/actionTypes';
import * as authorActions from '../../src/actions/authorActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
describe('Author Actions:', () => {
  const authors = [
    { "firstName": "Cory", "id": "cory-house", "lastName": "House" },
    { "firstName": "Scott", "id": "scott-allen", "lastName": "Allen" },
    { "firstName": "Dan", "id": "dan-wahlin", "lastName": "Wahlin" }
  ];

  describe('loadAuthorSuccess call', () => {
    it('should create LOAD_AUTHORS_SUCCESS action', () => {
      expect(authorActions.loadAuthorSuccess(authors))
        .toEqual({ type: types.LOAD_AUTHORS_SUCCESS, authors });
    });
  });

  describe('createAuthorSuccess call', () => {
    it('should create CREATE_AUTHORS_SUCCESS action', () => {
      const author = { id: 3, name: 'Chiboy' };
      expect(authorActions.createAuthorSuccess(author))
        .toEqual({ type: types.CREATE_AUTHORS_SUCCESS, author });
    });
  });

  describe('updateAuthorSuccess call', () => {
    it('should create UPDATE_AUTHORS_SUCCESS action', () => {
      const author = { id: 1, name: 'Kene' };
      expect(authorActions.updateAuthorSuccess(author))
        .toEqual({ type: types.UPDATE_AUTHORS_SUCCESS, author });
    });
  });

  describe('deleteAuthorSuccess call', () => {
    it('should create DELETE_AUTHORS_SUCCESS action', () => {
      const author = { id: 1, name: 'Kene' };
      expect(authorActions.deleteAuthorSuccess(author.id))
        .toEqual({ type: types.DELETE_AUTHORS_SUCCESS, authorId: author.id });
    });
  });

  describe('authorErrors call', () => {
    it('should create AUTHOR_ERROR action', () => {
      const error = 'This is a demo error';
      expect(authorActions.authorErrors(error))
        .toEqual({ type: types.AUTHOR_ERROR, error });
    });
  });

  describe('loadAuthors call', () => {
    const store = mockStore({});
    it('should get all author from the database', () => {
      return store.dispatch(authorActions.loadAuthors())
        .then(() => {
          expect(store.getActions())
            .toEqual([
              { type: 'BEGIN_AJAX_CALL' },
              { type: 'LOAD_AUTHORS_SUCCESS',authors }
            ]);
        });
    });
  });

  describe('saveOrUpdateAuthor call', () => {
    const store = mockStore({});
    let author = { "firstName": "Kenechukwu", "lastName": "Nnamani" };
    it('should save new author to the database', () => {
      return store.dispatch(authorActions.saveOrUpdateAuthor(author))
        .then(() => {
          expect(store.getActions())
            .toEqual([
              { type: 'BEGIN_AJAX_CALL' },
              { type: 'CREATE_AUTHORS_SUCCESS',
                author:
                 { firstName: 'Kenechukwu',
                   lastName: 'Nnamani',
                   id: 'kenechukwu-nnamani' } }
            ]);
        });
    });

    it('should update existing author with an id', () => {
      let updateAuthor = { "firstName": "Charles", id: 'kenechukwu-nnamani', "lastName": "Nnamani" }
      return store.dispatch(authorActions.saveOrUpdateAuthor(updateAuthor))
        .then(() => {
          expect(store.getActions())
            .toEqual([
              { type: 'BEGIN_AJAX_CALL' },
              { type: 'CREATE_AUTHORS_SUCCESS',
                author:
                 { firstName: 'Kenechukwu',
                   lastName: 'Nnamani',
                   id: 'kenechukwu-nnamani' } },
              { type: 'BEGIN_AJAX_CALL' },
              { type: 'UPDATE_AUTHORS_SUCCESS',
                author:
                 { firstName: 'Charles',
                   id: 'kenechukwu-nnamani',
                   lastName: 'Nnamani' } }
            ]);
        });
    });
  });

  describe('deleteAuthor call', () => {
    const store = mockStore({});
    const authorId = "dan-wahlin";
    it('should remove author from the database', () => {
      return store.dispatch(authorActions.deleteAuthor(authorId))
        .then(() => {
          expect(store.getActions())
            .toEqual([
              { type: 'BEGIN_AJAX_CALL' },
              { type: 'DELETE_AUTHORS_SUCCESS', authorId: 'dan-wahlin' }
            ]);
        });
    });
  });
});