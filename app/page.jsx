"use client";
import React from "react";
import HeaderSlider from "@/components/HeaderSlider";
import HomeProducts from "@/components/HomeProducts";
import Banner from "@/components/Banner";
import NewsLetter from "@/components/NewsLetter";
import FeaturedProduct from "@/components/FeaturedProduct";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAppContext } from "@/context/AppContext";
import Link from "next/link";
import { Info, Phone, ShoppingBag } from "lucide-react";
const Home = () => {
  const { isSideBarOpen, setIsSideBarOpen } = useAppContext();
  return (
    <>
      <Navbar />
      {isSideBarOpen && (
        <div
          onClick={() => setIsSideBarOpen(false)} // غلق عند الضغط في أي مكان فارغ
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300"
        />
      )}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-2xl p-6 pt-24 z-45 transition-transform duration-300 ease-in-out md:hidden ${
          isSideBarOpen
            ? "translate-x-0" // اظهر في الشاشة إذا كان مفتوحاً
            : "-translate-x-full" // اختفي تماماً خارج الشاشة جهة اليسار إذا كان مغلقاً
        }`}
      >
        {/* روابط الـ Sidebar */}
        <nav className="flex flex-col gap-6 font-medium text-lg">
          <Link
            href="/"
            onClick={() => setIsSideBarOpen(false)}
            className="flex items-center gap-3 text-gray-700 hover:text-fuchsia-600 transition"
          ></Link>
          <Link
            href="/all-products"
            onClick={() => setIsSideBarOpen(false)}
            className="flex items-center gap-3 text-gray-700 hover:text-fuchsia-600 transition"
          >
            <ShoppingBag className="w-5 h-5" /> Shop
          </Link>
          <Link
            href="/"
            onClick={() => setIsSideBarOpen(false)}
            className="flex items-center gap-3 text-gray-700 hover:text-fuchsia-600 transition"
          >
            <Info className="w-5 h-5" /> About Us
          </Link>
          <Link
            href="/"
            onClick={() => setIsSideBarOpen(false)}
            className="flex items-center gap-3 text-gray-700 hover:text-fuchsia-600 transition"
          >
            <Phone className="w-5 h-5" /> Contact
          </Link>
        </nav>
      </aside>
      <div className="px-6 md:px-16 lg:px-32">
        <HeaderSlider />
        <HomeProducts />
        <FeaturedProduct />
        <Banner />
        <NewsLetter />
      </div>
      <Footer />
    </>
  );
};

export default Home;
