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
import { CheckCircle2, Mail, Sparkles, User } from "lucide-react";

const benefits = [
  "Get a personal reply from our team within one business day",
  "No spam, ever — your details stay between us",
  "Be the first to hear about new openings and offers",
];

const LandingPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    try {
      await axios.post(
        "https://n8n.juniorsrv.online/webhook-test/9d185431-7bbd-4119-bdaa-f9c2b28d2c17",
        { name, email },
      );
      setStatus("success");
      setName("");
      setEmail("");
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus("error");
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-linear-to-br from-blue-600 via-indigo-600 to-slate-900 p-6">
      <div className="grid w-full max-w-5xl gap-12 lg:grid-cols-2 lg:items-center">
        <div className="flex flex-col items-center gap-6 text-center text-white lg:items-start lg:text-left">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur">
            <Sparkles className="size-4" />
            Let&apos;s get in touch
          </span>
          <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            Leave your details — we&apos;d love to hear from you
          </h1>
          <p className="max-w-md text-lg text-blue-100">
            Share your name and email and our team will reach out with
            everything you need to get started. It only takes a few seconds.
          </p>
          <ul className="flex flex-col gap-3">
            {benefits.map((benefit) => (
              <li key={benefit} className="flex items-start gap-3 text-blue-50">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-emerald-300" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        <Card className="mx-auto w-full max-w-md border-0 bg-white/95 text-zinc-900 shadow-2xl backdrop-blur">
          <CardHeader>
            <CardTitle className="text-2xl">Get in touch</CardTitle>
            <CardDescription className="text-zinc-500">
              Fill in your details and we&apos;ll be right with you
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <Field>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <div className="relative">
                  <User className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-400" />
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    placeholder="Enter your name"
                    required
                    className="bg-zinc-50 pl-9 border-zinc-200 text-zinc-900"
                  />
                </div>
              </Field>

              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-400" />
                  <Input
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="Enter your email"
                    required
                    className="bg-zinc-50 pl-9 border-zinc-200 text-zinc-900"
                  />
                </div>
              </Field>

              <Button
                type="submit"
                disabled={status === "loading"}
                className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700"
              >
                {status === "loading" ? "Sending..." : "Submit"}
              </Button>

              {status === "success" && (
                <p className="text-center text-sm text-emerald-600">
                  Thanks! We&apos;ve received your details and will be in touch
                  soon.
                </p>
              )}
              {status === "error" && (
                <p className="text-center text-sm text-red-600">
                  Something went wrong — please try again in a moment.
                </p>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LandingPage;