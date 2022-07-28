import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";

const EditUser = () => {
  let history = useHistory();
  const [user, setUser] = useState({
    name: "",
    age: ""
  });
  const  {id } = useParams();
  console.log(id);
  const { name, age} = user;
  const onInputChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value});
  };

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  const loadUser = async () => {
    const result = await axios.get(`http://localhost:5050/authors/${id}`);
    setUser(result.data);
  };

  const onSubmit = async e => {
    e.preventDefault();
    await axios.put(`http://localhost:5050/authors/put/${id}`, user);
    history.push("/");
  };

  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Edit Author</h2>
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
          <button className="btn btn-warning btn-block">Update Author</button>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
