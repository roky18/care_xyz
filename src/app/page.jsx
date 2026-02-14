import Banner from "@/components/Banner";
import Services from "@/components/Services";
import { collections, dbConnect } from "@/lib/dbConnect";

export default async function Home() {
  const serviceCollection = dbConnect(collections.SERVICES);
  const rawServices = await serviceCollection.find({}).toArray();

  const services = rawServices.map((service) => ({
    ...service,
    _id: service._id.toString(),
  }));

  return (
    <div className="flex flex-col w-full bg-base-100 font-sans dark:bg-black min-h-screen">
      <main className="w-full pb-10">
        {/* Banner Section */}
        <section className="w-full flex justify-center py-8">
          <Banner />
        </section>

        {/* Services Section */}
        {services.length > 0 ? (
          <Services services={services} />
        ) : (
          <div className="text-center py-10">
            <p>No services found. Please seed your database.</p>
          </div>
        )}
      </main>
    </div>
  );
}
