"use client";
import React, { useState } from "react";
const LandingPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const containerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
  };
  const contentStyle = { textAlign: "center" };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, "This is the Name:name");
    console.log(email, "email");
  };
  return (
    <div style={containerStyle}>
      {" "}
      <div style={contentStyle}>
        {" "}
        <h1>Welcome to the Landing Page</h1>{" "}
        <p>This is the new LandPage component inside the app directory.</p>{" "}
        <form
          onSubmit={handleSubmit}
          style={{ backgroundColor: "gray" }}
          action=""
        >
          {" "}
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Enter your name"
          />{" "}
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter your email"
          />{" "}
          <button type="submit">Submit</button>{" "}
        </form>{" "}
      </div>{" "}
    </div>
  );
};
export default LandingPage;
