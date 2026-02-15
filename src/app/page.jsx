import Banner from "@/components/Banner";
import Services from "@/components/Services";
import { getAllServices } from "@/actions/server/services";

export default async function Home() {
  const services = await getAllServices();

  return (
    <div className="flex flex-col w-full bg-base-100 font-sans dark:bg-black min-h-screen">
      <main className="w-full pb-10">
        {/* Banner Section */}
        <Banner />

        {/* Services Section */}
        <section>
          {services.length > 0 ? (
            <Services services={services} />
          ) : (
            <div className="text-center py-20">
              <span className="loading loading-spinner loading-lg text-emerald-600"></span>
              <p className="mt-4 text-gray-500">Connecting to database...</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
