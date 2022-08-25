import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import {Auth} from 'aws-amplify'

const Book = () => {
  const [books, setBooks] = useState([]);
  const {id} = useParams();
  useEffect(() => {
    loadBooks();
    // eslint-disable-next-line
  }, []);
  const loadBooks = async () => {
    const user = await Auth.currentAuthenticatedUser()
    const token = user.signInUserSession.idToken.jwtToken
    const requestInfo = {
      headers: {
        Authorization: token
    }
  }
    const res = await axios.get(`https://b2yuir9sq5.execute-api.eu-central-1.amazonaws.com/dev/books/${id}`, requestInfo);
    setBooks(res.data);
  };
  return (
    <div className="container py-4">
      <Link className="btn btn-primary" to="/books">
        back to Home
      </Link>
      <hr />
      <ul className="list-group w-50">
        <li className="list-group-item">Book title: {books.title}</li>
        <li className="list-group-item">Book ISBN: {books.ISBN}</li>
        <li className="list-group-item">Book price: {books.price}</li>
      </ul>
    </div>
  );
};

export default Book;
