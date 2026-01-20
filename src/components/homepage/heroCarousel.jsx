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
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));

  const bgImages = [
    "https://www.startech.com.bd/image/cache/catalog/home/banner/2025/eid_ul_adha_notice/home-appliances-banner-982x500.webp",
    "https://www.startech.com.bd/image/cache/catalog/home/banner/2026/bkash-offer-new-user-982x500.webp",
    "https://www.startech.com.bd/image/cache/catalog/home/banner/2025/gyeser-offer-home-banner-982x500.webp",
  ];

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-5/6 "
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {bgImages.map((_, index) => (
          <CarouselItem key={index} className="w-full flex-shrink-0 px-2">
            <div className="p-1">
              <Card
                className="h-[80vh]"
                style={{
                  backgroundImage: `url(${bgImages[index]})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <CardContent className="flex  items-center justify-center p-6">
               
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
