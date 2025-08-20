"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Zoom } from "swiper/modules";
import { urlFor } from "@/lib/sanityClient";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/zoom";

type ProductGalleryProps = {
  images: any[];
  className?: string; // allows passing width/height classes
  imgContainerClassName?: string; // optional extra styling for image container
};

export default function ProductGallery({
  images,
  className = "w-full",
  imgContainerClassName = "h-auto aspect-square",
}: ProductGalleryProps) {
  return (
    <>
      <Swiper
        modules={[Pagination, Zoom]}
        spaceBetween={0}
        slidesPerView={1}
        pagination={{ clickable: true }}
        zoom={true}
        className={`${className}`}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className={`overflow-hidden ${imgContainerClassName}`}>
              <img
                src={urlFor(image).width(500).height(500).url()}
                alt={`Photo ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 ease-in-out hover:scale-110 origin-bottom"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        .swiper-pagination-bullet {
          background-color: #fadadd;
        }
        .swiper-pagination-bullet-active {
          background-color: #fadadd/60;
        }
      `}</style>
    </>
  );
}
