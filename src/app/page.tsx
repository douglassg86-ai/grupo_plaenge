import Link from 'next/link';
import Image from 'next/image';
import { projects } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { placeholderImages } from '@/lib/placeholder-images';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { HomeHeroSlideshow } from '@/components/home-hero-slideshow';

export default function Home() {
  const plaengeProjects = projects.filter((p) => p.brand === 'Plaenge');
  const vanguardProjects = projects.filter((p) => p.brand === 'Vanguard');
  const heroImage = placeholderImages.find(img => img.id === 'home-hero');

  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <section className="relative h-[65vh] flex flex-col items-center justify-center text-center text-white">
          <HomeHeroSlideshow />
          <div className="relative z-10 p-4 flex flex-col items-center">
            <Image
              src="/INSTITUCIONAL/logo_plaenge_vanguard_escuro.webp"
              alt="Plaenge | Vanguard"
              width={600}
              height={46}
              priority
              className="w-72 md:w-[480px] lg:w-[600px] h-auto"
            />
            <p className="mt-6 max-w-2xl text-lg md:text-xl text-primary-foreground/90">
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

            {[
              { brand: 'Plaenge', projects: plaengeProjects, logo: '/INSTITUCIONAL/logo_plaenge_claro.webp', logoW: 220, logoH: 52, logoClass: 'h-10 md:h-12 w-auto' },
              { brand: 'Vanguard', projects: vanguardProjects, logo: '/INSTITUCIONAL/logo_vanguard_claro.webp', logoW: 220, logoH: 52, logoClass: 'h-7 md:h-8 w-auto' },
            ].map(({ brand, projects, logo, logoW, logoH, logoClass }) => (
              <div key={brand} className="mb-16">
                <div className="flex justify-center mb-8">
                  <Image
                    src={logo}
                    alt={brand}
                    width={logoW}
                    height={logoH}
                    className={logoClass}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {projects.map((project) => {
                    const projectHero = placeholderImages.find(img => img.id === project.heroImageId);
                    return (
                      <Link href={`/${project.slug}`} key={project.id} className="group col-span-1">
                        <Card className="h-full w-full overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                          <CardContent className="p-0 relative h-96">
                            {projectHero && (
                              <Image
                                src={projectHero.imageUrl}
                                alt={projectHero.description}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                style={{ objectPosition: (projectHero as { imagePosition?: string }).imagePosition || 'center 50%' }}
                                data-ai-hint={projectHero.imageHint}
                              />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                            {project.deliveryLabel && (
                              <div className="absolute top-0 left-0 right-0">
                                <div
                                  className="w-full py-1.5 text-center text-xs font-semibold tracking-widest uppercase"
                                  style={{
                                    background: project.deliveryLabel === '100% Vendido'
                                      ? 'rgba(220,38,38,0.90)'
                                      : project.deliveryLabel.startsWith('Pronto')
                                      ? 'rgba(34,197,94,0.85)'
                                      : project.deliveryLabel === 'Pré-lançamento'
                                      ? 'rgba(234,179,8,0.85)'
                                      : 'rgba(0,0,0,0.55)',
                                    backdropFilter: 'blur(4px)',
                                    color: '#fff',
                                    letterSpacing: '0.12em',
                                  }}
                                >
                                  {project.deliveryLabel}
                                </div>
                              </div>
                            )}
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

            {/* Seção DAÇÕES — fora das bandeiras Plaenge / Vanguard */}
            <div className="mt-4 mb-4">
              <div className="flex items-center gap-4 mb-8">
                <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(212,175,55,0.3), transparent)' }} />
                <span className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: '#9CA3AF' }}>Dações</span>
                <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(212,175,55,0.3), transparent)' }} />
              </div>

              <Link href="/dacoes" className="group block max-w-2xl mx-auto">
                <Card className="w-full overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2" style={{ background: '#0A0A0A', border: '1px solid rgba(212,175,55,0.25)' }}>
                  <CardContent className="p-0 relative h-72">
                    <Image
                      src="/DACOES/parador/parador_05.webp"
                      alt="Dações"
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      style={{ objectPosition: 'center 50%', opacity: 0.75 }}
                    />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.4) 50%, rgba(10,10,10,0.2) 100%)' }} />
                    {/* Ribbon dourado */}
                    <div className="absolute top-0 left-0 right-0">
                      <div
                        className="w-full py-1.5 text-center text-xs font-semibold tracking-widest uppercase"
                        style={{ background: 'rgba(212,175,55,0.85)', color: '#0A0A0A', letterSpacing: '0.18em' }}
                      >
                        Oportunidade Exclusiva
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 p-6 text-white">
                      <span className="inline-block mb-2 px-2.5 py-0.5 rounded text-xs font-semibold" style={{ background: 'rgba(212,175,55,0.2)', color: '#D4AF37', border: '1px solid rgba(212,175,55,0.4)' }}>
                        Dação em Pagamento
                      </span>
                      <h4 className="font-headline text-2xl font-bold">DAÇÕES</h4>
                      <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.65)' }}>2 apartamentos de alto padrão · Porto Alegre</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
