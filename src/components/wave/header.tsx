import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="py-4 absolute top-0 left-0 w-full z-10">
      <div className="container flex justify-center items-center">
        <Image src="/INSTITUCIONAL/logo_grupo_plaenge.png" alt="Grupo Plaenge Logo" width={150} height={40} data-ai-hint="company logo" />
      </div>
    </header>
  );
}
