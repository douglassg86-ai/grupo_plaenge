import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Phone } from 'lucide-react';

const EXECUTIVE_PHONE = '5551980800821';
const WHATSAPP_MESSAGE = encodeURIComponent('Olá, tenho interesse em um lote no Wave Home Resort.');
const WHATSAPP_URL = `https://wa.me/${EXECUTIVE_PHONE}?text=${WHATSAPP_MESSAGE}`;

export default function ExecutiveContact() {
  return (
    <div className="bg-secondary/50 rounded-lg p-6 flex flex-col sm:flex-row items-center gap-6">
      <div className="relative h-24 w-24 rounded-full overflow-hidden shrink-0">
        <Image src="/fotodouglas.jpg" alt="Douglas Gonçalves" layout="fill" objectFit="cover" data-ai-hint="person face" />
      </div>
      <div className="text-center sm:text-left">
        <p className="text-sm text-muted-foreground">Fale com nosso especialista</p>
        <h3 className="text-xl font-bold text-primary">Douglas Gonçalves</h3>
        <p className="text-sm text-muted-foreground">Executivo de Vendas</p>
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
