import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-10rem)] flex-col items-center justify-center space-y-8 text-center">
      <div className="space-y-4">
        <h1 className="font-headline text-8xl font-bold text-primary">404</h1>
        <h2 className="font-headline text-4xl font-bold tracking-tight">
          Página não encontrada
        </h2>
        <p className="text-muted-foreground max-w-md">
          O empreendimento que você está procurando não existe ou foi movido.
        </p>
      </div>
      <Button asChild>
        <Link href="/">
          <Home className="mr-2 h-4 w-4" />
          Voltar para a página inicial
        </Link>
      </Button>
    </div>
  );
}
