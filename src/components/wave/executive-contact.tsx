
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
    <div className="bg-card border rounded-lg p-6 flex flex-col sm:flex-row items-center gap-6">
      <div className="relative h-24 w-24 rounded-full overflow-hidden shrink-0">
        <Image src="/WAVE/fotodouglas.jpg" alt="Douglas Gonçalves" fill className="object-cover" data-ai-hint="person face" />
      </div>
      <div className="text-center sm:text-left">
        <p className="text-sm text-muted-foreground">Fale com nosso especialista</p>
        <h3 className="text-xl font-bold text-primary">Douglas Gonçalves</h3>
        <p className="text-sm text-muted-foreground">Executivo de Vendas</p>
         <div className="flex items-center justify-center sm:justify-start gap-2 mt-2">
            <Button asChild variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                <Link href={WHATSAPP_URL} target="_blank"><Phone className="h-5 w-5"/></Link>
            </Button>
            <Button asChild variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                <Link href={INSTAGRAM_URL} target="_blank"><Instagram className="h-5 w-5" /></Link>
            </Button>
            <Button asChild variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                <Link href={LINKEDIN_URL} target="_blank"><Linkedin className="h-5 w-5" /></Link>
            </Button>
        </div>
      </div>
      <Button asChild className="sm:ml-auto w-full sm:w-auto">
        <a href={WHATSAPP_URL} target="_blank">
          <Phone className="mr-2" />
          Chamar no WhatsApp
        </a>
      </Button>
    </div>
  );
}
