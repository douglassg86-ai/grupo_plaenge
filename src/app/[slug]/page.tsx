import { notFound } from 'next/navigation';
import Image from 'next/image';
import { projects } from '@/lib/data';
import { placeholderImages } from '@/lib/placeholder-images';
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { MapPin, Film, BedDouble, CheckCircle, XCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  const mapImage = placeholderImages.find((img) => img.id === project.location.mapImageId);
  const galleryImages = project.galleryImageIds.map(id => placeholderImages.find(img => img.id === id)).filter(Boolean);
  const floorPlanImages = project.floorPlanImageIds.map(id => placeholderImages.find(img => img.id === id)).filter(Boolean);

  return (
    <article className="flex-1">
      <section className="relative h-[60vh] w-full">
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
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white p-4">
          <Badge className="mb-4 bg-white/20 text-white backdrop-blur-sm border-0 text-lg">{project.brand}</Badge>
          <h1 className="font-headline text-5xl md:text-7xl font-bold">{project.name}</h1>
        </div>
      </section>

      <section className="container -mt-20 md:-mt-32 relative z-20 pb-16">
        <Card className="overflow-hidden shadow-2xl">
          <CardContent className="p-4 md:p-8 space-y-12">
            
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
                 <Carousel className="w-full max-w-4xl mx-auto mt-6">
                    <CarouselContent>
                      {galleryImages.map((image) => image && (
                        <CarouselItem key={image.id} className="md:basis-1/2 lg:basis-1/3">
                            <Card className="overflow-hidden h-96">
                                <Image src={image.imageUrl} alt={image.description} data-ai-hint={image.imageHint} fill className="object-cover"/>
                            </Card>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="ml-14" />
                    <CarouselNext className="mr-14" />
                </Carousel>
              </TabsContent>
              <TabsContent value="floor-plans">
                <Carousel className="w-full max-w-4xl mx-auto mt-6">
                    <CarouselContent>
                      {floorPlanImages.map((image) => image && (
                        <CarouselItem key={image.id} className="md:basis-1/2">
                           <Card className="overflow-hidden h-[500px]">
                                <Image src={image.imageUrl} alt={image.description} data-ai-hint={image.imageHint} fill className="object-contain p-4"/>
                            </Card>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="ml-14" />
                    <CarouselNext className="mr-14" />
                </Carousel>
              </TabsContent>
            </Tabs>
            
            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-headline text-3xl font-bold text-primary flex items-center gap-3"><MapPin className="text-accent" /> Localização</h2>
                <p className="mt-4 text-muted-foreground">{project.location.address}</p>
                 {mapImage && (
                    <div className="mt-4 aspect-video w-full overflow-hidden rounded-lg border">
                        <Image src={mapImage.imageUrl} alt={mapImage.description} width={800} height={600} className="w-full h-full object-cover" data-ai-hint={mapImage.imageHint} />
                    </div>
                 )}
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
              <h2 className="font-headline text-3xl font-bold text-primary mb-6 flex items-center gap-3"><BedDouble className="text-accent"/> Unidades Disponíveis</h2>
              <Card>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Unidade</TableHead>
                      <TableHead>Tipologia</TableHead>
                      <TableHead className="text-right">Área (m²)</TableHead>
                      <TableHead className="text-center">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {project.availability.map((unit) => (
                      <TableRow key={unit.unit}>
                        <TableCell className="font-medium">{unit.unit}</TableCell>
                        <TableCell>{unit.type}</TableCell>
                        <TableCell className="text-right">{unit.area.toFixed(2)}</TableCell>
                        <TableCell className="text-center">
                          <Badge variant={unit.status === 'Disponível' ? 'default' : 'secondary'} className={cn(unit.status === 'Disponível' ? 'bg-accent/80 text-accent-foreground' : 'bg-muted')}>
                            {unit.status === 'Disponível' ? <CheckCircle className="mr-2 h-4 w-4"/> : <XCircle className="mr-2 h-4 w-4"/>}
                            {unit.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </div>

          </CardContent>
        </Card>
      </section>
    </article>
  );
}
