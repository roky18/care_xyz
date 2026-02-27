"use client";

import { useState } from "react";

function statusClass(status) {
  if (status === "Confirmed") return "bg-blue-100 text-blue-700";
  if (status === "Completed") return "bg-emerald-100 text-emerald-700";
  if (status === "Cancelled") return "bg-red-100 text-red-700";
  return "bg-amber-100 text-amber-700";
}

export default function MyBookingsList({ initialBookings }) {
  const [bookings, setBookings] = useState(initialBookings || []);
  const [loadingId, setLoadingId] = useState("");

  const handleStatusChange = async (bookingId, action) => {
    setLoadingId(bookingId);
    try {
      const res = await fetch("/api/bookings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingId, action }),
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "Failed to update booking.");
        return;
      }

      setBookings((prev) =>
        prev.map((booking) =>
          booking._id === bookingId
            ? { ...booking, status: data.status || booking.status }
            : booking
        )
      );
    } catch {
      alert("Failed to update booking.");
    } finally {
      setLoadingId("");
    }
  };

  if (!bookings.length) {
    return (
      <div className="bg-white border border-gray-100 rounded-2xl p-8 text-center">
        <h2 className="text-xl font-bold text-gray-900">No Bookings Yet</h2>
        <p className="text-gray-600 mt-2">You have not booked any service yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {bookings.map((booking) => (
        <div key={booking._id} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <h3 className="text-lg font-bold text-gray-900">{booking.serviceTitle}</h3>
              <p className="text-sm text-gray-600">
                Duration: {booking.durationValue} {booking.durationType}
              </p>
              <p className="text-sm text-gray-600">Total: Tk {Number(booking.totalCost || 0).toFixed(2)}</p>
            </div>

            <div className="flex items-center gap-2">
              <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusClass(booking.status)}`}>
                {booking.status}
              </span>
              <button
                disabled={
                  loadingId === booking._id ||
                  booking.status !== "Pending"
                }
                onClick={() => handleStatusChange(booking._id, "confirm")}
                className="px-3 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 disabled:opacity-60"
              >
                {loadingId === booking._id ? "Updating..." : "Confirm"}
              </button>
              <button
                disabled={
                  loadingId === booking._id ||
                  booking.status === "Cancelled" ||
                  booking.status === "Completed"
                }
                onClick={() => handleStatusChange(booking._id, "cancel")}
                className="px-3 py-2 rounded-lg bg-red-600 text-white text-sm font-medium hover:bg-red-700 disabled:opacity-60"
              >
                {loadingId === booking._id ? "Updating..." : "Cancel"}
              </button>
            </div>
          </div>

          <div className="mt-4 border-t border-gray-100 pt-4 text-sm text-gray-700 space-y-1">
            <p>
              <span className="font-semibold">Location:</span>{" "}
              {booking.location?.division}, {booking.location?.district}, {booking.location?.city},{" "}
              {booking.location?.area}
            </p>
            <p>
              <span className="font-semibold">Address:</span> {booking.location?.address}
            </p>
            <p>
              <span className="font-semibold">Booked At:</span>{" "}
              {booking.createdAt ? new Date(booking.createdAt).toLocaleString() : "N/A"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
