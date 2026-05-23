"use client";
import React, { useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

const LandingPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const contentStyle = { textAlign: "center" };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "https://n8n.juniorsrv.online/webhook-test/9d185431-7bbd-4119-bdaa-f9c2b28d2c17",
        { name, email },
      );
    } catch (error) {
      console.error("Error submitting form:", error);
    }
    console.log(name, "This is the Name:name");
    console.log(email, "email");
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-500 p-6">
      <Card className="w-full max-w-md bg-black text-white border-zinc-800">
        <CardHeader>
          <CardTitle className="text-2xl">Contact Form</CardTitle>
          <CardDescription className="text-zinc-400">
            Enter your information below
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <Field>
              <FieldLabel htmlFor="name">Name</FieldLabel>

              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Enter your name"
                className="bg-zinc-900 border-zinc-700 text-white"
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>

              <Input
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Enter your email"
                className="bg-zinc-900 border-zinc-700 text-white"
              />
            </Field>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LandingPage;
