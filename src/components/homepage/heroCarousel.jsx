"use client";

import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";

export function CarouselPlugin() {
  const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: true }));

  const slides = [
    {
      image: "https://www.startech.com.bd/image/cache/catalog/home/banner/2025/eid_ul_adha_notice/home-appliances-banner-982x500.webp",
      title: "Premium Home Appliances",
      subtitle: "Up to 40% Off",
      cta: "Shop Now",
      link: "/products"
    },
    {
      image: "https://www.startech.com.bd/image/cache/catalog/home/banner/2026/bkash-offer-new-user-982x500.webp",
      title: "Exclusive Mobile Offers",
      subtitle: "Special Cashback Deals",
      cta: "Explore Offers",
      link: "/products"
    },
    {
      image: "https://www.startech.com.bd/image/cache/catalog/home/banner/2025/gyeser-offer-home-banner-982x500.webp",
      title: "Gaming Essentials",
      subtitle: "Next-Gen Gaming Gear",
      cta: "Discover Now",
      link: "/products"
    },
  ];

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full max-w-6xl mx-auto"
      opts={{
        align: "start",
        loop: true,
      }}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {slides.map((slide, index) => (
          <CarouselItem
            key={index}
            className="w-full flex-shrink-0"
          >
            <div className="p-1">
              <Card className="border-0 shadow-xl rounded-2xl overflow-hidden">
                <div 
                  className="relative w-full aspect-[20/10] sm:aspect-[21/12] md:aspect-[24/10] lg:aspect-[30/16] xl:aspect-[32/16] bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage: `url(${slide.image})`,
                  }}
                >
                  
                </div>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white/90 hover:bg-white text-gray-800 shadow-lg border-0 rounded-full" />
      <CarouselNext className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white/90 hover:bg-white text-gray-800 shadow-lg border-0 rounded-full" />
    </Carousel>
  );
}
