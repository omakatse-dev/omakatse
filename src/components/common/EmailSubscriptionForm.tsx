"use client";
import React, { useState } from "react";
import Button from "./Button";

export default function EmailSubscriptionForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setMessage("Please enter a valid email.");
      return;
    }

    try {
      // Send the email to Shopify API endpoint (to be created below)
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      console.log("API Response Status:", res.status);

      const data = await res.json();
      console.log("API Response Data:", data);
      if (data.success) {
        setMessage("Thank you for subscribing!");
      } else {
        setMessage("Subscription failed. Please try again.");
      }
    } catch {
      setMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex lg:flex-row flex-col gap-4">
        <input
          type="email"
          value={email}
          placeholder="Enter your email"
          className="border-b mr-4 py-4 focus:outline-none w-full"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Button
          className="w-full lg:w-2/4 bodyButton"
          variant="primary"
          type="submit"
        >
          Subscribe
        </Button>
      </form>
      {message && <p>{message}</p>}
      <p className="bodyXS mt-4">
        {" "}
        By subscribing you agree to with our Privacy Policy and provide consent
        to receive updates from our company.
      </p>
    </div>
  );
}
