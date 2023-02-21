import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const initialState = {
  title: "",
  description: "",
};

const Posts = () => {
  const [state, setState] = useState(initialState);

  const { title, description } = state;

  const navigate = useNavigate();
  const { id } = useParams();

  const savePost = async (data) => {
    try {
      if (id) {
        await axios.post(`http://localhost:5000/users/${id}/posts`, data);
      } else {
        await axios.post(`http://localhost:5000/posts`, data);
      }
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description) {
      alert("Please provide valid input");
    } else {
      try {
        await savePost(state);
        alert("Post added succesfully");
        navigate("/home");
      } catch (err) {
        console.error(err);
      }
    }
    console.log(state);
  };

  return (
    <div style={{ marginTop: "100px" }}>
      <form
        style={{
          margin: "auto",
          gap: "20px",
          maxWidth: "400px",
          minHeight: "40vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
        onSubmit={handleSubmit}
      >
        <Typography>Add Post:</Typography>
        <TextField
          type="text"
          name="title"
          placeholder="Enter Title..."
          onChange={handleInputChange}
          value={title}
        />
        <TextField
          type="text"
          name="description"
          placeholder="Enter Description..."
          onChange={handleInputChange}
          value={description}
        />
        <Button type="submit" variant="contained" onSubmit={handleSubmit}>
          Add Post
        </Button>
      </form>
    </div>
  );
};

export default Posts;
