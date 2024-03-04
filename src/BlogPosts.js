// src/components/blogposts.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const BlogPosts = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [filterValue, setFilterValue] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "http://localhost/wordpress/wp-json/custom/v1/active-blog-posts"
        );
        setPosts(response.data);
        setFilteredPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const handleFilterChange = (event) => {
    const value = event.target.value.toLowerCase();
    setFilterValue(value);
    const filtered = posts.filter((post) =>
      post.title.toLowerCase().includes(value)
    );
    setFilteredPosts(filtered);
  };

  return (
    //correct below
    <div>
      <h1>Active Blog Posts</h1>
      <input
        type="text"
        placeholder="Search by title..."
        value={filterValue}
        onChange={handleFilterChange}
      />
      <ul>
        {filteredPosts.map((post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
            <p>Published on: {new Date(post.date).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogPosts;
