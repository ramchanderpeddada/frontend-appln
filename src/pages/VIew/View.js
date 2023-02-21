import { Box, Card, CardContent, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./View.css";

const View = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getSingleUser(id);
    }
  }, [id]);

  const getSingleUser = async (id) => {
    const response = await axios.get(`http://localhost:5000/users/${id}`);
    const postsResponse = await axios.get(
      `http://localhost:5000/users/${id}/posts`
    );
    setPosts(postsResponse.data.posts);
    setUser(response.data);
  };

  return (
    <Box>
      {posts.length > 0 ? (
        <>
          <Typography variant="h3" sx={{ textAlign: "center" }}>
            Posts
          </Typography>
          <Typography variant="h4">{user?.username}</Typography>
          <Box sx={{ display: "grid", gap: "20px" }}>
            {posts.map((post) => (
              <Card key={post.id} className="card">
                <CardContent>
                  <Typography
                    variant="h5"
                    className="card__title"
                    sx={{ fontWeight: "bold" }}
                  >
                    Title: {post.title}
                  </Typography>
                  <Typography variant="body1" className="card__description">
                    Description: {post.description}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </>
      ) : (
        <Typography variant="h3" sx={{ textAlign: "center" }}>
          No posts
        </Typography>
      )}
    </Box>
  );
};

export default View;
