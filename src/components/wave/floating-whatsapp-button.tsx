'use client';

import Link from 'next/link';
import { Button } from '../ui/button';
import { Phone } from 'lucide-react';

const EXECUTIVE_PHONE = '5551980800821';
const WHATSAPP_MESSAGE = encodeURIComponent('Olá, Douglas! Tenho interesse no Wave Home Resort.');
const WHATSAPP_URL = `https://wa.me/${EXECUTIVE_PHONE}?text=${WHATSAPP_MESSAGE}`;


export default function FloatingWhatsAppButton() {
  return (
    <Button
      asChild
      size="lg"
      className="fixed bottom-6 right-6 z-50 h-16 w-16 rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110 hover:bg-[#128C7E]"
      aria-label="Fale conosco pelo WhatsApp"
    >
      <Link
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Phone className="h-8 w-8" />
      </Link>
    </Button>
  );
}
