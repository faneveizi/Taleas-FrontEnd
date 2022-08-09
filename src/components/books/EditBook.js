import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";

const EditBook = () => {
  let history = useHistory();
  const [books, setBooks] = useState([]);
  const  {id } = useParams();
  const { title, ISBN, price} = books;
  const onInputChange = e => {
    setBooks({ ...books, title: e.target.value});
  };
  const onInputChange2 = e => {
    setBooks({ ...books, ISBN: e.target.value});
  };
  const onInputChange3 = e => {
    setBooks({ ...books, price: e.target.value});
  };

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  const loadUser = async () => {
    const result = await axios.get(`https://6b2t29rnm6.execute-api.us-east-1.amazonaws.com/dev/books/${id}`);
    setBooks(result.data);
  };

  const onSubmit = async e => {
    e.preventDefault();
    await axios.put(`https://6b2t29rnm6.execute-api.us-east-1.amazonaws.com/dev/books/put/${id}`, books);
    history.push("/books");
  };

  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Edit Book</h2>
        <form onSubmit={e => onSubmit(e)}>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Author Name"
              name="title"
              value={title}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              className="form-control form-control-lg"
              placeholder="Enter Author age"
              name="ISBN"
              value={ISBN}
              onChange={e => onInputChange2(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              className="form-control form-control-lg"
              placeholder="Enter Author age"
              name="price"
              value={price}
              onChange={e => onInputChange3(e)}
            />
          </div>
          <button className="btn btn-danger">Update Book</button>
        </form>
      </div>
    </div>
  );
};

export default EditBook;
