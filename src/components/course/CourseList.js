import React from 'react';
import PropTypes from 'prop-types';
import CourseListRow from './CourseListRow';

const CourseList = ({ courses, deleteCourse }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>&nbsp;</th>
          <th>Title</th>
          <th>Author</th>
          <th>Category</th>
          <th>Length</th>
          <th>&nbsp;</th>
        </tr>
      </thead>
      <tbody>
        {
          courses.map(course =>
            <CourseListRow deleteCourse={deleteCourse} key={course.id} course={course} />
          )
        }
      </tbody>
    </table>
  );
};

CourseList.propTypes = {
  courses: PropTypes.array.isRequired,
  deleteCourse: PropTypes.func.isRequired
};

export default CourseList;