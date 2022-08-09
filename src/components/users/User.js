import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

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
    const res = await axios.get(`https://6b2t29rnm6.execute-api.us-east-1.amazonaws.com/dev/authors/${id}`);
    setUser(res.data);
  };
  return (
      <div className="container py-4">
        <Link className="btn btn-primary" to="/">
          back to Home
        </Link>
        <h1 className="display-4">Author ID: {id}</h1>
        <hr />
        <ul className="list-group w-50">
          <li className="list-group-item">Author name: {user.name}</li>
          <li className="list-group-item">Author age: {user.age}</li>
          <li className="list-group-item">Author Books:</li>
          <li class="list-group-item list-group-item-warning">{ user.books.map((book) => (
            <div><h2>Title : {book.title}</h2></div>
              ))}</li>
        </ul>  
      </div>
  );
};

export default User;
