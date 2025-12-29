import clientPromise from "@/lib/mongodb";
import FlightEnquiry from "@/models/FlightEnquiry";

export default async function AdminPage() {
  const client = await clientPromise;
  const db = client.db();

  const bookings = await FlightEnquiry.find().lean();

  return (
    <div style={{ padding: "20px" }}>
      <h2>Flight Enquiries</h2>

      <button
        onClick={() => {
          document.cookie = "admin-auth=; Max-Age=0; path=/";
          window.location.href = "/admin/login";
        }}
      >
        Logout
      </button>

      <table border={1} cellPadding={10}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>From</th>
            <th>To</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b: any) => (
            <tr key={b._id}>
              <td>{b.name}</td>
              <td>{b.email}</td>
              <td>{b.from}</td>
              <td>{b.to}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
