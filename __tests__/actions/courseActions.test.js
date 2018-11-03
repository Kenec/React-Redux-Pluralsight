/* global expect */
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as types from '../../src/actions/actionTypes';
import * as courseActions from '../../src/actions/courseActions';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
describe('Course Actions:', () => {
  const courses = [
    {
      id: "react-flux-building-applications",
      title: "Building Applications in React and Flux",
      watchHref: "http://www.pluralsight.com/courses/react-flux-building-applications",
      authorId: "cory-house",
      length: "5:08",
      category: "JavaScript"
    },
    {
      id: "clean-code",
      title: "Clean Code: Writing Code for Humans",
      watchHref: "http://www.pluralsight.com/courses/writing-clean-code-humans",
      authorId: "cory-house",
      length: "3:10",
      category: "Software Practices"
    },
    {
      id: "architecture",
      title: "Architecting Applications for the Real World",
      watchHref: "http://www.pluralsight.com/courses/architecting-applications-dotnet",
      authorId: "cory-house",
      length: "2:52",
      category: "Software Architecture"
    },
    {
      id: "career-reboot-for-developer-mind",
      title: "Becoming an Outlier: Reprogramming the Developer Mind",
      watchHref: "http://www.pluralsight.com/courses/career-reboot-for-developer-mind",
      authorId: "cory-house",
      length: "2:30",
      category: "Career"
    },
    {
      id: "web-components-shadow-dom",
      title: "Web Component Fundamentals",
      watchHref: "http://www.pluralsight.com/courses/web-components-shadow-dom",
      authorId: "cory-house",
      length: "5:10",
      category: "HTML5"
    }
  ];

  describe('loadCoursesSuccess call', () => {
    it('should create LOAD_COURSES_SUCCESS action', () => {
      expect(courseActions.loadCoursesSuccess(courses))
        .toEqual({ type: types.LOAD_COURSES_SUCCESS, courses });
    });
  });

  describe('createCourseSuccess call', () => {
    it('should create CREATE_COURSES_SUCCESS action', () => {
      const course = { id: 3, name: 'Vue' };
      expect(courseActions.createCourseSuccess(course))
        .toEqual({ type: types.CREATE_COURSES_SUCCESS, course });
    });
  });

  describe('updateCourseSuccess call', () => {
    it('should create UPDATE_COURSES_SUCCESS action', () => {
      const course = { id: 1, name: 'Create React' };
      expect(courseActions.updateCourseSuccess(course))
        .toEqual({ type: types.UPDATE_COURSES_SUCCESS, course });
    });
  });

  describe('deleteCourseSuccess call', () => {
    it('should create DELETE_COURSES_SUCCESS action', () => {
      const course = { id: 1, name: 'Create React' };
      expect(courseActions.updateCourseSuccess(course.id))
        .toEqual({ type: types.UPDATE_COURSES_SUCCESS, course: course.id });
    });
  });

  describe('courseErrors call', () => {
    it('should create COURSE_ERROR action', () => {
      const error = 'This is a demo error';
      expect(courseActions.courseErrors(error))
        .toEqual({ type: types.COURSE_ERROR, error });
    });
  });

  describe('loadCourses call', () => {
    const store = mockStore({});
    it('should get all courses from the database', () => {
      return store.dispatch(courseActions.loadCourses())
        .then(() => {
          expect(store.getActions())
            .toEqual([
              { type: 'BEGIN_AJAX_CALL' },
              { type: 'LOAD_COURSES_SUCCESS',courses }
            ]);
        });
    });
  });

  describe('saveOrUpdateCourse call', () => {
    const store = mockStore({});
    let course = { 
      title: "test",
      watchHref: "test.com",
      authorId: "cory-house",
      length: "5:08",
      category: "JavaScript" 
    };
    it('should save new course to the database', () => {
      return store.dispatch(courseActions.saveOrUpdateCourse(course))
        .then(() => {
          expect(store.getActions())
            .toEqual([
              { type: 'BEGIN_AJAX_CALL' },
              { type: 'CREATE_COURSES_SUCCESS',
                course:
                 { title: 'test',
                   watchHref: 'http://www.pluralsight.com/courses/test',
                   authorId: 'cory-house',
                   length: '5:08',
                   category: 'JavaScript',
                   id: 'test' } }
            ]);
        });
    });

    it('should update existing course with an id', () => {
      let updateCourse = { 
        id: "react-flux-building-applications",
        title: "Building Applications in React and Flux",
        watchHref: "http://www.pluralsight.com/courses/react-flux-building-applications",
        authorId: "cory-house",
        length: "5:08",
        category: "JavaScript" 
      };
      return store.dispatch(courseActions.saveOrUpdateCourse(updateCourse))
        .then(() => {
          expect(store.getActions())
            .toEqual([
              { type: 'BEGIN_AJAX_CALL' },
              { type: 'CREATE_COURSES_SUCCESS',
                course:
                 { title: 'test',
                   watchHref: 'http://www.pluralsight.com/courses/test',
                   authorId: 'cory-house',
                   length: '5:08',
                   category: 'JavaScript',
                   id: 'test' } },
              { type: 'BEGIN_AJAX_CALL' },
              { type: 'UPDATE_COURSES_SUCCESS',
                course:
                 { id: 'react-flux-building-applications',
                   title: 'Building Applications in React and Flux',
                   watchHref:
                    'http://www.pluralsight.com/courses/react-flux-building-applications',
                   authorId: 'cory-house',
                   length: '5:08',
                   category: 'JavaScript' } }
            ]);
        });
    });
  });

  describe('deleteCourse call', () => {
    const store = mockStore({});
    const courseId = "react-flux-building-applications";
    it('should remove course from the database', () => {
      return store.dispatch(courseActions.deleteCourse(courseId))
        .then(() => {
          expect(store.getActions())
            .toEqual([
              { type: 'BEGIN_AJAX_CALL' },
              { type: 'DELETE_COURSES_SUCCESS',
                courseId: 'react-flux-building-applications' }
            ]);
        });
    });
  });
});