"use client";

import Carousel from "@/components/ui/carousel";
export function CaraouselHero() {
  const slideData = [
    {
      title: "Mystic Mountains",
      button: "Explore Component",
      src: "https://i.pinimg.com/1200x/6f/cd/fc/6fcdfc09651455d3c77a2e1285239eb9.jpg",
    },
    {
      title: "Urban Dreams",
      button: "Explore Component",
      src: "https://i.pinimg.com/1200x/b9/87/a7/b987a7d218dec390fa29ccea13b6c501.jpg",
    },
    {
      title: "Neon Nights",
      button: "Explore Component",
      src: "https://i.pinimg.com/1200x/27/25/62/272562610ef58465796fb0a85afc1101.jpg",
    },
    {
      title: "Desert Whispers",
      button: "Explore Component",
      src: "https://i.pinimg.com/1200x/cf/21/6e/cf216ef4e57392a8b8eb3230cc006122.jpg",
    },
  ];
  return (
    <div className="relative overflow-hidden w-full h-full py-20">
      <Carousel slides={slideData} />
    </div>
  );
}
