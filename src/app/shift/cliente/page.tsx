import { projects } from '@/lib/data';
import { placeholderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { LayoutPanelLeft, MapPin, Film, Camera } from 'lucide-react';
import { ProjectCarousel } from '@/components/project-carousel';
import { ProductHeader } from '@/components/shared/product-header';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata = {
  title: 'SHIFT | Vanguard',
  description: 'Life on demand. Apartamentos modernos em Porto Alegre.',
  robots: 'noindex',
};

export default function ShiftClientePage() {
  const project = projects.find((p) => p.slug === 'shift')!;
  const floorPlanImages = project.floorPlanImageIds
    .map(id => placeholderImages.find(img => img.id === id))
    .filter(Boolean);

  return (
    <div className="relative flex min-h-screen flex-col">
      <ProductHeader hideNav />

      <main className="flex-1">
        <div className="bg-shift-brand">
          <article className="flex-1">
            <section className="relative h-[60vh] w-full">
              <div className="absolute inset-0 bg-shift-brand" />
              <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white p-4">
                <Image src="/SHIFT/logo_shift.png" alt="SHIFT Logo" width={300} height={100} className="h-auto" />
                <span className="mt-4 inline-block px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold tracking-wide backdrop-blur-sm">
                  Previsão de entrega: Abril 2029
                </span>
              </div>
            </section>

            <section className="container relative z-20 pt-16 pb-16">
              <Card className="overflow-hidden shadow-2xl">
                <CardContent className="p-4 md:p-8 space-y-12">

                  <div>
                    <h2 className="font-headline text-3xl font-bold text-primary text-center">LIFE ON DEMAND</h2>
                    <p className="mt-4 text-muted-foreground leading-relaxed text-center">{project.description}</p>
                  </div>

                  <Separator />

                  <div>
                    <h2 className="font-headline text-3xl font-bold text-primary flex items-center justify-center gap-3 mb-6">
                      <LayoutPanelLeft className="text-accent" /> Plantas
                    </h2>
                    <ProjectCarousel
                      images={floorPlanImages as any}
                      itemClassName="md:basis-1/2 lg:basis-1/2"
                      aspectRatioClassName="aspect-square"
                    />
                    <div className="text-center mt-6">
                      <p className="text-sm text-muted-foreground mb-2">Clique aqui para conhecer o apartamento decorado</p>
                      <Button asChild size="lg">
                        <Link href="https://drive.google.com/open?id=19ty8sjzOZqh_A0TL8onILqtRlX1rcMr9&usp=drive_fs" target="_blank">
                          <Camera className="mr-2 h-4 w-4" />
                          Fotos Decorado
                        </Link>
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                    <div>
                      <h2 className="font-headline text-3xl font-bold text-primary flex items-center gap-3">
                        <MapPin className="text-accent" /> Localização
                      </h2>
                      <p className="mt-4 text-muted-foreground">{project.location.address}</p>
                      <div className="mt-4 aspect-video w-full overflow-hidden rounded-lg border">
                        <iframe
                          src={`https://maps.google.com/maps?q=${encodeURIComponent(project.location.address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                          width="100%" height="100%" style={{ border: 0 }}
                          allowFullScreen={false} loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          title="Mapa SHIFT"
                        />
                      </div>
                    </div>
                    {project.videoUrl && (
                      <div>
                        <h2 className="font-headline text-3xl font-bold text-primary flex items-center gap-3">
                          <Film className="text-accent" /> Vídeo
                        </h2>
                        <div className="mt-4 aspect-video w-full overflow-hidden rounded-lg border">
                          <iframe
                            src={project.videoUrl.replace('youtu.be/', 'youtube.com/embed/')}
                            title="Vídeo SHIFT"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen className="w-full h-full"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                </CardContent>
              </Card>
            </section>
          </article>
        </div>
      </main>
    </div>
  );
}
