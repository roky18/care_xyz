import { getServiceById } from "@/actions/server/services";
import { getSessionCookieName, verifySessionToken } from "@/lib/auth";
import BookingForm from "@/components/BookingForm";
import { notFound, redirect } from "next/navigation";
import { cookies } from "next/headers";

export const metadata = {
  title: "Book Service - Care.xyz",
  description: "Book trusted care services with location and duration details.",
};

export default async function BookingPage({ params }) {
  const { service_id } = await params;
  const cookieStore = await cookies();
  const token = cookieStore.get(getSessionCookieName())?.value;
  const session = verifySessionToken(token);

  if (!session) {
    redirect(`/login?redirect=${encodeURIComponent(`/booking/${service_id}`)}`);
  }

  const service = await getServiceById(service_id);

  if (!service) {
    notFound();
  }

  return (
    <section className="w-11/12 max-w-4xl mx-auto py-10 md:py-14">
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">Book: {service.title}</h1>
        <p className="text-gray-600 mt-2">
          Set your duration and location. Total cost is calculated automatically.
        </p>

        <div className="mt-6">
          <BookingForm service={service} />
        </div>
      </div>
    </section>
  );
}
