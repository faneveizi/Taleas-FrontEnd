import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link  } from "react-router-dom";
import {Auth } from 'aws-amplify'

const Home = () => {
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
const result = await axios.get("https://b2yuir9sq5.execute-api.eu-central-1.amazonaws.com/dev/authors", requestInfo);
setUsers(result.data);
console.log(token)
};

const deleteUser = async _id => {
  const user = await Auth.currentAuthenticatedUser()
  const token = user.signInUserSession.idToken.jwtToken
  const requestInfo = {
    headers: {
      Authorization: token
    }
  }
await axios.delete(`https://b2yuir9sq5.execute-api.eu-central-1.amazonaws.com/dev/authors/delete/${_id}`, requestInfo);
loadUsers();
};
  return (
    <div classnamename="container">
      <div classnamename="py-4">
        <table className="table border-shadow">
          <thead className="thead-info">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Age</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key ={index}>
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
                    to={'/'}
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
