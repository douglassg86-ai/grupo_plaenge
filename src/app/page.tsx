import Link from 'next/link';
import Image from 'next/image';
import { projects } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { placeholderImages } from '@/lib/placeholder-images';

export default function Home() {
  const plaengeProjects = projects.filter((p) => p.brand === 'Plaenge');
  const vanguardProjects = projects.filter((p) => p.brand === 'Vanguard');
  const heroImage = placeholderImages.find(img => img.id === 'home-hero');

  return (
    <main className="flex-1">
      <section className="relative h-[calc(100vh-5rem)] flex flex-col items-center justify-center text-center text-white">
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
        <div className="absolute inset-0 bg-primary/70" />
        <div className="relative z-10 p-4">
          <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight">
            Plaenge &amp; Vanguard
          </h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl text-primary-foreground/90">
            Descubra um novo padrão de vida com nossos empreendimentos de luxo e inovação.
          </p>
        </div>
        <a href="#projects" className="absolute bottom-10 z-10 animate-bounce">
          <ArrowDown className="h-8 w-8 text-white" />
          <span className="sr-only">Scroll to projects</span>
        </a>
      </section>

      <section id="projects" className="py-16 sm:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-headline text-4xl md:text-5xl font-bold text-foreground">
              Nossos Empreendimentos
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-muted-foreground text-lg">
              Conheça os projetos que redefinem o conceito de morar bem.
            </p>
          </div>

          {[{ brand: 'Plaenge', projects: plaengeProjects }, { brand: 'Vanguard', projects: vanguardProjects }].map(({ brand, projects }) => (
            <div key={brand} className="mb-16">
              <h3 className="font-headline text-3xl md:text-4xl font-bold mb-8 text-center text-primary">{brand}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {projects.map((project, index) => {
                  const projectHero = placeholderImages.find(img => img.id === project.heroImageId);
                  return (
                    <Link href={`/${project.slug}`} key={project.id} className={cn("group col-span-1", (brand === 'Plaenge' && index === 0) ? 'lg:col-span-2' : '', (brand === 'Vanguard' && index === 1) ? 'lg:col-span-2' : '')}>
                      <Card className="h-full w-full overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                        <CardContent className="p-0 relative h-96">
                          {projectHero && (
                            <Image
                              src={projectHero.imageUrl}
                              alt={projectHero.description}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                              data-ai-hint={projectHero.imageHint}
                            />
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                          <div className="absolute bottom-0 left-0 p-6 text-white">
                            <Badge variant="secondary" className="mb-2 bg-white/20 text-white backdrop-blur-sm border-0">{project.brand}</Badge>
                            <h4 className="font-headline text-2xl font-bold">{project.name}</h4>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}