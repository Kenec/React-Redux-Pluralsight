import * as types from './actionTypes';
import authorApi from '../api/mockAuthorApi';
import { beginAjaxCall, ajaxCallError } from './ajaxStatusActions';

export function loadAuthorSuccess(authors) {
  return { type: types.LOAD_AUTHORS_SUCCESS, authors };
}

export function createAuthorSuccess(author) {
  return { type: types.CREATE_AUTHORS_SUCCESS, author };
}

export function updateAuthorSuccess(author) {
  return { type: types.UPDATE_AUTHORS_SUCCESS, author };
}

export function deleteAuthorSuccess(authorId) {
  return { type: types.DELETE_AUTHORS_SUCCESS, authorId };
}

export function authorErrors(error) {
  return { type: types.AUTHOR_ERROR, error };
}

export function loadAuthors() {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    return authorApi.getAllAuthors().then(authors => {
      dispatch(loadAuthorSuccess(authors));
    }).catch(error => {
      dispatch(authorErrors(error));
      throw(error);
    });
  };
}

export function saveOrUpdateAuthor(author) {
  return function(dispatch, getState) {
    dispatch(beginAjaxCall());
    return authorApi.saveAuthor(author).then(savedAuthor => {
      author.id ? dispatch(updateAuthorSuccess(savedAuthor)) :
        dispatch(createAuthorSuccess(savedAuthor));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}

export function deleteAuthor(authorId) {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    return authorApi.deleteAuthor(authorId).then(() => {
      dispatch(deleteAuthorSuccess(authorId));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}