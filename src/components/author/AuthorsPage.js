import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import { browserHistory } from 'react-router';
import swal from 'sweetalert';
import * as authorActions from '../../actions/authorActions';
import AuthorList from './AuthorList';

export class AuthorsPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.redirectToAddAuthor = this.redirectToAddAuthor.bind(this);
    this.deleteAuthor = this.deleteAuthor.bind(this);
  }

  redirectToAddAuthor() {
    browserHistory.push('/author');
  }

  deleteAuthor (authorId, authorName) {
    const confirm = swal(`Do you want to remove ${authorName}?`, {
      buttons: { cancel: true, confirm: true }
    });
    confirm.then((response) => {
      if (response) {
        this.removeAuthor(authorId, authorName);
      }
    });
  }

  removeAuthor(authorId, authorName) {
    let hasBooks = this.props.courses
      .filter(course => course.authorId === authorId)
      .length > 0;
    if (hasBooks === false) {
        this.props.actions.deleteAuthor(authorId)
        .then(() => {
          toastr.success("Author Removed");
        })
        .catch(error => {
          toastr.error(error);
        });
    } else {
       return swal('Failure', authorName + ' cannot be removed because he has a book', 'error');
    }
  }

  render() {
    const { authors } = this.props;
    return (
      <div>
        <h1>Authors</h1>
        <input
          type="submit"
          value="Add Author"
          className="btn btn-primary"
          onClick={this.redirectToAddAuthor} />
        <AuthorList deleteAuthor={this.deleteAuthor} authors={authors}/>
      </div>
    );
  }
}

AuthorsPage.propTypes = {
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    authors: state.authors,
    courses: state.courses
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(authorActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthorsPage);