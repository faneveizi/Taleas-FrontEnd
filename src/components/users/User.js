import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import {Auth} from 'aws-amplify'

const User = () => {
  const [user, setUser] = useState({
    name: "",
    age: "",
    books:[]
  });
  const {id} = useParams();
  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);
  const loadUser = async () => {
    const user = await Auth.currentAuthenticatedUser()
    const token = user.signInUserSession.idToken.jwtToken
    const requestInfo = {
      headers: {
        Authorization: token
    }
  }
    const res = await axios.get(`https://yoib2xopu2.execute-api.eu-central-1.amazonaws.com/dev/authors/${id}`, requestInfo);
    setUser(res.data);
  };
  return (
      <div className="container py-4">
        <Link className="btn btn-primary" to="/">
          back to Home
        </Link>
        <hr />
        <ul className="list-group w-50">
          <li className="list-group-item">Author name: {user.name}</li>
          <li className="list-group-item">Author age: {user.age}</li>
          <li className="list-group-item">Author Books:</li>
          <li className="list-group-item list-group-item-warning">{ user.books.map((book) => (
            <div key ={book.title}>
              <h2>Title : {book.title}</h2>
              </div>
              ))}</li>
        </ul>  
      </div>
  );
};

export default User;
