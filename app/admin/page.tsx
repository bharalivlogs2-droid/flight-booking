"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();
  const [data, setData] = useState<any[]>([]);

  // 🔐 Protect admin page
  useEffect(() => {
    const isLoggedIn = document.cookie.includes("admin-auth=true");
    if (!isLoggedIn) {
      router.push("/admin/login");
    }
  }, [router]);

  // 📦 Fetch bookings
  useEffect(() => {
    fetch("/api/bookings")
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch(() => setData([]));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Flight Enquiries</h2>

      {/* 🔓 LOGOUT BUTTON */}
      <button
        style={{
          marginBottom: "15px",
          padding: "8px 16px",
          background: "red",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
        onClick={() => {
          document.cookie = "admin-auth=; Max-Age=0; path=/";
          window.location.href = "/admin/login";
        }}
      >
        Logout
      </button>

      {/* 📊 BOOKINGS TABLE */}
      <table
        border={1}
        cellPadding={12}
        style={{ borderCollapse: "collapse", width: "100%" }}
      >
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>From</th>
            <th>To</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {data.length === 0 && (
            <tr>
              <td colSpan={5} style={{ textAlign: "center" }}>
                No bookings found
              </td>
            </tr>
          )}

          {data.map((b: any, i: number) => (
            <tr key={i}>
              <td>{b.name}</td>
              <td>{b.email}</td>
              <td>{b.from}</td>
              <td>{b.to}</td>
              <td>{b.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

