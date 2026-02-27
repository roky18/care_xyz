import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getServiceById } from "@/actions/server/services";

export async function generateMetadata({ params }) {
  const { service_id } = await params;
  const service = await getServiceById(service_id);

  if (!service) {
    return {
      title: "Service Not Found - Care.xyz",
      description: "The requested care service could not be found.",
    };
  }

  return {
    title: `${service.title} - Care.xyz`,
    description:
      service.description ||
      "Trusted and verified care service from Care.xyz for your loved ones.",
  };
}

export default async function ServiceDetailsPage({ params }) {
  const { service_id } = await params;
  const service = await getServiceById(service_id);

  if (!service) {
    notFound();
  }

  return (
    <section className="w-11/12 max-w-6xl mx-auto py-10 md:py-14">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        <div className="relative w-full h-[280px] md:h-[420px] rounded-2xl overflow-hidden shadow-lg">
          <Image
            src={service.image || "/banner.jpg"}
            alt={service.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="space-y-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600">
              Care Service
            </p>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2">
              {service.title}
            </h1>
          </div>

          <p className="text-gray-600 leading-relaxed">
            {service.description || "No additional description available."}
          </p>

          <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-5">
            <p className="text-gray-700 font-medium">Starting Price</p>
            <p className="text-3xl font-extrabold text-emerald-600 mt-1">
              ৳{service.price || 0}
              <span className="text-base font-medium text-gray-500"> / day</span>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href={`/booking/${service._id}`}
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition"
            >
              Book Service
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold transition"
            >
              Back to Services
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
