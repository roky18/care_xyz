import Image from "next/image";
import Link from "next/link";

const Services = ({ services }) => {
  
  return (
    <section className="py-16 w-11/12 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
          Our Care <span className="text-emerald-600">Services</span>
        </h2>
        <div className="w-20 h-1 bg-emerald-500 mx-auto mt-4 rounded-full"></div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => (
          <div
            key={service._id}
            className="card bg-white dark:bg-gray-800 shadow-xl hover:shadow-2xl transition-all border border-gray-100 dark:border-gray-700 group"
          >
            <figure className="relative h-60 w-full overflow-hidden">
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title text-gray-800 dark:text-white font-bold">
                {service.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
                {service.description}
              </p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-xl font-bold text-emerald-600">
                  ৳{service.price}{" "}
                  <span className="text-xs text-gray-500">/Day</span>
                </span>
                <div className="card-actions">
                  <Link
                    href={`/services/${service._id}`}
                    className="btn btn-sm bg-emerald-600 hover:bg-emerald-700 text-white border-none rounded-lg"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
