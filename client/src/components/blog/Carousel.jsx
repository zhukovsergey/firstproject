import React, { useRef } from "react";
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
  const plugin = useRef(Autoplay({ delay: 3500, stopOnInteraction: true }));
  return (
    <Carousel
      plugins={[plugin.current]}
      className="relative "
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent className="">
        {blogs.map((blog, index) => (
          <>
            {index < 4 && (
              <CarouselItem key={index} className="w-full">
                <Link to={`/blog/${blog.slug}`}>
                  <div className="p-1">
                    <Card>
                      <CardContent className="w-full">
                        <div className="relative w-full overflow-hidden">
                          <img
                            src={`http://localhost:3000` + blogs[index]?.image}
                            className="w-full h-[400px] object-cover rounded-md hover:scale-105 transition-all duration-300"
                          />
                          <div className="absolute bottom-10 left-5  rounded-lg  line-clamp-2 w-[90%] ">
                            <h1 className="text-xl font-semibold px-2 md:text-2xl  mx-2 w-full bg-slate-50/70 rounded-lg line-clamp-2">
                              {blogs[index]?.title}a
                            </h1>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </Link>
              </CarouselItem>
            )}
          </>
        ))}
      </CarouselContent>
      <CarouselPrevious className="mx-4 scale-120" />
      <CarouselNext className="mx-4" />
    </Carousel>
  );
};

export default CarouselComponent;
