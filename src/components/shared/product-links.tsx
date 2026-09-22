'use client';

import { Table2, BookOpen, Image as ImageIcon, Video, Globe, Copy, Check, FileText, LayoutTemplate, Camera, Download, Play, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';
import { managers } from '@/lib/managers';

export interface VideoItem {
  url: string;
  title: string;
}

export interface ProductLinksConfig {
  tabela?: string;
  book?: string;
  bookHorizontal?: string;
  imagens?: string;
  plantas?: string;
  fotosDecorado?: string;
  reels?: string;
  video?: string;
  videos?: VideoItem[];
  site?: string;
  clienteSlug: string;
}

function LinkButton({ href, icon: Icon, label, variant = 'outline', onClick }: {
  href?: string;
  icon: React.ElementType;
  label: string;
  variant?: 'outline' | 'primary';
  onClick?: () => void;
}) {
  const cls = `inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
    variant === 'primary'
      ? 'bg-primary text-primary-foreground border-primary hover:bg-primary/90'
      : 'bg-background text-foreground border-border hover:bg-muted'
  }`;

  if (onClick) {
    return (
      <button onClick={onClick} className={cls}>
        <Icon className="w-4 h-4" />
        {label}
      </button>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
      <Icon className="w-4 h-4" />
      {label}
    </a>
  );
}

async function downloadVideo(url: string, title: string) {
  try {
    const res = await fetch(url);
    const blob = await res.blob();
    const blobUrl = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = `${title}.mp4`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(blobUrl);
  } catch {
    window.open(url, '_blank');
  }
}

function DownloadButton({ url, title }: { url: string; title: string }) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    await downloadVideo(url, title);
    setLoading(false);
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-60"
    >
      <Download className="w-3 h-3" />
      {loading ? 'Baixando…' : 'Baixar'}
    </button>
  );
}

function VideoGalleryModal({ videos, onClose }: { videos: VideoItem[]; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="bg-card rounded-2xl shadow-2xl w-full max-w-lg max-h-[80vh] overflow-hidden flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-primary">Vídeos</p>
            <p className="text-sm text-muted-foreground mt-0.5">{videos.length} disponíveis</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full hover:bg-muted flex items-center justify-center transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Lista */}
        <div className="overflow-y-auto flex-1 divide-y divide-border">
          {videos.map((v, i) => (
            <div key={i} className="flex items-center gap-3 px-6 py-4 hover:bg-muted/50 transition-colors">
              <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                <Play className="w-3.5 h-3.5 fill-current" />
              </div>
              <span className="flex-1 text-sm font-medium">{v.title}</span>
              <div className="flex gap-2 flex-shrink-0">
                <a
                  href={v.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-border hover:bg-muted transition-colors"
                >
                  <Play className="w-3 h-3" /> Assistir
                </a>
                <DownloadButton url={v.url} title={v.title} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ProductLinks({ config }: { config: ProductLinksConfig }) {
  const [copied, setCopied] = useState(false);
  const [proposalUrl, setProposalUrl] = useState<string | null>(null);
  const [videoModalOpen, setVideoModalOpen] = useState(false);

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

  // Normaliza: suporta videos[] (array) ou video (string legado)
  const videoList: VideoItem[] = config.videos?.length
    ? config.videos
    : config.video
      ? [{ url: config.video, title: 'Vídeo' }]
      : [];

  return (
    <>
      <div className="bg-card rounded-2xl p-8">
        <p className="text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-6">Materiais & Links</p>
        <div className="flex flex-wrap gap-3">
          {config.tabela && (
            <LinkButton href={config.tabela} icon={Table2} label="Tabela de Preços" />
          )}
          {config.book && (
            <LinkButton href={config.book} icon={BookOpen} label="Book" />
          )}
          {config.bookHorizontal && (
            <LinkButton href={config.bookHorizontal} icon={BookOpen} label="Book Horizontal" />
          )}
          {config.imagens && (
            <LinkButton href={config.imagens} icon={ImageIcon} label="Imagens (ZIP)" />
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
          {videoList.length === 1 && (
            <LinkButton href={videoList[0].url} icon={Video} label="Vídeo" />
          )}
          {videoList.length > 1 && (
            <LinkButton
              icon={Video}
              label={`Vídeos (${videoList.length})`}
              onClick={() => setVideoModalOpen(true)}
            />
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

      {videoModalOpen && videoList.length > 0 && (
        <VideoGalleryModal videos={videoList} onClose={() => setVideoModalOpen(false)} />
      )}
    </>
  );
}
