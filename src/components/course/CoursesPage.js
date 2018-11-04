import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import swal from 'sweetalert';
import toastr from 'toastr';
import * as courseActions from '../../actions/courseActions';
import CourseList from './CourseList';


class CoursesPage extends React.Component {
  constructor(props,  context) {
    super(props, context);

    this.redirectToAddCoursePage = this.redirectToAddCoursePage.bind(this);
    this.deleteCourse = this.deleteCourse.bind(this);
  }

  redirectToAddCoursePage() {
    browserHistory.push('/course');
  }

  deleteCourse(courseId, title) {
    const confirm = swal(`Do you want to remove ${title}?`, {
      buttons: { cancel: true, confirm: true }
    });
    confirm.then((response) => {
      if (response) {
        this.props.actions.deleteCourse(courseId)
          .then(() => {
            toastr.success("Course Removed");
          })
          .catch(error => {
            toastr.error(error);
        });
      }
    });
  }

  render() {
    const { courses } = this.props;
    return (
      <div>
        <h1>Courses</h1>
        <input 
          type="submit"
          value="Add Course"
          className="btn btn-primary"
          onClick={this.redirectToAddCoursePage} />
        <CourseList deleteCourse={this.deleteCourse} courses={courses} />
      </div>
    );
  }
}

CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    courses: state.courses
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);