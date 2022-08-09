import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link  } from "react-router-dom";

const Home = () => {
const [users, setUsers] = useState([]);
  useEffect(() => {
    loadUsers();
  }, []);
const loadUsers = async () => {
const result = await axios.get("https://6b2t29rnm6.execute-api.us-east-1.amazonaws.com/dev/authors");
setUsers(result.data);
};

const deleteUser = async _id => {
await axios.delete(`https://6b2t29rnm6.execute-api.us-east-1.amazonaws.com/dev/authors/delete/${_id}`);
loadUsers();
};
  return (
    <div classNameName="container">
      <div classNameName="py-4">
        <table className="table border shadow">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Age</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.age}</td>
                <td>
                  <Link className="btn btn-primary mr-2" to={`/users/${user._id}`}>
                    View
                  </Link>
                  <Link
                    className="btn btn-warning"
                    to={`/users/edit/${user._id}`}
                  >
                    Edit
                  </Link>
                  <Link
                    className="btn btn-danger"
                    onClick={() => deleteUser(user._id)}
                  >
                    Delete

                  </Link>
                  <Link
                    className="btn btn-success"
                    to={`/books/add/${user._id}`}
                  >
                    Add book
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

export default Home;
