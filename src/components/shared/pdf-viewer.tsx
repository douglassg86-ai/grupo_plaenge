'use client';

import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Script from 'next/script';
import { Download, Loader2 } from 'lucide-react';

const PDFJS = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174';
const ALLOWED_HOST = 'snmigf0anjlpuyzw.public.blob.vercel-storage.com';

export function viewerHref(url: string, title?: string) {
  const p = new URLSearchParams({ u: url });
  if (title) p.set('t', title);
  return `/visualizar?${p.toString()}`;
}

function safeUrl(raw: string | null) {
  if (!raw) return null;
  try {
    const u = new URL(raw);
    return u.protocol === 'https:' && u.hostname === ALLOWED_HOST ? u.toString() : null;
  } catch {
    return null;
  }
}

export default function PdfViewer() {
  const params = useSearchParams();
  const url = safeUrl(params.get('u'));
  const title = params.get('t') || url?.split('/').pop()?.replace(/-[A-Za-z0-9]{30}\.pdf$/, '.pdf') || 'Documento';
  const fileName = `${title.replace(/[^\p{L}\p{N} _-]+/gu, '').trim() || 'documento'}.pdf`;

  const containerRef = useRef<HTMLDivElement>(null);
  const [libReady, setLibReady] = useState(false);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [pages, setPages] = useState({ done: 0, total: 0 });
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).pdfjsLib) setLibReady(true);
  }, []);

  useEffect(() => {
    if (!libReady || !url || !containerRef.current) return;
    let cancelled = false;
    const container = containerRef.current;
    container.innerHTML = '';
    const pdfjsLib = (window as any).pdfjsLib;
    pdfjsLib.GlobalWorkerOptions.workerSrc = `${PDFJS}/pdf.worker.min.js`;

    (async () => {
      try {
        const pdf = await pdfjsLib.getDocument({ url }).promise;
        if (cancelled) return;
        setPages({ done: 0, total: pdf.numPages });
        setStatus('ready');
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        for (let n = 1; n <= pdf.numPages && !cancelled; n++) {
          const page = await pdf.getPage(n);
          const width = Math.min(container.clientWidth, 1200);
          const base = page.getViewport({ scale: 1 });
          const viewport = page.getViewport({ scale: (width / base.width) * dpr });
          const canvas = document.createElement('canvas');
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          canvas.style.width = `${width}px`;
          canvas.style.maxWidth = '100%';
          canvas.className = 'block mx-auto bg-white shadow-lg';
          container.appendChild(canvas);
          await page.render({ canvasContext: canvas.getContext('2d')!, viewport }).promise;
          setPages({ done: n, total: pdf.numPages });
        }
      } catch {
        if (!cancelled) setStatus('error');
      }
    })();

    return () => { cancelled = true; };
  }, [libReady, url]);

  async function handleDownload() {
    if (!url) return;
    setDownloading(true);
    try {
      const blob = await (await fetch(url)).blob();
      const href = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = href;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(href);
    } catch {
      window.location.href = url;
    } finally {
      setDownloading(false);
    }
  }

  if (!url) {
    return <div className="min-h-screen flex items-center justify-center p-6 text-muted-foreground">Documento não encontrado.</div>;
  }

  return (
    <div className="min-h-screen bg-neutral-800">
      <Script src={`${PDFJS}/pdf.min.js`} strategy="afterInteractive" onReady={() => setLibReady(true)} />
      <header className="sticky top-0 z-10 flex items-center gap-3 px-4 py-3 bg-neutral-900 text-white shadow">
        <p className="flex-1 min-w-0 truncate text-sm font-medium">{title}</p>
        {pages.total > 0 && pages.done < pages.total && (
          <span className="text-xs text-neutral-400 whitespace-nowrap">{pages.done}/{pages.total} págs.</span>
        )}
        <button
          onClick={handleDownload}
          disabled={downloading}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-white text-neutral-900 hover:bg-neutral-200 disabled:opacity-60"
        >
          {downloading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
          Baixar
        </button>
      </header>

      {status === 'loading' && (
        <div className="flex items-center justify-center gap-2 py-24 text-neutral-300 text-sm">
          <Loader2 className="w-5 h-5 animate-spin" /> Carregando documento…
        </div>
      )}
      {status === 'error' && (
        <div className="py-24 text-center text-neutral-300 text-sm space-y-3">
          <p>Não foi possível exibir o documento.</p>
          <a href={url} className="underline">Abrir arquivo</a>
        </div>
      )}
      <div ref={containerRef} className="flex flex-col gap-4 px-2 py-4 sm:px-4" />
    </div>
  );
}
