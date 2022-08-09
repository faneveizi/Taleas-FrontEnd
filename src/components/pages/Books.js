import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link  } from "react-router-dom";
const Books = () => {
const [users, setUsers] = useState([]);
  useEffect(() => {
    loadUsers();
  }, []);
const loadUsers = async () => {
const result = await axios.get("https://6b2t29rnm6.execute-api.us-east-1.amazonaws.com/dev/books");
setUsers(result.data);
};

const deleteUser = async _id => {
await axios.delete(`https://6b2t29rnm6.execute-api.us-east-1.amazonaws.com/dev/books/delete/${_id}`);
loadUsers();
};
  return (
    <div classNameName="container">
      <div classNameName="py-4">
        <table className="table table-hover">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th scope="col">ISBN</th>
              <th scope="col">Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr>
                <th scope="row">{index + 1}</th> 
                <td>{user.title}</td>
                <td>{user.ISBN}</td>
                <td>{user.price}</td>
                <td>
                  <Link className="btn btn-primary mr-2" to={`/books/${user._id}`}>
                    View
                  </Link>
                  <Link
                    className="btn btn-warning"
                    to={`/books/edit/${user._id}`}
                  >
                    Edit
                  </Link>
                  <Link
                    className="btn btn-danger"
                    onClick={() => deleteUser(user._id)}
                  >
                    Delete

                  </Link> 
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Books;
