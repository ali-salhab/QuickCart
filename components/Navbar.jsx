"use client";
import React from "react";
import { assets } from "@/assets/assets";
import Link from "next/link";
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";

const Navbar = () => {
  // const { isSignedIn } = useAuth();
  const { isSeller, router } = useAppContext();

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-32 py-3 border-b border-gray-300 ">
      <div className="flex items-center gap-4 lg:gap-8">
        <Image
          className="cursor-pointer w-28 md:w-32"
          onClick={() => router.push("/")}
          // priority
          src={assets.logo}
          alt="logo"
        />
      </div>

      <div className="flex items-center gap-4 lg:gap-8 max-md:hidden">
        <Link href="/" className="hover:text-gray-900 transition">
          Home
        </Link>
        <Link href="/all-products" className="hover:text-gray-900 transition">
          Shop
        </Link>
        <Link href="/" className="hover:text-gray-900 transition">
          About Us
        </Link>
        <Link href="/" className="hover:text-gray-900 transition">
          Contact
        </Link>

        {isSeller && (
          <button
            onClick={() => router.push("/seller")}
            className="text-xs border px-4 py-1.5 rounded-md"
          >
            Seller Dashboarderew
          </button>
        )}
      </div>

      <ul className="hidden md:flex items-center gap-4 ">
        <Image className="w-4 h-4" src={assets.search_icon} alt="search icon" />
        {/* <button
          onClick={openSignIn}
          className="flex items-center gap-2 hover:text-gray-500"
        >
          <Image src={assets.user_icon}></Image>
        </button> */}
      </ul>

      <div className="flex items-center md:hidden gap-3">
        {isSeller && (
          <button
            onClick={() => router.push("/seller")}
            className="text-xs border px-4 py-1.5 rounded-full"
          >
            Seller Dashboard
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
