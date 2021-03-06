import * as types from './actionTypes';
import courseApi from '../api/mockCourseApi';
import { beginAjaxCall, ajaxCallError } from './ajaxStatusActions';

export function loadCoursesSuccess(courses) {
  return { type: types.LOAD_COURSES_SUCCESS, courses };
}

export function createCourseSuccess(course) {
  return { type: types.CREATE_COURSES_SUCCESS, course };
}

export function updateCourseSuccess(course) {
  return { type: types.UPDATE_COURSES_SUCCESS, course };
}

export function deleteCourseSuccess(courseId) {
  return { type: types.DELETE_COURSES_SUCCESS, courseId };
}

export function courseErrors(error) {
  return { type: types.COURSE_ERROR, error };
}

export function loadCourses() {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    return courseApi.getAllCourses().then(courses => {
      dispatch(loadCoursesSuccess(courses));
    }).catch(error => {
      dispatch(courseErrors(error));
      // throw(error);
    });
  };
}

export function saveOrUpdateCourse(course) {
  return function(dispatch, getState) {
    dispatch(beginAjaxCall());
    return courseApi.saveCourse(course).then(savedCourse => {
      course.id ? dispatch(updateCourseSuccess(savedCourse)) :
        dispatch(createCourseSuccess(savedCourse));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      // throw(error);
    });
  };
}

export function deleteCourse(courseId) {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    return courseApi.deleteCourse(courseId).then(() => {
      dispatch(deleteCourseSuccess(courseId));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      // throw(error);
    });
  };
}