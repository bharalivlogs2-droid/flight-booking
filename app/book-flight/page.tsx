"use client";

import { useState } from "react";

export default function BookFlightPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    from: "",
    to: "",
    date: "",
  });

  const [message, setMessage] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setMessage("Booking submitted successfully!");
      setForm({ name: "", email: "", from: "", to: "", date: "" });
    } else {
      setMessage("Something went wrong");
    }
  }

  return (
    <div style={{ padding: 40, maxWidth: 500 }}>
      <h2>Book a Flight</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        /><br /><br />

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        /><br /><br />

        <input
          name="from"
          placeholder="From"
          value={form.from}
          onChange={handleChange}
          required
        /><br /><br />

        <input
          name="to"
          placeholder="To"
          value={form.to}
          onChange={handleChange}
          required
        /><br /><br />

        <input
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          required
        /><br /><br />

        <button type="submit">Submit Booking</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}
