"use client";

import { z } from "zod";
import Input from "../common/Input";
import { useForm } from "react-hook-form";
import Textfield from "../common/Textfield";
import Button from "../common/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import Dropdown from "../common/Dropdown";
import { sendContactForm } from "@/utils/APIs";
import { useState } from "react";

const categories = [
  "General enquries",
  "Subscription box",
  "Orders & shipping",
  "Account & billing",
  "Pets & products",
  "Technical issues",
  "Add or remove pets",
  "Other",
];

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(1, "Message is required"),
  category: z.enum([
    "General enquries",
    "Subscription box",
    "Orders & shipping",
    "Account & billing",
    "Pets & products",
    "Technical issues",
    "Add or remove pets",
    "Other",
  ]),
});

export type ContactFormData = z.infer<typeof schema>;

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      category: "General enquries",
    },
  });

  const selectedCategory = watch("category");
  const [status, setStatus] = useState("idle");

  const onSubmit = async (data: ContactFormData) => {
    setStatus("loading");
    const res = await sendContactForm(data);
    console.log(res);
    setStatus("success");
    setTimeout(() => {
      setStatus("idle");
      reset();
    }, 3000);
  };

  return (
    <form
      className="flex flex-col gap-4 sm:gap-6 bodyMD text-gray-800"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="name">Name</label>
        <Input
          className="border-primary"
          placeholder="Enter your name"
          {...register("name")}
        />
        {errors.name && <p className="text-red">{errors.name.message}</p>}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="name">Email</label>
        <Input
          className="border-primary"
          placeholder="Enter your email"
          {...register("email")}
        />
        {errors.email && <p className="text-red">{errors.email.message}</p>}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="message">Category</label>
        <Dropdown
          options={categories}
          placeholder="Select a category"
          value={selectedCategory}
          onChange={(e) =>
            setValue("category", e.target.value as ContactFormData["category"])
          }
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="message">Message</label>
        <Textfield
          className="border-primary h-32"
          placeholder="Enter your message"
          {...register("message")}
        />
        {errors.message && <p className="text-red">{errors.message.message}</p>}
      </div>
      <div>
      <Button type="submit" disabled={status !== "idle"}>
        {status === "loading"
          ? "Sending..."
          : status === "success"
          ? "Sent!"
          : "Send Message"}
      </Button>
      </div>
    </form>
  );
}
