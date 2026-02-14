import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-8 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand Section */}
        <div className="space-y-4">
          <Link href="/" className="text-2xl font-bold text-white">
           <Image 
              src="/logo.png"
              alt="Care.xyz Logo" 
              width={100} 
              height={50} 
              className="object-contain"
            />
          </Link>
          <p className="text-sm leading-relaxed">
            Making caregiving easy, secure, and accessible for everyone. 
            Reliable care services for children, elderly, and other family members.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:text-emerald-500 transition">Home</Link></li>
            <li><Link href="/services" className="hover:text-emerald-500 transition">Our Services</Link></li>
            <li><Link href="/about" className="hover:text-emerald-500 transition">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-emerald-500 transition">Contact</Link></li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-white font-semibold mb-4">Our Services</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/service/baby-care" className="hover:text-emerald-500 transition">Baby Sitting</Link></li>
            <li><Link href="/service/elderly-care" className="hover:text-emerald-500 transition">Elderly Care</Link></li>
            <li><Link href="/service/sick-care" className="hover:text-emerald-500 transition">Special Care</Link></li>
            <li><Link href="/booking" className="hover:text-emerald-500 transition">Book a Caretaker</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-white font-semibold mb-4">Contact Us</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <span>📍</span> Dhaka, Bangladesh
            </li>
            <li className="flex items-center gap-2">
              <span>📞</span> +880 1234 567 890
            </li>
            <li className="flex items-center gap-2">
              <span>✉️</span> support@care.xyz
            </li>
          </ul>
        </div>
      </div>

      <hr className="border-gray-800 my-8" />

      {/* Copyright & Social */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-xs">
        <p>© 2026 Care.xyz. All rights reserved.</p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <Link href="#" className="hover:text-emerald-500">Facebook</Link>
          <Link href="#" className="hover:text-emerald-500">Twitter</Link>
          <Link href="#" className="hover:text-emerald-500">LinkedIn</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;