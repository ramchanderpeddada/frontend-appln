import { Button } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await axios.get("http://localhost:5000/users");
    setData(response.data);
  };

  const onDeleteUser = async (id) => {
    if (window.confirm("Are u sure?")) {
      const response = await axios.delete(`http://localhost:5000/users/${id}`);
      console.log(id, "id");
      if (response.status === 200) {
        getUsers();
      }
    }
  };

  return (
    <div style={{ marginTop: "150px" }}>
      {data.length > 0 ? (
        <table className="styled-table">
          <thead>
            <tr>
              <th style={{ textAlign: "center" }}>No.</th>
              <th style={{ textAlign: "center" }}>Name</th>
              <th style={{ textAlign: "center" }}>Email</th>
              <th style={{ textAlign: "center" }}>Phone</th>
              <th style={{ textAlign: "center" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((item, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{item.username}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td>
                      <Link to={`/update/${item.id}`}>
                        <Button color="success" size="small">
                          Edit
                        </Button>
                      </Link>
                      <Button
                        color="error"
                        size="small"
                        onClick={() => onDeleteUser(item.id)}
                      >
                        Delete
                      </Button>
                      <Link to={`/view/${item.id}`}>
                        <Button className="btn btn-view" size="small">
                          View
                        </Button>
                      </Link>
                      <Link to={`/posts/${item.id}`}>
                        <Button
                          className="btn btn-addPost"
                          size="small"
                          color="secondary"
                        >
                          Add Post
                        </Button>
                      </Link>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      ) : (
        <h1 style={{ textAlign: "center" }}>No data found </h1>
      )}
    </div>
  );
};

export default Home;
