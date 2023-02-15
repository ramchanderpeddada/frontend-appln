import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./AddEdit.css";

const initialState = {
  username: "",
  email: "",
  phone: "",
};

const AddEdit = () => {
  const [state, setState] = useState(initialState);

  const { username, email, phone } = state;

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getSingleUser(id);
    }
  }, [id]);

  const getSingleUser = async (id) => {
    const response = await axios.get(`http://localhost:3000/user/${id}`);
    setState(response.data);
  };

  const saveUser = async (id, data) => {
    const method = id ? "put" : "post";
    const url = id
      ? `http://localhost:3000/user/${id}`
      : "http://localhost:3000/user";
    const response = await axios[method](url, data);
    alert(id ? "Updated Succesfully" : "Added succesfully");
    setState(response.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !email) {
      alert("Please provide valid input");
    } else {
      try {
        await saveUser(id, state);
        navigate("/");
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <div style={{ marginTop: "100px" }}>
      <form
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          placeholder="Enter Username..."
          onChange={handleInputChange}
          value={username}
        />
        <input
          type="email"
          name="email"
          placeholder="Enter email..."
          onChange={handleInputChange}
          value={email}
        />
        <input
          type="number"
          name="phone"
          placeholder="Enter phone..."
          onChange={handleInputChange}
          value={phone}
          maxLength={10}
        />
        <input type="submit" value={id ? "Update" : "Add"} />
      </form>
    </div>
  );
};

export default AddEdit;
