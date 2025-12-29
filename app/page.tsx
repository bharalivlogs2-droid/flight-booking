import dbConnect from "@/lib/mongodb";
import FlightEnquiry from "@/models/FlightEnquiry";

export default async function AdminPage() {
  await dbConnect(); // connect to MongoDB

  const bookings = await FlightEnquiry.find().lean(); // fetch all bookings

  return (
    <div style={{ padding: "20px" }}>
      <h1>Flight Enquiries</h1>
      <table border={1} cellPadding={10} style={{ borderCollapse: "collapse", width: "100%" }}>
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
          {bookings.map((b: any) => (
            <tr key={b._id}>
              <td>{b.name}</td>
              <td>{b.email}</td>
              <td>{b.from}</td>
              <td>{b.to}</td>
              <td>{new Date(b.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
