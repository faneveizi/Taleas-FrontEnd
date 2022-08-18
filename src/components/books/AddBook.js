import React, { useState } from "react";
import axios from 'axios';
import { useHistory, useParams } from "react-router-dom";
import {Auth} from 'aws-amplify'

const AddBook = () => {
  let history = useHistory();
  const [books, setBooks] = useState([]
  );
  const {title, ISBN, price} = books;
  const onInputChange = e => {
    setBooks({ ...books, title: e.target.value});
  };
  const onInputChange2 = e => {
    setBooks({ ...books, ISBN: e.target.value});
  };
  const onInputChange3 = e => {
    setBooks({ ...books, price: e.target.value});
  };
  const  {id } = useParams();

  const onSubmit = async e => {
    e.preventDefault();
    const user = await Auth.currentAuthenticatedUser()
    const token = user.signInUserSession.idToken.jwtToken
    const requestInfo = {
      headers: {
        Authorization: token
    }
  }
  console.log(token)
    
    await axios.post(`https://yoib2xopu2.execute-api.eu-central-1.amazonaws.com/dev/authors/${id}`, books, requestInfo);
    history.push("/books");
  };
  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Add a Book</h2>
        <form onSubmit={e => onSubmit(e)}>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Book Title"
              name="title"
              value={title}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              className="form-control form-control-lg"
              placeholder="Enter Book ISBN"
              name="ISBN"
              value={ISBN}
              onChange={e => onInputChange2(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              className="form-control form-control-lg"
              placeholder="Enter Book price"
              name="price"
              value={price}
              onChange={e => onInputChange3(e)}
            />
          </div>
          <button className="btn btn-danger">Add Book</button>
        </form>
      </div>
    </div>
);
};

export default AddBook;
