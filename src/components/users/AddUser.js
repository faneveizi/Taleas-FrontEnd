import React, { useState } from "react";
import axios from 'axios';
import { useHistory } from "react-router-dom";

const AddUser = () => {
  let history = useHistory();
  const [user, setUser] = useState({
    name: "",
    age: ""
  });

  const { name, age } = user;
  const onInputChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value, [e.target.age]: e.target.value });
  };
console.log(user)
  const onSubmit = async e => {
    e.preventDefault();
    await axios.post("http://localhost:5050/authors", user);
    history.push("/");
  };
  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Add an Author</h2>
        <form onSubmit={e => onSubmit(e)}>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Author Name"
              name="name"
              value={name}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              className="form-control form-control-lg"
              placeholder="Enter Author age"
              name="age"
              value={age}
              onChange={e => onInputChange(e)}
            />
          </div>
          <button className="btn btn-primary btn-block">Add Author</button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
