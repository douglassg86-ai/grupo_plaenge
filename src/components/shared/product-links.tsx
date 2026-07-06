'use client';

import { Table2, BookOpen, Image as ImageIcon, Video, Globe, Copy, Check, FileText, LayoutTemplate, Camera } from 'lucide-react';
import { useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';
import { managers } from '@/lib/managers';

export interface ProductLinksConfig {
  tabela?: string;
  book?: string;
  imagens?: string;
  plantas?: string;
  fotosDecorado?: string;
  reels?: string;
  video?: string;
  site?: string;
  clienteSlug: string;
}

function LinkButton({ href, icon: Icon, label, variant = 'outline' }: {
  href: string;
  icon: React.ElementType;
  label: string;
  variant?: 'outline' | 'primary';
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
        variant === 'primary'
          ? 'bg-primary text-primary-foreground border-primary hover:bg-primary/90'
          : 'bg-background text-foreground border-border hover:bg-muted'
      }`}
    >
      <Icon className="w-4 h-4" />
      {label}
    </a>
  );
}

export function ProductLinks({ config }: { config: ProductLinksConfig }) {
  const [copied, setCopied] = useState(false);
  const [proposalUrl, setProposalUrl] = useState<string | null>(null);

  useEffect(() => {
    const cookie = document.cookie.split(';').find(c => c.trim().startsWith('manager='));
    if (cookie) {
      const slug = cookie.trim().replace('manager=', '');
      const manager = managers.find(m => m.slug === slug);
      if (manager) setProposalUrl(manager.proposalUrl);
    }
  }, []);

  const baseUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/${config.clienteSlug}/cliente`
    : `/${config.clienteSlug}/cliente`;

  const handleCopyClienteLink = async () => {
    try {
      await navigator.clipboard.writeText(baseUrl);
      setCopied(true);
      toast({ title: 'Link copiado!', description: 'Compartilhe com seu cliente.' });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({ variant: 'destructive', title: 'Erro ao copiar', description: 'Tente novamente.' });
    }
  };

  return (
    <div className="bg-card rounded-2xl p-8">
      <p className="text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-6">Materiais & Links</p>
      <div className="flex flex-wrap gap-3">
        {config.tabela && (
          <LinkButton href={config.tabela} icon={Table2} label="Tabela de Preços" />
        )}
        {config.book && (
          <LinkButton href={config.book} icon={BookOpen} label="Book" />
        )}
        {config.imagens && (
          <LinkButton href={config.imagens} icon={ImageIcon} label="Imagens" />
        )}
        {config.plantas && (
          <LinkButton href={config.plantas} icon={LayoutTemplate} label="Plantas" />
        )}
        {config.fotosDecorado && (
          <LinkButton href={config.fotosDecorado} icon={Camera} label="Fotos Decorado" />
        )}
        {config.reels && (
          <LinkButton href={config.reels} icon={Video} label="Reels" />
        )}
        {config.video && (
          <LinkButton href={config.video} icon={Video} label="Vídeo" />
        )}
        {config.site && (
          <LinkButton href={config.site} icon={Globe} label="Site Oficial" />
        )}
        <button
          onClick={handleCopyClienteLink}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied ? 'Link copiado!' : 'Link para Cliente'}
        </button>
        {proposalUrl && (
          <LinkButton href={proposalUrl} icon={FileText} label="Formulário Proposta" variant="primary" />
        )}
      </div>
    </div>
  );
}
