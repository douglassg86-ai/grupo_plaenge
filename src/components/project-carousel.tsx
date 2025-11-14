"use client";

import * as React from "react";
import Image from 'next/image';
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import type { ImagePlaceholder } from "@/lib/placeholder-images";

type ProjectCarouselProps = {
  images: ImagePlaceholder[];
  imageClassName?: string;
  itemClassName?: string;
  aspectRatioClassName?: string;
};

export function ProjectCarousel({ images, imageClassName, itemClassName, aspectRatioClassName = "aspect-video" }: ProjectCarouselProps) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div>
      <Carousel setApi={setApi} className="w-full max-w-4xl mx-auto mt-6">
        <CarouselContent>
          {images.map((image) => {
            if (!image) return null;
            return (
              <CarouselItem key={image.id} className={cn("md:basis-1/2", itemClassName)}>
                <Card className="overflow-hidden">
                  <CardContent className={cn("p-0 relative flex items-center justify-center", aspectRatioClassName)}>
                    <Image
                      src={image.imageUrl}
                      alt={image.description}
                      data-ai-hint={image.imageHint}
                      width={800}
                      height={600}
                      className={cn("object-cover w-full h-full", imageClassName)}
                    />
                  </CardContent>
                </Card>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="ml-14" />
        <CarouselNext className="mr-14" />
      </Carousel>
      <div className="py-2 text-center text-sm text-muted-foreground">
        {current} / {count}
      </div>
    </div>
  );
}
