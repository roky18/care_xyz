import Image from "next/image";
import Link from "next/link";

const Services = ({ services }) => {
  if (!services || services.length === 0) {
    return <div className="text-center py-10">No services found.</div>;
  }

  return (
    <section className="py-16 w-11/12 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 dark:text-white">
          Our Special <span className="text-emerald-600">Services</span>
        </h2>
        <p className="text-gray-500 mt-2">
          Quality care tailored to your familys needs
        </p>
        <div className="w-20 h-1 bg-emerald-500 mx-auto mt-4 rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => (
          <div
            key={service._id}
            className="card bg-white dark:bg-gray-800 shadow-xl hover:shadow-2xl transition-all border border-gray-100 dark:border-gray-700 group overflow-hidden"
          >
            <figure className="relative h-56 w-full">
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </figure>
            <div className="card-body p-6">
              <h2 className="card-title text-xl font-bold text-gray-800 dark:text-white">
                {service.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                {service.description}
              </p>

              <div className="flex justify-between items-center border-t pt-4 mt-auto">
                <span className="text-lg font-bold text-emerald-600">
                  ৳{service.price}{" "}
                  <span className="text-xs text-gray-400">/Day</span>
                </span>
                <Link
                  href={`/services/${service._id}`}
                  className="btn btn-sm bg-emerald-600 hover:bg-emerald-700 text-white border-none rounded-md px-4"
                >
                  Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
