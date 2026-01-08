
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Phone } from 'lucide-react';
import Link from 'next/link';

const executives = [
  {
    name: 'Paulo Peano',
    title: 'Executivo Comercial WAVE',
    phone: '5551994013918',
    image: '/WAVE/paulo_peano.png',
    whatsappMessage: 'Olá, Paulo! Tenho interesse no Wave Home Resort.',
  },
  {
    name: 'Rodrigo Bernhardt',
    title: 'Executivo Comercial WAVE',
    phone: '5551992533412',
    image: '/WAVE/rodrigo_bernhardt.png',
    whatsappMessage: 'Olá, Rodrigo! Tenho interesse no Wave Home Resort.',
  },
];

const ExecutiveCard = ({ executive }: { executive: typeof executives[0] }) => {
    const whatsappUrl = `https://wa.me/${executive.phone}?text=${encodeURIComponent(executive.whatsappMessage)}`;
    return (
        <div className="bg-card border rounded-lg p-6 flex flex-col items-center gap-4 w-full">
            <div className="relative h-32 w-32 rounded-full overflow-hidden">
                <Image src={executive.image} alt={executive.name} fill className="object-cover" data-ai-hint="person face" />
            </div>
            <div className="text-center">
                <h3 className="text-2xl font-bold text-primary">{executive.name}</h3>
                <p className="text-md text-muted-foreground">{executive.title}</p>
            </div>
            <div className="flex items-center justify-center gap-4 mt-2">
                <Button asChild variant="outline" size="icon" className="rounded-full h-14 w-14 border-border">
                    <Link href={whatsappUrl} target="_blank" aria-label="WhatsApp">
                        <Phone className="h-6 w-6 text-muted-foreground"/>
                    </Link>
                </Button>
            </div>
        </div>
    )
}


export default function ExecutiveContact() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {executives.map((exec) => (
        <ExecutiveCard key={exec.name} executive={exec} />
      ))}
    </div>
  );
}
