"use client";

import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import Image from "next/image";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { urlFor } from "@/lib/sanity-client";

// TODO: Add zoomable images for customers.
type ProductGalleryProps = {
  images: any[];
  className?: string;
  imgContainerClassName?: string;
  productName?: string;
};

export default function ProductGallery({
  images,
  className = "w-full",
  imgContainerClassName = "h-full aspect-square",
  productName,
}: ProductGalleryProps) {
  const [enableZoom, setEnableZoom] = useState(true);

  useEffect(() => {
    const checkSize = () => setEnableZoom(window.innerWidth > 768); // only zoom on tablets/desktop
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  return (
    <Swiper
      modules={[Pagination, Navigation]}
      spaceBetween={0}
      slidesPerView={1}
      pagination={{ clickable: true }}
      navigation
      loop
      className={`product-gallery-swiper ${className}`}
    >
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <div className={`overflow-hidden ${imgContainerClassName}`}>
            <Image
              src={urlFor(image).width(900).height(900).url()}
              alt={`${productName}-${index + 1}`}
              priority={index === 0}
              width={900}
              height={900}
              className="w-full h-full object-cover transition-transform duration-500 ease-in-out hover:scale-110 bg-softWhite/50"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
