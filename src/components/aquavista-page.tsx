'use client';

import Image from 'next/image';
import Link from 'next/link';
import { placeholderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ProjectCarousel } from '@/components/project-carousel';
import { MapPin, Waves, Palmtree, Building2 } from 'lucide-react';
import type { Project, ProjectHighlight } from '@/lib/types';

const IconMap: { [key: string]: React.ElementType } = {
  Waves,
  Palmtree,
  Building2,
  MapPin,
};

const HighlightCard = ({ highlight }: { highlight: ProjectHighlight }) => {
  const Icon = IconMap[highlight.icon];
  return (
    <Card className="bg-card/80 backdrop-blur-sm border-border/20 shadow-lg">
      <CardContent className="p-6 text-center flex flex-col items-center">
        {Icon && <Icon className="w-10 h-10 mb-4 text-accent" />}
        <h3 className="text-lg font-bold text-primary mb-2">{highlight.title}</h3>
        <p className="text-sm text-muted-foreground">{highlight.description}</p>
      </CardContent>
    </Card>
  );
};

export function AquaVistaPage({ project }: { project: Project }) {
    const heroImage = placeholderImages.find((img) => img.id === project.heroImageId);
    const aboutImage = placeholderImages.find((img) => img.id === project.aboutImageId);
    const galleryImages = (project.galleryImageIds || []).map(id => placeholderImages.find(img => img.id === id)).filter(Boolean);
    const floorPlanImages = (project.floorPlanImageIds || []).map(id => placeholderImages.find(img => img.id === id)).filter(Boolean);

    return (
      <main className="flex-1 bg-background text-foreground font-sans-aquavista">
      <style jsx global>{`
          :root {
          --background: 210 40% 98%;
          --foreground: 215 28% 17.8%;
          --card: 210 40% 100%;
          --card-foreground: 215 28% 17.8%;
          --popover: 210 40% 100%;
          --popover-foreground: 215 28% 17.8%;
          --primary: ${project.theme?.primary || '200 80% 30%'};
          --primary-foreground: ${project.theme?.primaryForeground || '210 40% 98%'};
          --secondary: ${project.theme?.secondary || '210 40% 96.1%'};
          --secondary-foreground: 215 28% 17.8%;
          --muted: 210 40% 90%;
          --muted-foreground: 215 20.2% 44.1%;
          --accent: ${project.theme?.accent || '200 90% 50%'};
          --accent-foreground: 210 40% 98%;
          --destructive: 0 84.2% 60.2%;
          --destructive-foreground: 210 40% 98%;
          --border: 214.3 31.8% 91.4%;
          --input: 214.3 31.8% 91.4%;
          --ring: 215 28% 17.8%;
          }
      `}</style>

      {/* Hero Section */}
      <section className="relative h-[80vh] w-full flex items-center justify-center text-center text-white">
          {heroImage && (
          <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              className="object-cover"
              priority
              data-ai-hint={heroImage.imageHint}
          />
          )}
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 p-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold font-serif-aquavista tracking-tight">
              {project.name}
          </h1>
          <p className="mt-4 text-lg md:text-xl text-white/90">
              {project.description}
          </p>
          <Button asChild size="lg" className="mt-8" variant="aquavista">
              <Link href={project.contactButtonLink || '#'}>QUERO CONHECER</Link>
          </Button>
          </div>
      </section>

      {/* About Section */}
      <section className="py-16 md:py-24 bg-secondary">
          <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">A vida que você sempre sonhou, agora ao seu alcance.</h2>
              <p className="text-muted-foreground leading-relaxed">{project.longDescription}</p>
              </div>
              <div>
              {aboutImage && (
                  <Image
                  src={aboutImage.imageUrl}
                  alt={aboutImage.description}
                  width={600}
                  height={400}
                  className="rounded-lg shadow-2xl object-cover aspect-[4/3]"
                  data-ai-hint={aboutImage.imageHint}
                  />
              )}
              </div>
          </div>
          </div>
      </section>

      {/* Highlights Section */}
      {project.highlights && (
          <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {project.highlights.map((highlight) => (
                  <HighlightCard key={highlight.title} highlight={highlight} />
              ))}
              </div>
          </div>
          </section>
      )}

      {/* Gallery Section */}
      <section className="py-16 md:py-24 bg-secondary">
          <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-12">Galeria de Imagens</h2>
          <ProjectCarousel 
              images={galleryImages as any} 
              itemClassName="md:basis-1/2 lg:basis-1/3" 
              aspectRatioClassName="aspect-video"
          />
          </div>
      </section>

      {/* Floor Plans Section */}
      <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-12">Plantas Flexíveis</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {floorPlanImages.map((image) => {
              if (!image) return null;
              return(
                  <div key={image.id}>
                  <Card className="overflow-hidden shadow-lg">
                      <CardContent className="p-0">
                      <Image
                          src={image.imageUrl}
                          alt={image.description}
                          width={600}
                          height={450}
                          className="object-cover w-full"
                          data-ai-hint={image.imageHint}
                      />
                      </CardContent>
                  </Card>
                  <p className="mt-4 text-muted-foreground">{image.description}</p>
                  </div>
              )
              })}
          </div>
          </div>
      </section>

      {/* Location Section */}
      <section className="py-16 md:py-24 bg-secondary">
          <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">Localização</h2>
          <p className="text-muted-foreground mb-8">{project.location.address}</p>
          <div className="aspect-video w-full max-w-4xl mx-auto overflow-hidden rounded-lg border shadow-lg">
              <iframe
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(project.location.address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Mapa de ${project.name}`}
              ></iframe>
          </div>
          </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Entre em contato</h2>
          <Button asChild size="lg" variant="aquavistaSecondary">
              <Link href={project.contactButtonLink || '#'}>{project.contactButtonText || 'FALAR COM UM CONSULTOR'}</Link>
          </Button>
          </div>
      </section>
      </main>
    );
}
