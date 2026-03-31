"use client";
import React, { useState } from "react";
import axios from "axios";
const LandingPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const contentStyle = { textAlign: "center" };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data } = await axios.post(
      "https://n8n.juniorsrv.online/webhook-test/9d185431-7bbd-4119-bdaa-f9c2b28d2c17",
      { name, email },
    );
    console.log(name, "This is the Name:name");
    console.log(email, "email");
  };
  return (
    <div className="bg-blue-500 flex justify-center min-h-screen">
      <div className="bg-black flex flex-col items-center justify-center p-8 rounded-lg gap-10">
        {" "}
        <h1>Welcome to the Landing Page</h1>{" "}
        <p>This is the new LandPage component inside the app directory.</p>{" "}
        <form onSubmit={handleSubmit} action="">
          {" "}
          <label for="username" class="block text-sm/6 font-medium text-white">
            Name
          </label>
          <input
            className="block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-base text-white placeholder:text-white-500 focus:outline-none sm:text-sm/6"
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Enter your name"
          />{" "}
          <label for="email" class="block text-sm/6 font-medium text-white">
            Email
          </label>
          <input
            className="block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6"
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
