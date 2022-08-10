import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const Book = () => {
  const [books, setBooks] = useState([]);
  const {id} = useParams();
  useEffect(() => {
    loadBooks();
    // eslint-disable-next-line
  }, []);
  const loadBooks = async () => {
    const res = await axios.get(`https://yoib2xopu2.execute-api.eu-central-1.amazonaws.com/dev/books/${id}`);
    setBooks(res.data);
  };
  console.log(books.title)
  return (
    <div className="container py-4">
      <Link className="btn btn-primary" to="/books">
        back to Home
      </Link>
      <h1 className="display-4">Book ID: {id}</h1>
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
