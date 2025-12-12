
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Phone, Linkedin, Instagram } from 'lucide-react';
import Link from 'next/link';

const EXECUTIVE_PHONE = '5551980800821';
const WHATSAPP_MESSAGE = encodeURIComponent('Olá, Douglas! Tenho interesse no Wave Home Resort.');
const WHATSAPP_URL = `https://wa.me/${EXECUTIVE_PHONE}?text=${WHATSAPP_MESSAGE}`;
const INSTAGRAM_URL = "https://www.instagram.com/douglas.executivo.imob?igsh=MWg2enh3ajg3am1vZg==";
const LINKEDIN_URL = "https://www.linkedin.com/in/douglas-gon%C3%A7alves-804b5020/";

export default function ExecutiveContact() {
  return (
    <div className="bg-card border rounded-lg p-6 flex flex-col items-center gap-4">
      <div className="relative h-32 w-32 rounded-full overflow-hidden">
        <Image src="/WAVE/fotodouglas.jpg" alt="Douglas Gonçalves" fill className="object-cover" data-ai-hint="person face" />
      </div>
      <div className="text-center">
        <h3 className="text-2xl font-bold text-primary">Douglas Gonçalves</h3>
        <p className="text-md text-muted-foreground">Executivo Comercial WAVE</p>
      </div>
      <div className="flex items-center justify-center gap-4 mt-2">
        <Button asChild variant="outline" size="icon" className="rounded-full h-14 w-14 border-border">
            <Link href={WHATSAPP_URL} target="_blank" aria-label="WhatsApp">
                <Phone className="h-6 w-6 text-muted-foreground"/>
            </Link>
        </Button>
        <Button asChild variant="outline" size="icon" className="rounded-full h-14 w-14 border-border">
            <Link href={INSTAGRAM_URL} target="_blank" aria-label="Instagram">
                <Instagram className="h-6 w-6 text-muted-foreground" />
            </Link>
        </Button>
        <Button asChild variant="outline" size="icon" className="rounded-full h-14 w-14 border-border">
            <Link href={LINKEDIN_URL} target="_blank" aria-label="LinkedIn">
                <Linkedin className="h-6 w-6 text-muted-foreground" />
            </Link>
        </Button>
      </div>
    </div>
  );
}
