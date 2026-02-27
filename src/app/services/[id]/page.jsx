import { collections, dbConnect } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import Link from "next/link";
import { FaCheckCircle, FaClock, FaMoneyBillWave } from "react-icons/fa";




export async function generateMetadata({ params }) {
  const { id } = params;
  const serviceCollection = dbConnect(collections.SERVICES);
  const service = await serviceCollection.findOne({ _id: new ObjectId(id) });

  return {
    title: `${service?.name || "Service"} | Care.xyz`,
    description:
      service?.description || "Reliable care services for your family.",
  };
}

export default async function ServiceDetailPage({ params }) {
  const { id } = params;

  
  const serviceCollection = dbConnect(collections.SERVICES);
  const service = await serviceCollection.findOne({ _id: new ObjectId(id) });

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-2xl font-bold">Service Not Found!</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-5xl mx-auto px-4">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 flex flex-col md:flex-row">
          {/* Left Side: Image/Banner Area */}
          <div className="md:w-1/2 bg-emerald-600 flex items-center justify-center p-12 text-white">
            <div className="text-center">
              <h1 className="text-4xl font-extrabold mb-4">{service.name}</h1>
              <p className="text-emerald-50 text-lg italic">
                your familys safety and care is our priority.
              </p>
            </div>
          </div>

          {/* Right Side: Details Area */}
          <div className="md:w-1/2 p-8 md:p-12">
            <div className="flex justify-between items-start mb-6">
              <span className="badge badge-success text-white py-3 px-4">
                Trusted Service
              </span>
              <div className="flex items-center gap-2 text-emerald-600 font-bold text-2xl">
                <FaMoneyBillWave />
                <span>${service.price}/hr</span>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Service Description
            </h2>
            <p className="text-gray-600 leading-relaxed mb-8">
              {service.description}
            </p>

            {/* Features List */}
            <div className="space-y-4 mb-10">
              <div className="flex items-center gap-3 text-gray-700">
                <FaCheckCircle className="text-emerald-500" />
                <span>Verified and Trained Caretakers</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <FaClock className="text-emerald-500" />
                <span>Flexible Schedule (24/7 Support)</span>
              </div>
            </div>

            {/* Action Button */}
            <Link
              href={`/booking/${id}`}
              className="block w-full text-center bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl shadow-lg transition-all transform hover:scale-[1.02]"
            >
              Book This Service Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
