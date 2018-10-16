import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const AuthorListRow = ({ author, deleteAuthor }) => {
  return (
        <tr>
          <td>{author.firstName}</td>
          <td>{author.lastName}</td>
          <td></td>
          <td>
            <Link to={'/author/' + author.id}>
              <button className="btn btn-primary">Edit</button>
            </Link>
            &nbsp;&nbsp;
            <button onClick={() => deleteAuthor(author.id, author.firstName)} className="btn btn-danger">Delete</button>
          </td>
        </tr>
   );
};

AuthorListRow.propTypes = {
  author: PropTypes.object.isRequired,
  deleteAuthor: PropTypes.func.isRequired
};

export default AuthorListRow;