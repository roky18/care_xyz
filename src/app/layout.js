import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "Care.xyz - Reliable Home Care Services",
  description: "Trusted caregiving for children, elderly, and patients.",
};

export default function RootLayout({ children }) {
  return (
    
    <html lang="en">
      <body className={`${poppins.variable} font-sans antialiased`}>
        <Navbar></Navbar>

        <main>{children}</main>

        <Footer></Footer>
      </body>
    </html>
  );
}
