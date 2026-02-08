"use client";

import { useEffect, useState } from "react";

export default function AdminPage() {
  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/admin/bookings")
      .then((res) => res.json())
      .then((data) => setBookings(data));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Flight Enquiries</h2>

      <button
        onClick={() => {
          document.cookie = "admin-auth=; Max-Age=0; path=/";
          window.location.href = "/admin/login";
        }}
      >
        Logout
      </button>

      <ul>
        {bookings.map((b) => (
          <li key={b._id}>
            {b.name} — {b.from} → {b.to}
          </li>
        ))}
      </ul>
    </div>
  );
}
