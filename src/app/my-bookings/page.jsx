import { collections, dbConnect } from "@/lib/dbConnect";
import { getSessionCookieName, verifySessionToken } from "@/lib/auth";
import MyBookingsList from "@/components/MyBookingsList";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata = {
  title: "My Bookings - Care.xyz",
  description: "Track your service bookings and status updates.",
};

export default async function MyBookingsPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(getSessionCookieName())?.value;
  const session = verifySessionToken(token);

  if (!session) {
    redirect("/login?redirect=/my-bookings");
  }

  const bookingCollection = dbConnect(collections.BOOKINGS);
  const bookings = await bookingCollection
    .find({ userId: session.sub })
    .sort({ createdAt: -1 })
    .toArray();

  const initialBookings = bookings.map((booking) => ({
    ...booking,
    _id: booking._id.toString(),
    createdAt: booking.createdAt ? new Date(booking.createdAt).toISOString() : null,
  }));

  return (
    <section className="w-11/12 max-w-6xl mx-auto py-10 md:py-14">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">My Bookings</h1>
        <p className="text-gray-600 mt-2">
          View your booked services, current status, and manage cancellations.
        </p>
      </div>

      <MyBookingsList initialBookings={initialBookings} />
    </section>
  );
}
