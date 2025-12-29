import clientPromise from "@/lib/mongodb";

export default async function HomePage() {
  const client = await clientPromise;
  const db = client.db("flight");

  const bookings = await db.collection("bookings").find().toArray();

  return (
    <main style={{ padding: 20 }}>
      <h1>Flight Bookings</h1>

      <ul>
        {bookings.map((b: any) => (
          <li key={b._id}>
            {b.name} – {b.from} → {b.to}
          </li>
        ))}
      </ul>
    </main>
  );
}
