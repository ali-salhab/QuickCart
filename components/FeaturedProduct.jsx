import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";

const products = [
  {
    id: 1,
    image: assets.girl_with_headphone_image,
    title: "Unparalleled Sound",
    description: "Experience crystal-clear audio with premium headphones.",
  },
  {
    id: 2,
    image: assets.girl_with_earphone_image,
    title: "Stay Connected",
    description: "Compact and stylish earphones for every occasion.",
  },
  {
    id: 3,
    image: assets.boy_with_laptop_image,
    title: "Power in Every Pixel",
    description: "Shop the latest laptops for work, gaming, and more.",
  },
];

const FeaturedProduct = () => {
  return (
    <div className="mt-12">
      <div className="flex flex-col ">
        <p className="text-3xl text-center font-medium">Featured Products</p>
        <div className="w-28 h-0.5 bg-gradient-to-r from-transparent via-slate-600 to-transparent mt-2 mx-auto"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-14 mt-12 md:px-14 px-4">
        {products.map(({ id, image, title, description }) => (
          <div key={id} className="relative group">
            <Image
              src={image}
              alt={title}
              className="group-hover:brightness-75 bottom-8 left-8 right-8 transition-all duration-3000  h-auto object-cover"
            />
            <div className="group-hover:-translate-y-4 transition-all duration-3000 absolute   bottom-8 left-8 right-8 text-white space-y-2">
              <p className="font-medium text-xl lg:text-2xl">{title}</p>
              <p className="text-sm lg:text-base leading-5 max-w-60">
                {description}
              </p>

              <div className=" w-full relative h-12 flex justify-center">
                <button className="flex items-center gap-1.5 bg-fuchsia-600 px-4 py-2 rounded text-white font-medium absolute left-0 transition-all duration-1000 ease-in-out group-hover:left-1/2 group-hover:-translate-x-1/2 group-hover:bg-gradient-to-br from-orange-500 to-yellow-500">
                  {" "}
                  Buy now
                  <Image
                    className="h-3 w-3 "
                    src={assets.redirect_icon}
                    alt="Redirect Icon"
                  />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProduct;
