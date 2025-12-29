import clientPromise from "@/lib/mongodb";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const client = await clientPromise;
  const db = client.db("flight");

  const bookings = await db
    .collection("flightenquiries")
    .find()
    .toArray();

  return (
    <div style={{ padding: 20 }}>
      <h2>Admin Bookings</h2>

      <button
        onClick={() => {
          document.cookie = "admin-auth=; Max-Age=0; path=/";
          window.location.href = "/admin/login";
        }}
      >
        Logout
      </button>

      <pre>{JSON.stringify(bookings, null, 2)}</pre>
    </div>
  );
}
