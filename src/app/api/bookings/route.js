import { collections, dbConnect } from "@/lib/dbConnect";
import { getSessionCookieName, verifySessionToken } from "@/lib/auth";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

function getSessionFromRequest(request) {
  const token = request.cookies.get(getSessionCookieName())?.value;
  return verifySessionToken(token);
}

export async function GET(request) {
  try {
    const session = getSessionFromRequest(request);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const bookingCollection = dbConnect(collections.BOOKINGS);
    const bookings = await bookingCollection
      .find({ userId: session.sub })
      .sort({ createdAt: -1 })
      .toArray();

    const formatted = bookings.map((booking) => ({
      ...booking,
      _id: booking._id.toString(),
      createdAt: booking.createdAt ? new Date(booking.createdAt).toISOString() : null,
    }));

    return NextResponse.json({ bookings: formatted }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch bookings", error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const session = getSessionFromRequest(request);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
      serviceId,
      serviceTitle,
      servicePrice,
      durationType,
      durationValue,
      location,
      totalCost,
    } = body;

    if (!ObjectId.isValid(serviceId)) {
      return NextResponse.json({ message: "Invalid service id." }, { status: 400 });
    }

    if (!["days", "hours"].includes(durationType) || Number(durationValue) < 1) {
      return NextResponse.json({ message: "Invalid duration." }, { status: 400 });
    }

    if (!location?.address) {
      return NextResponse.json({ message: "Address is required." }, { status: 400 });
    }

    const bookingCollection = dbConnect(collections.BOOKINGS);

    const bookingDoc = {
      userId: session.sub,
      userEmail: session.email,
      userName: session.name,
      serviceId,
      serviceTitle,
      servicePrice: Number(servicePrice || 0),
      durationType,
      durationValue: Number(durationValue),
      location: {
        division: location.division || "",
        district: location.district || "",
        city: location.city || "",
        area: location.area || "",
        address: location.address,
      },
      totalCost: Number(totalCost || 0),
      status: "Pending",
      createdAt: new Date(),
    };

    const result = await bookingCollection.insertOne(bookingDoc);
    return NextResponse.json(
      { message: "Booking created", bookingId: result.insertedId.toString() },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Booking failed", error: error.message },
      { status: 500 }
    );
  }
}

export async function PATCH(request) {
  try {
    const session = getSessionFromRequest(request);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { bookingId, action } = await request.json();
    if (!ObjectId.isValid(bookingId)) {
      return NextResponse.json({ message: "Invalid booking id." }, { status: 400 });
    }

    if (!["confirm", "cancel"].includes(action)) {
      return NextResponse.json({ message: "Invalid action." }, { status: 400 });
    }

    const bookingCollection = dbConnect(collections.BOOKINGS);
    const booking = await bookingCollection.findOne({
      _id: new ObjectId(bookingId),
      userId: session.sub,
    });

    if (!booking) {
      return NextResponse.json({ message: "Booking not found." }, { status: 404 });
    }

    if (action === "cancel") {
      if (booking.status === "Cancelled") {
        return NextResponse.json({ message: "Booking already cancelled." }, { status: 400 });
      }

      if (booking.status === "Completed") {
        return NextResponse.json(
          { message: "Completed booking cannot be cancelled." },
          { status: 400 }
        );
      }

      await bookingCollection.updateOne(
        { _id: new ObjectId(bookingId), userId: session.sub },
        { $set: { status: "Cancelled", cancelledAt: new Date() } }
      );

      return NextResponse.json({ message: "Booking cancelled.", status: "Cancelled" }, { status: 200 });
    }

    if (booking.status !== "Pending") {
      return NextResponse.json(
        { message: "Only pending bookings can be confirmed." },
        { status: 400 }
      );
    }

    await bookingCollection.updateOne(
      { _id: new ObjectId(bookingId), userId: session.sub },
      { $set: { status: "Confirmed", confirmedAt: new Date() } }
    );

    return NextResponse.json({ message: "Booking confirmed.", status: "Confirmed" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to cancel booking", error: error.message },
      { status: 500 }
    );
  }
}
