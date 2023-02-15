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
    const response = await axios.get("http://localhost:3000/user");
    setData(response.data);
  };

  const onDeleteUser = async (id) => {
    if (window.confirm("Are u sure?")) {
      const response = await axios.delete(`http://localhost:3000/user/${id}`);
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
                      <Link to={`/update/${item._id}`}>
                        <button className="btn btn-edit">Edit</button>
                      </Link>
                      <button
                        className="btn btn-delete"
                        onClick={() => onDeleteUser(item._id)}
                      >
                        Delete
                      </button>
                      <Link to={`/view/${item._id}`}>
                        <button className="btn btn-view">View</button>
                      </Link>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      ) : (
        <h1>No data found </h1>
      )}
    </div>
  );
};

export default Home;
