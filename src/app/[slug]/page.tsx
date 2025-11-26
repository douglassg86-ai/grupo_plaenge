
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { projects } from '@/lib/data';
import { placeholderImages } from '@/lib/placeholder-images';
import type { Metadata } from 'next';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { MapPin, Film, BedDouble, LayoutPanelLeft, Mail } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProjectCarousel } from '@/components/project-carousel';
import { AvailabilityGrid } from '@/components/availability-grid';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { ConventionPopup } from '@/components/convention-popup';
import { Button } from '@/components/ui/button';
import { FloatingWhatsAppButton } from '@/components/floating-whatsapp-button';

type ProjectPageProps = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    return {};
  }

  return {
    title: `${project.name} | ${project.brand}`,
    description: project.description,
  };
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  const heroImage = placeholderImages.find((img) => img.id === project.heroImageId);
  const galleryImages = project.galleryImageIds.map(id => placeholderImages.find(img => img.id === id)).filter(Boolean);
  const floorPlanImages = project.floorPlanImageIds.map(id => placeholderImages.find(img => img.id === id)).filter(Boolean);
  const bannerImages = (project.bannerImageIds || []).map(id => placeholderImages.find(img => img.id === id)).filter(Boolean);


  const PageContent = () => (
    <div className={cn(project.slug === 'shift' ? 'bg-shift-brand' : 'bg-background')}>
      {project.slug === 'shift' && <ConventionPopup />}
      {project.slug === 'shift' && <FloatingWhatsAppButton phoneNumber="5551980800821" message="Olá! Gostaria de mais informações sobre o empreendimento SHIFT." />}
      <article className="flex-1">
        <section className="relative h-[60vh] w-full">
          {heroImage && project.slug !== 'shift' && (
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              className="object-cover"
              priority
              data-ai-hint={heroImage.imageHint}
            />
          )}
          <div className={cn(
              "absolute inset-0",
              project.slug === 'shift' ? "bg-shift-brand" : "bg-gradient-to-t from-black/70 to-transparent"
          )} />
          <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white p-4">
            {project.slug === 'shift' ? (
              <>
                  <Badge className="mb-4 bg-white/20 text-white backdrop-blur-sm border-0 text-lg">{project.brand}</Badge>
                  <Image
                      src="/SHIFT/logo_shift.png"
                      alt="SHIFT Logo"
                      width={300}
                      height={100}
                      className="h-auto"
                  />
              </>
            ) : (
              <>
                  <Badge className="mb-4 bg-white/20 text-white backdrop-blur-sm border-0 text-lg">{project.brand}</Badge>
                  <h1 className="font-headline text-5xl md:text-7xl font-bold">{project.name}</h1>
              </>
            )}
          </div>
        </section>

        <section className={cn(
            "container relative z-20 pb-16",
            project.slug === 'shift' ? 'pt-16' : '-mt-20 md:-mt-32'
          )}>
          <Card className="overflow-hidden shadow-2xl">
            <CardContent className="p-4 md:p-8 space-y-12">
              
              {project.slug === 'shift' ? (
                <div>
                  <ProjectCarousel 
                    images={bannerImages as any} 
                    itemClassName="lg:basis-1/1" 
                    aspectRatioClassName="aspect-[2/1]"
                    autoplay
                  />
                </div>
              ) : (
                <>
                  <div>
                    <h2 className="font-headline text-3xl font-bold text-primary">Sobre o Empreendimento</h2>
                    <p className="mt-4 text-muted-foreground leading-relaxed">{project.description}</p>
                  </div>

                  <Separator />

                  <Tabs defaultValue="gallery">
                    <div className="text-center">
                      <h2 className="font-headline text-3xl font-bold text-primary mb-2">Conheça os detalhes</h2>
                      <TabsList>
                        <TabsTrigger value="gallery">Galeria</TabsTrigger>
                        <TabsTrigger value="floor-plans">Plantas</TabsTrigger>
                      </TabsList>
                    </div>
                    <TabsContent value="gallery">
                      <ProjectCarousel 
                        images={galleryImages as any} 
                        itemClassName="md:basis-1/2 lg:basis-1/3" 
                        aspectRatioClassName="aspect-video"
                        />
                    </TabsContent>
                    <TabsContent value="floor-plans">
                      <ProjectCarousel 
                        images={floorPlanImages as any}
                        itemClassName="md:basis-1/2 lg:basis-1/3"
                        aspectRatioClassName="aspect-square"
                      />
                    </TabsContent>
                  </Tabs>
                </>
              )}
              
              <Separator />

              {project.slug === 'shift' && (
                <>
                  <div>
                    <h2 className="font-headline text-3xl font-bold text-primary text-center">LIFE ON DEMAND</h2>
                    <p className="mt-4 text-muted-foreground leading-relaxed text-center">{project.description}</p>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h2 className="font-headline text-3xl font-bold text-primary flex items-center justify-center gap-3 mb-6"><LayoutPanelLeft className="text-accent"/> Plantas</h2>
                    <ProjectCarousel 
                      images={floorPlanImages as any}
                      itemClassName="md:basis-1/2 lg:basis-1/2"
                      aspectRatioClassName="aspect-square"
                    />
                  </div>
                </>
              )}


              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                <div>
                  <h2 className="font-headline text-3xl font-bold text-primary flex items-center gap-3"><MapPin className="text-accent" /> Localização</h2>
                  <p className="mt-4 text-muted-foreground">{project.location.address}</p>
                   <div className="mt-4 aspect-video w-full overflow-hidden rounded-lg border">
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
                 {project.videoUrl && (
                    <div>
                      <h2 className="font-headline text-3xl font-bold text-primary flex items-center gap-3"><Film className="text-accent" /> Vídeo</h2>
                      <div className="mt-4 aspect-video w-full overflow-hidden rounded-lg border">
                        <iframe
                          src={project.videoUrl}
                          title={`Vídeo ${project.name}`}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="w-full h-full"
                        ></iframe>
                      </div>
                    </div>
                  )}
              </div>

              <Separator />
              
              <div>
                <h2 className="font-headline text-3xl font-bold text-primary mb-6 flex items-center gap-3"><BedDouble className="text-accent"/> Espelho de Vendas</h2>
                {project.slug === 'shift' ? (
                  <AvailabilityGrid availability={project.availability} />
                ) : (
                  <Card>
                    <p className="p-4 text-muted-foreground">Tabela de disponibilidade não implementada para este projeto.</p>
                  </Card>
                )}
              </div>

              {project.slug === 'shift' && (
                <>
                  <Separator />
                  <div>
                    <h2 className="font-headline text-3xl font-bold text-primary text-center">Envio de Pastas</h2>
                    <p className="mt-4 text-muted-foreground leading-relaxed text-center">Clique no botão abaixo para enviar a documentação do seu cliente e garantir a unidade.</p>
                    <div className="mt-6 text-center">
                      <Button asChild size="lg">
                        <Link href="mailto:pastas_poa@vanguard.com.br,do.goncalves@vanguard.com.br">
                          <Mail className="mr-2 h-4 w-4" />
                          Envie suas pastas
                        </Link>
                      </Button>
                    </div>
                  </div>
                </>
              )}

            </CardContent>
          </Card>
        </section>
      </article>
    </div>
  );

  if (project.slug === 'shift') {
    return <PageContent />;
  }

  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader />
      <div className="flex-1">
        <PageContent />
      </div>
      <SiteFooter />
    </div>
  );
}
