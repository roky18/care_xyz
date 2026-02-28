import Link from "next/link";

export const metadata = {
  title: "404 - Page Not Found | Care.xyz",
  description: "The page you are looking for does not exist.",
};

export default function NotFoundPage() {
  return (
    <section className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-xl w-full text-center bg-white border border-gray-100 rounded-2xl shadow-sm p-8 md:p-10">
        <p className="text-sm font-semibold tracking-widest text-emerald-600 uppercase">404 Error</p>
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-3">Page Not Found</h1>
        <p className="text-gray-600 mt-3">
          Sorry, the page you requested could not be found. Please check the URL or return home.
        </p>

        <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition"
          >
            Go To Home
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition"
          >
            Browse Services
          </Link>
        </div>
      </div>
    </section>
  );
}
