import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import * as courseActions from '../../actions/courseActions';
import CourseForm from './CourseForm';

class ManageCoursePage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      course: Object.assign({}, this.props.course),
      errors: {},
      saving: false
    };

    this.updateCourseState = this.updateCourseState.bind(this);
    this.saveCourse = this.saveCourse.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.course.id !== nextProps.course.id) {
      this.setState({ course: Object.assign({}, nextProps.course) });
    }
  }

  updateCourseState(event) {
    const field = event.target.name;
    let course = Object.assign({}, this.state.course);
    course[field] = event.target.value;

    return this.setState({ course });
  }

  courseFormIsValid() {
    let formIsValid = true;
    let errors = {};

    if (this.state.course.title.length < 5) {
      errors.title = 'TItle Must be at least 5 characters';
      formIsValid = false;
    }

    this.setState({ errors });
    return formIsValid;
  }

  saveCourse(event) {
    event.preventDefault();
    if (!this.courseFormIsValid()) {
      return;
    }
    this.setState({ saving: true});
    this.props.actions.saveCourse(this.state.course)
      .then(() => { 
        toastr.success("Course Saved");
        this.redirect();
      })
      .catch(error => {
        toastr.error(error);
        this.setState({ saving: false});
      });
  }

  redirect() {
    this.setState({ saving: false});
    this.context.router.push('/courses');
  }

  render() {
    return (
      <div>
        <CourseForm
          onChange={this.updateCourseState}
          allAuthors={this.props.authors}
          course={this.state.course}
          saving={this.state.saving}
          onSave={this.saveCourse}
          errors={this.state.errors} />
      </div>
    );
  }
}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

ManageCoursePage.contextTypes = {
  router: PropTypes.object
};

function getCourseById(courses, id) {
  const course = courses.filter(course => course.id == id);
  if (course.length) return course[0];
  return null;
}

function mapStateToProps(state, ownProps) {
  const courseId = ownProps.params.id; // This is gotten from the course/:id route

  let course = {id:'', watchHref: '', title: '', authorId: '', length: '', category: ''};
  
  if (courseId && state.courses.length > 0) {
    course = getCourseById(state.courses, courseId);
  }

  const authorFormattedForDropdown = state.authors.map(author => {
    return {
      value: author.id,
      text: author.firstName + ' ' + author.lastName
    };
  });

  return {
    course: course,
    authors: authorFormattedForDropdown
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);