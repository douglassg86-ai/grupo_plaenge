'use client';

import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';

// Expira em 11/07/2026 às 22h00 (BRT = UTC-3)
const EXPIRY = new Date('2026-07-12T01:00:00Z');
const SESSION_KEY = 'synthe_convite_seen';

export function ConvitePopup() {
  const [open, setOpen] = useState(false);
  const tracked = useRef(false);

  useEffect(() => {
    // Só exibe se dentro do prazo e não foi visto nesta sessão
    if (new Date() >= EXPIRY) return;
    if (sessionStorage.getItem(SESSION_KEY)) return;
    setOpen(true);
  }, []);

  useEffect(() => {
    if (open && !tracked.current) {
      tracked.current = true;
      sessionStorage.setItem(SESSION_KEY, '1');
      fetch('/api/track-video', { method: 'POST' }).catch(() => {});
    }
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(6px)' }}
      onClick={() => setOpen(false)}
    >
      <div
        className="relative w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl"
        style={{ background: '#000' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={() => setOpen(false)}
          className="absolute top-3 right-3 z-10 flex items-center justify-center w-8 h-8 rounded-full transition-colors"
          style={{ background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.2)' }}
          aria-label="Fechar"
        >
          <X className="w-4 h-4 text-white" />
        </button>

        {/* Video */}
        <video
          src="/SYNTHE/convite-sabado.mp4"
          autoPlay
          controls
          playsInline
          className="w-full"
          style={{ display: 'block', maxHeight: '80vh' }}
        />
      </div>
    </div>
  );
}
