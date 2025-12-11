import Image from 'next/image';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-primary text-primary-foreground py-10">
      <div className="container text-center flex flex-col items-center gap-4">
        <Image src="/logo-wave-branca.svg" alt="Wave Home Resort" width={150} height={40} data-ai-hint="resort logo" />
        <p className="text-sm opacity-80">
          © {currentYear} Wave Home Resort. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
