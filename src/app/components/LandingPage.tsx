"use client";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Mail, Phone, Sparkles, User } from "lucide-react";
import { LeadFormField } from "./LeadFormField";
import { validateLeadForm, type LeadFormErrors } from "@/lib/validation/lead";
import type { LeadFormData } from "@/lib/types/lead";

const benefits = [
  "Get a personal reply from our team within one business day",
  "No spam, ever — your details stay between us",
  "Be the first to hear about new openings and offers",
];

const WEBHOOK_URL_prod =
  "https://n8n.juniorsrv.online/webhook/9d185431-7bbd-4119-bdaa-f9c2b28d2c17";

const LandingPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<LeadFormErrors>({});
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data: LeadFormData = { name, email, phone };
    const result = validateLeadForm(data);

    if (result.errors) {
      setErrors(result.errors);
      const firstError = Object.values(result.errors)[0];
      toast.error(firstError ?? "Please fix the highlighted fields");
      return;
    }

    setErrors({});
    setStatus("loading");
    try {
      await axios.post(WEBHOOK_URL_prod, result.value);
      setStatus("success");
      setName("");
      setEmail("");
      setPhone("");
      toast.success("Thanks! We've received your details", {
        description: "Our team will be in touch soon.",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus("error");
      toast.error("Something went wrong", {
        description: "Please try again in a moment.",
      });
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
              <LeadFormField
                id="name"
                label="Name"
                icon={User}
                value={name}
                onChange={setName}
                placeholder="Enter your name"
                error={errors.name}
              />

              <LeadFormField
                id="email"
                label="Email"
                icon={Mail}
                value={email}
                onChange={setEmail}
                type="email"
                placeholder="Enter your email"
                error={errors.email}
              />

              <LeadFormField
                id="phone"
                label="Phone"
                icon={Phone}
                value={phone}
                onChange={setPhone}
                type="tel"
                placeholder="Enter your phone number"
                error={errors.phone}
              />

              <Button
                type="submit"
                disabled={status === "loading"}
                className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700"
              >
                {status === "loading" ? "Sending..." : "Submit"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LandingPage;
