/* global expect */
import courseReducer from '../../src/reducers/courseReducer';
import * as types from '../../src/actions/actionTypes';

const state = [{ id: 1, name: 'React' }, { id: 2, name: 'Redux' }];

describe('course reducers:', () => {
  describe('LOAD_COURSES_SUCCESS', () => {
    it('should return all courses in the store', () => {
      const action = {
        type: types.LOAD_COURSES_SUCCESS,
        courses: state
      };
      expect(courseReducer(state, action)).toEqual(state);
    });
  });

  describe('CREATE_COURSES_SUCCESS', () => {
    it('should add newly created course to the store', () => {
      const action = {
        type: types.CREATE_COURSES_SUCCESS,
        course: { id: 3, name: 'Vue' }
      };
      expect(courseReducer(state, action))
      .toEqual([ { id: 1, name: 'React' }, { id: 2, name: 'Redux' }, { id: 3, name: 'Vue' } ]);
    });
  });

  describe('UPDATE_COURSES_SUCCESS', () => {
    it('should update the course in the store', () => {
      const action = {
        type: types.UPDATE_COURSES_SUCCESS,
        course: { id: 1, name: 'Create React' }
      };
      expect(courseReducer(state, action)).toEqual([ {"id": 2, "name": "Redux"}, {"id": 1, "name": "Create React"} ]);
    });
  });

  describe('DELETE_COURSES_SUCCESS', () => {
    it('should remove the course in the store', () => {
      const action = {
        type: types.DELETE_COURSES_SUCCESS,
        courseId: 1
      };
      expect(courseReducer(state, action)).toEqual([ { id: 2, name: 'Redux' } ]);
    });
  });

  describe('COURSE_ERROR', () => {
    it('should add course error to the store', () => {
      const action = {
        type: types.COURSE_ERROR,
        error: 'Course Name cannot be empty'
      };
      expect(courseReducer(state, action)).toEqual('Course Name cannot be empty');
    });
  });

  describe('Course Reducer', () => {
    it('should return state if no action is received', () => {
      const action = {
        type: ''
      };
      expect(courseReducer(state, action)).toEqual(state);
    });
  });
});
