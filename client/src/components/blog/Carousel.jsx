import React from "react";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Link } from "react-router-dom";
const CarouselComponent = ({ blogs }) => {
  return (
    <Carousel className="relative ">
      <CarouselContent className="">
        {blogs.map((blog, index) => (
          <CarouselItem key={index} className="w-full">
            <Link to={`/blog/${blog.slug}`}>
              <div className="p-1">
                <Card>
                  <CardContent className="w-full">
                    <div className="relative">
                      <img
                        src={`http://localhost:3000` + blogs[index]?.image}
                        className="w-full h-[400px] object-cover rounded-md hover:scale-105 transition-all duration-300"
                      />
                      <div className="absolute bottom-10 left-10  bg-slate-50 line-clamp-2">
                        <h1 className="text-2xl font-semibold">
                          {blogs[index]?.title}
                        </h1>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="mx-4 scale-120" />
      <CarouselNext className="mx-4" />
    </Carousel>
  );
};

export default CarouselComponent;
