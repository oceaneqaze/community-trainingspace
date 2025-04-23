
import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";

const CommunityPreview = () => {
  return (
    <section className="py-8 bg-background">
      <div className="px-2 sm:container sm:px-4 md:px-6">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-center mb-8">
          Aperçu de la Communauté DOPE Content
        </h2>
        <div className="max-w-5xl mx-auto">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              <CarouselItem className="basis-full md:basis-1/2">
                <Card className="overflow-hidden">
                  <img
                    src="/lovable-uploads/1bb3dc7d-9812-476d-b68a-9c132004f845.png"
                    alt="Création de contenu"
                    className="w-full h-auto object-cover aspect-[16/9]"
                  />
                </Card>
              </CarouselItem>
              <CarouselItem className="basis-full md:basis-1/2">
                <Card className="overflow-hidden">
                  <img
                    src="/lovable-uploads/637e5c9a-9244-4241-918f-50ca6937921c.png"
                    alt="Bibliothèque de vidéos"
                    className="w-full h-auto object-cover aspect-[16/9]"
                  />
                </Card>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default CommunityPreview;
