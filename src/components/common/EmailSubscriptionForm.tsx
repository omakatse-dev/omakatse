"use client";
import React, { useState } from "react";
import Button from "./Button";
import { createCustomer } from "@/utils/APIs";

export default function EmailSubscriptionForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setMessage("Please enter a valid email");
      return;
    }
    setIsLoading(true);
    setMessage("");
    try {
      const result = await createCustomer(email);
      console.log(result);
      setMessage("Thank you for subscribing!");
      setEmail(""); // Clear the input after successful submission
    } catch (error: unknown) {
      if (error instanceof Error) {
        setMessage(error.message || "Failed to subscribe. Please try again.");
      } else {
        setMessage("Failed to subscribe. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex lg:flex-row flex-col gap-4">
        <input
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
          disabled={isLoading}
        >
          {isLoading ? "Subscribing..." : "Subscribe"}
        </Button>
      </form>
      {message && <p className="mt-2">{message}</p>}
      <p className="bodyXS mt-4">
        By subscribing you agree to with our Privacy Policy and provide consent
        to receive updates from our company.
      </p>
    </div>
  );
}
