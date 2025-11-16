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
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
  
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
      setSelectedImageIndex(api.selectedScrollSnap());
    });
  }, [api]);

  const openDialog = (index: number) => {
    setSelectedImageIndex(index);
    if(api) {
        api.scrollTo(index);
    }
    setIsDialogOpen(true);
  };
  
  const selectedImage = images[selectedImageIndex];

  const handlePrev = () => {
    if (api) {
        api.scrollPrev();
    }
  }

  const handleNext = () => {
    if (api) {
        api.scrollNext();
    }
  }

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div>
      <Carousel setApi={setApi} className="w-full max-w-4xl mx-auto mt-6">
        <CarouselContent>
          {images.map((image, index) => {
            if (!image) return null;
            return (
              <CarouselItem key={image.id} className={cn("md:basis-1/2", itemClassName)}>
                <Card className="overflow-hidden cursor-pointer" onClick={() => openDialog(index)}>
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
        {current > 0 && count > 0 ? `${current} / ${count}`: ''}
      </div>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-6xl w-full p-2 bg-transparent border-0 flex items-center justify-center">
              {selectedImage && (
                <>
                    <DialogTitle className="sr-only">{selectedImage.description}</DialogTitle>
                    <Button variant="ghost" size="icon" className="absolute left-2 top-1/2 -translate-y-1/2 h-12 w-12 text-white bg-black/20 hover:bg-black/50 hover:text-white" onClick={handlePrev} disabled={!api?.canScrollPrev()}>
                        <ChevronLeft className="h-8 w-8" />
                    </Button>
                    <Image
                        src={selectedImage.imageUrl}
                        alt={selectedImage.description}
                        data-ai-hint={selectedImage.imageHint}
                        width={1600}
                        height={900}
                        className="w-auto h-auto max-h-[90vh] max-w-[80vw] object-contain rounded-lg"
                    />
                    <Button variant="ghost" size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 h-12 w-12 text-white bg-black/20 hover:bg-black/50 hover:text-white" onClick={handleNext} disabled={!api?.canScrollNext()}>
                        <ChevronRight className="h-8 w-8" />
                    </Button>
                </>
              )}
          </DialogContent>
      </Dialog>
    </div>
  );
}