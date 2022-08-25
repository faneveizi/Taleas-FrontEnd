import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link  } from "react-router-dom";
import {Auth} from 'aws-amplify'
const Books = () => {
const [users, setUsers] = useState([]);
  useEffect(() => {
    loadUsers();
  }, []);
const loadUsers = async () => {
  const user = await Auth.currentAuthenticatedUser()
  const token = user.signInUserSession.idToken.jwtToken
  const requestInfo = {
    headers: {
      Authorization: token
    }
  }
const result = await axios.get("https://b2yuir9sq5.execute-api.eu-central-1.amazonaws.com/dev/books", requestInfo);
setUsers(result.data);
};

const deleteUser = async _id => {
  const user = await Auth.currentAuthenticatedUser()
  const token = user.signInUserSession.idToken.jwtToken
  const requestInfo = {
    headers: {
      Authorization: token
    }
  }
await axios.delete(`https://b2yuir9sq5.execute-api.eu-central-1.amazonaws.com/dev/books/delete/${_id}`, requestInfo);
loadUsers();
};
  return (
    <div classnamename="container">
      <div classnamename="py-4">
        <table className="table border-shadow">
          <thead className="thead-info">
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
              <tr key ={index}>
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
                    to={'/books'}
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
