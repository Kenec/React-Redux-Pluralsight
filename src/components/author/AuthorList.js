import React from 'react'; 
import PropTypes from 'prop-types';
import AuthorListRow from './AuthorListRow';

const AuthorList = ({ authors, deleteAuthor }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>FirstName</th>
          <th>LastName</th>
          <th>&nbsp;</th>
          <th>&nbsp;</th>
        </tr>
      </thead>
      <tbody>
        {
          authors.map(author =>
            <AuthorListRow deleteAuthor={deleteAuthor} key={author.id} author={author} />
          )
        }
      </tbody>
    </table>
  );
};

AuthorList.propTypes = {
  authors: PropTypes.array.isRequired,
  deleteAuthor: PropTypes.func.isRequired
};

export default AuthorList;