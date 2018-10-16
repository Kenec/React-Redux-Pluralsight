import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authorActions from '../../actions/authorActions';
import AuthorForm from './AuthorForm';
import toastr from 'toastr';

class ManageAuthorPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      author: Object.assign({}, this.props.author),
      errors: {},
      saving: false
    };

    this.updateAuthorState = this.updateAuthorState.bind(this);
    this.saveAuthor = this.saveAuthor.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.author.id !== nextProps.author.id) {
      this.setState({ author: Object.assign({}, nextProps.author) });
    }
  }

  authorFormIsValid() {
    let formIsValid = true;
    let errors = {};

    if (this.state.author.firstName.length < 1) {
      errors.firstName = 'FirstName Must be at least 1 characters';
      formIsValid = false;
    }

    if (this.state.author.lastName.length < 1) {
      errors.lastName = 'LastName Must be at least 1 characters';
      formIsValid = false;
    }

    this.setState({ errors });
    return formIsValid;
  }

  saveAuthor(event) {
    event.preventDefault();
    if (!this.authorFormIsValid()) {
      return;
    }
    this.setState({ saving: true });
    this.props.actions.saveAuthor(this.state.author)
    .then(() => { 
      toastr.success("Author Saved");
      this.redirect();
    })
    .catch(error => {
      toastr.error(error);
      this.setState({ saving: false});
    });
  }

  redirect() {
    this.setState({ saving: false});
    this.context.router.push('/authors');
  }

  updateAuthorState(event) {
    const field = event.target.name;
    let author = Object.assign({}, this.state.author);
    author[field] = event.target.value;

    return this.setState({ author });
  }

  render() {
    return (
      <div>
        <AuthorForm
          onChange={this.updateAuthorState}
          author={this.state.author}
          saving={this.state.saving}
          onSave={this.saveAuthor}
          errors={this.state.errors} />
      </div>
    );
  }
}

ManageAuthorPage.propTypes = {
  author: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

ManageAuthorPage.contextTypes = {
  router: PropTypes.object
};

function getAuthorById(authors, id) {
  const author = authors.filter(author => author.id == id);
  if (author.length) return author[0];
  return null;
}

function mapStateToProps(state, ownProps) {
  const authorId = ownProps.params.id;

  let author = { id: '', firstName: '', lastName: '' };

  if (authorId && state.authors.length > 0) {
    author = getAuthorById(state.authors, authorId);
  }
  return {
    author: author
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(authorActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageAuthorPage);