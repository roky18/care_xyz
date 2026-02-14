import Image from "next/image";

export const metadata = {
  title: "About Us - Care.xyz",
  description:
    "Learn more about Care.xyz and our mission to provide the best home care services.",
};

const AboutPage = () => {
  return (
    <div className="bg-white">
      {/*  Hero Section */}
      <section className="bg-emerald-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
            Our Mission is to{" "}
            <span className="text-emerald-600">Provide Care</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Care.xyz starts with a simple idea: everyone deserves high-quality,
            compassionate care in the comfort of their own home. We connect
            families with professional caregivers who treat your loved ones like
            their own.
          </p>
        </div>
      </section>

      {/*  Story & Image Section */}
      <section className="py-16 max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="/home-care-service.png"
              alt="Caregiving"
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-800">Why Care.xyz?</h2>
            <p className="text-gray-600 leading-relaxed">
              Founded in 2026, Care.xyz has become Bangladesh most trusted
              platform for home-based care. Whether its a newborn baby needing
              gentle attention or an elderly family member requiring medical
              support, we are here to bridge the gap.
            </p>
            <ul className="space-y-4">
              {[
                "Verified Caregivers",
                "24/7 Support",
                "Affordable Pricing",
                "NID Verified Staff",
              ].map((item, index) => (
                <li
                  key={index}
                  className="flex items-center gap-3 text-gray-700 font-medium"
                >
                  <span className="bg-emerald-100 text-emerald-600 p-1 rounded-full text-sm">
                    ✔
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/*  Stats Section */}
      <section className="bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
          <div>
            <h3 className="text-4xl font-bold text-emerald-500">500+</h3>
            <p className="text-sm mt-2 text-gray-400">Happy Families</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-emerald-500">120+</h3>
            <p className="text-sm mt-2 text-gray-400">Expert Caregivers</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-emerald-500">10k+</h3>
            <p className="text-sm mt-2 text-gray-400">Hours of Care</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-emerald-500">4.9/5</h3>
            <p className="text-sm mt-2 text-gray-400">User Rating</p>
          </div>
        </div>
      </section>

      {/*  Our Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <div className="text-4xl mb-4 text-emerald-600">❤</div>
              <h4 className="text-xl font-bold mb-2">Empathy</h4>
              <p className="text-gray-600 text-sm">
                We listen and care with deep emotional understanding.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <div className="text-4xl mb-4 text-emerald-600">🛡</div>
              <h4 className="text-xl font-bold mb-2">Safety</h4>
              <p className="text-gray-600 text-sm">
                Your familys safety is our top priority with strict background
                checks.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <div className="text-4xl mb-4 text-emerald-600">🤝</div>
              <h4 className="text-xl font-bold mb-2">Integrity</h4>
              <p className="text-gray-600 text-sm">
                Honesty and transparency in every booking and interaction.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
